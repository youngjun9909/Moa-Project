package com.korit.moa.moa.storage;

import com.korit.moa.moa.controller.ImageRedirectController;
import com.korit.moa.moa.service.ImgFileService;
import com.sun.net.httpserver.HttpServer;
import org.junit.jupiter.api.AfterEach;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.ObjectProvider;
import org.springframework.mock.web.MockHttpServletRequest;
import org.springframework.mock.web.MockMultipartFile;
import org.springframework.http.ResponseEntity;

import java.io.IOException;
import java.net.InetSocketAddress;
import java.util.concurrent.atomic.AtomicReference;

import static org.junit.jupiter.api.Assertions.*;

class SupabaseStorageTest {

    private HttpServer server;
    private final AtomicReference<String> method = new AtomicReference<>();
    private final AtomicReference<String> path = new AtomicReference<>();
    private final AtomicReference<String> apikey = new AtomicReference<>();
    private final AtomicReference<String> authorization = new AtomicReference<>();
    private final AtomicReference<String> contentType = new AtomicReference<>();
    private final AtomicReference<byte[]> body = new AtomicReference<>();
    private volatile int responseStatus = 200;
    private String baseUrl;

    @BeforeEach
    void startFakeSupabase() throws IOException {
        server = HttpServer.create(new InetSocketAddress("127.0.0.1", 0), 0);
        server.createContext("/", exchange -> {
            method.set(exchange.getRequestMethod());
            path.set(exchange.getRequestURI().getRawPath());
            apikey.set(exchange.getRequestHeaders().getFirst("apikey"));
            authorization.set(exchange.getRequestHeaders().getFirst("Authorization"));
            contentType.set(exchange.getRequestHeaders().getFirst("Content-Type"));
            body.set(exchange.getRequestBody().readAllBytes());
            byte[] reply = "{}".getBytes();
            exchange.sendResponseHeaders(responseStatus, reply.length);
            exchange.getResponseBody().write(reply);
            exchange.close();
        });
        server.start();
        baseUrl = "http://127.0.0.1:" + server.getAddress().getPort();
    }

    @AfterEach
    void stop() {
        server.stop(0);
    }

    private static ObjectProvider<SupabaseStorage> providerOf(SupabaseStorage storage) {
        return new ObjectProvider<>() {
            @Override public SupabaseStorage getObject() { return storage; }
            @Override public SupabaseStorage getObject(Object... args) { return storage; }
            @Override public SupabaseStorage getIfAvailable() { return storage; }
            @Override public SupabaseStorage getIfUnique() { return storage; }
        };
    }

    @Test
    void imageUploadGoesToTheBucketAndReturnsTheRelativePath() {
        SupabaseStorage storage = new SupabaseStorage(baseUrl + "/", "sb_secret_test", "moa-images");
        ImgFileService service = new ImgFileService(providerOf(storage));
        byte[] png = {1, 2, 3, 4};

        String saved = service.convertImgFile(new MockMultipartFile("file", "a.png", "image/png", png), "groupImg");

        assertTrue(saved.matches("groupImg/[0-9a-f-]{36}\\.png"), saved);
        assertEquals("POST", method.get());
        assertEquals("/storage/v1/object/moa-images/" + saved, path.get());
        assertEquals("sb_secret_test", apikey.get());
        assertNull(authorization.get(), "new-style secret keys are not sent as bearer tokens");
        assertEquals("image/png", contentType.get());
        assertArrayEquals(png, body.get());
    }

    @Test
    void legacyJwtKeysAreAlsoSentAsBearerToken() {
        SupabaseStorage storage = new SupabaseStorage(baseUrl, "eyJhbGciOi.test.key", "moa-images");
        new ImgFileService(providerOf(storage)).convertImgFile(new MockMultipartFile("file", "a.jpg", "image/jpeg", new byte[]{9}), "profile");

        assertEquals("Bearer eyJhbGciOi.test.key", authorization.get());
    }

    @Test
    void uploadFailureSurfacesAsAnError() {
        responseStatus = 403;
        SupabaseStorage storage = new SupabaseStorage(baseUrl, "sb_secret_test", "moa-images");
        ImgFileService service = new ImgFileService(providerOf(storage));

        RuntimeException error = assertThrows(RuntimeException.class,
                () -> service.convertImgFile(new MockMultipartFile("file", "a.png", "image/png", new byte[]{1}), "groupImg"));
        assertTrue(error.getMessage().contains("403"), error.getMessage());
    }

    @Test
    void missingConfigurationFailsFastAtStartup() {
        assertThrows(IllegalStateException.class, () -> new SupabaseStorage("", "key", "bucket"));
        assertThrows(IllegalStateException.class, () -> new SupabaseStorage("https://x.supabase.co", "", "bucket"));
    }

    @Test
    void imageUrlsRedirectToThePublicBucketAndRejectTraversal() {
        SupabaseStorage storage = new SupabaseStorage("https://abc.supabase.co", "sb_secret_test", "moa-images");
        ImageRedirectController controller = new ImageRedirectController(storage);

        ResponseEntity<Void> ok = controller.redirect(new MockHttpServletRequest("GET", "/image/groupImg/a%20b.png"));
        assertEquals(302, ok.getStatusCode().value());
        assertEquals("https://abc.supabase.co/storage/v1/object/public/moa-images/groupImg/a%20b.png",
                ok.getHeaders().getFirst("Location"));

        assertEquals(404, controller.redirect(new MockHttpServletRequest("GET", "/image/%2e%2e/secret")).getStatusCode().value());
        assertEquals(404, controller.redirect(new MockHttpServletRequest("GET", "/image/")).getStatusCode().value());
    }

    @Test
    void dataApiAndStorageUrlsFromTheDashboardAreReducedToTheProjectRoot() {
        String root = "https://abc.supabase.co";
        assertEquals(root, SupabaseStorage.normalizeBaseUrl("https://abc.supabase.co"));
        assertEquals(root, SupabaseStorage.normalizeBaseUrl("https://abc.supabase.co/"));
        assertEquals(root, SupabaseStorage.normalizeBaseUrl("https://abc.supabase.co/rest/v1"));
        assertEquals(root, SupabaseStorage.normalizeBaseUrl("https://abc.supabase.co/rest/v1/"));
        assertEquals(root, SupabaseStorage.normalizeBaseUrl("  https://abc.supabase.co/storage/v1/s3 "));

        SupabaseStorage storage = new SupabaseStorage(root + "/rest/v1/", "sb_secret_test", "moa-images");
        assertEquals("https://abc.supabase.co/storage/v1/object/moa-images/groupImg/a.png", storage.uploadUrl("groupImg/a.png"));
    }

    @Test
    void pathSegmentsAreEncodedButSlashesKept() {
        assertEquals("groupImg/%ED%95%9C%EA%B8%80%20a.png", SupabaseStorage.encodePath("groupImg/한글 a.png"));
    }
}
