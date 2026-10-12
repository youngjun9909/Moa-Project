package com.korit.moa.moa.config;

import com.korit.moa.moa.filter.JwtAuthenticationFilter;
import com.korit.moa.moa.handler.OAuth2SuccessHandler;
import com.korit.moa.moa.provider.JwtProvider;
import com.korit.moa.moa.service.implement.OAuth2UserServiceImplement;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.context.annotation.Bean;
import org.springframework.boot.test.context.TestConfiguration;
import org.springframework.test.context.ContextConfiguration;
import org.springframework.security.oauth2.client.registration.ClientRegistration;
import org.springframework.security.oauth2.client.registration.ClientRegistrationRepository;
import org.springframework.security.oauth2.client.registration.InMemoryClientRegistrationRepository;
import org.springframework.security.oauth2.core.AuthorizationGrantType;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.web.bind.annotation.*;

import static org.mockito.Mockito.when;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

@WebMvcTest
@ContextConfiguration(classes = {WebSecurityConfig.class, JwtAuthenticationFilter.class,
        ApiAuthenticationTest.ProbeController.class, ApiAuthenticationTest.OAuthConfig.class})
class ApiAuthenticationTest {
    @Autowired MockMvc mvc;
    @MockBean JwtProvider jwtProvider;
    @MockBean OAuth2SuccessHandler successHandler;
    @MockBean OAuth2UserServiceImplement oauthService;

    @RestController
    static class ProbeController {
        @PostMapping("/api/v1/meeting-group") String create() { return "saved"; }
        @GetMapping("/api/v1/auth/hobbies") String hobbies() { return "public"; }
    }

    @TestConfiguration
    static class OAuthConfig {
        @Bean ClientRegistrationRepository clientRegistrationRepository() {
            return new InMemoryClientRegistrationRepository(ClientRegistration.withRegistrationId("kakao")
                    .clientId("fixture-id").clientSecret("fixture-secret")
                    .authorizationGrantType(AuthorizationGrantType.AUTHORIZATION_CODE)
                    .redirectUri("{baseUrl}/oauth2/callback/{registrationId}")
                    .authorizationUri("https://example.com/authorize").tokenUri("https://example.com/token")
                    .userInfoUri("https://example.com/user").userNameAttributeName("id").build());
        }
    }

    @Test void anonymousCreationReturnsJson401InsteadOfLoginHtml() throws Exception {
        mvc.perform(post("/api/v1/meeting-group"))
                .andExpect(status().isUnauthorized()).andExpect(header().doesNotExist("Location"))
                .andExpect(content().contentTypeCompatibleWith("application/json"))
                .andExpect(jsonPath("$.result").value(false));
    }

    @Test void invalidTokenReturns401() throws Exception {
        when(jwtProvider.removeBearer("Bearer expired")).thenReturn("expired");
        when(jwtProvider.isValidToken("expired")).thenReturn(false);
        mvc.perform(post("/api/v1/meeting-group").header("Authorization", "Bearer expired"))
                .andExpect(status().isUnauthorized()).andExpect(jsonPath("$.result").value(false));
    }

    @Test void validTokenStillAllowsProtectedApi() throws Exception {
        when(jwtProvider.removeBearer("Bearer valid")).thenReturn("valid");
        when(jwtProvider.isValidToken("valid")).thenReturn(true);
        when(jwtProvider.getUserIdFromJwt("valid")).thenReturn("fixture");
        mvc.perform(post("/api/v1/meeting-group").header("Authorization", "Bearer valid"))
                .andExpect(status().isOk()).andExpect(content().string("saved"));
    }

    @Test void publicApiRemainsPublic() throws Exception {
        mvc.perform(get("/api/v1/auth/hobbies")).andExpect(status().isOk()).andExpect(content().string("public"));
    }

    @Test void explicitSocialLoginStillRedirects() throws Exception {
        mvc.perform(get("/api/v1/auth/sns-sign-in/kakao"))
                .andExpect(status().is3xxRedirection()).andExpect(header().string("Location", org.hamcrest.Matchers.startsWith("https://example.com/authorize")));
    }
}
