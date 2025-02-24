package com.korit.moa.moa.handler;

import com.korit.moa.moa.common.object.CustomOAuth2User;
import com.korit.moa.moa.entity.user.User;
import com.korit.moa.moa.provider.JwtProvider;
import com.korit.moa.moa.repository.UserRepository;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.Authentication;
import org.springframework.security.web.authentication.SimpleUrlAuthenticationSuccessHandler;
import org.springframework.stereotype.Component;

import java.io.IOException;
import java.util.Map;
import java.util.Optional;

@Component
@RequiredArgsConstructor
public class OAuth2SuccessHandler extends SimpleUrlAuthenticationSuccessHandler {

    private final JwtProvider jwtProvider;
    private final UserRepository userRepository;

    @Override
    public void onAuthenticationSuccess(
            HttpServletRequest request,
            HttpServletResponse response,
            Authentication authentication
    ) throws IOException, ServletException {

        CustomOAuth2User customOAuth2User = (CustomOAuth2User) authentication.getPrincipal();
        Map<String, Object> attributes = customOAuth2User.getAttributes();
        boolean existed = customOAuth2User.isExisted();

        if (existed) {
            Optional<User> optionalUser = userRepository.findById(customOAuth2User.getName());
            User user = optionalUser.get();

            String accessToken = jwtProvider.generateJwtToken(customOAuth2User.getName(), user.getNickName(),user.getProfileImage());
            int expirTime = jwtProvider.getExpiration();
            response.sendRedirect("http://localhost:3000/sns-success?accessToken=" + accessToken + "&expiration= + " + expirTime);
        }
        else {
            String snsId = (String) attributes.get("snsId");
            String joinPath = (String) attributes.get("joinPath");
            System.out.println("snsId: " + snsId);
            System.out.println("joinPath: " + joinPath);
            response.sendRedirect("http://localhost:3000/auth?snsId=" + snsId + "&joinPath=" + joinPath);
        }

    }

}