package com.korit.moa.moa.provider;

import org.springframework.stereotype.Component;

import java.security.SecureRandom;
import java.util.Base64;
import java.util.Map;
import java.util.concurrent.ConcurrentHashMap;

/**
 * Holds a freshly issued JWT behind a short-lived, single-use code so the token
 * itself never travels through a redirect URL.
 */
@Component
public class OAuthLoginCodeStore {

    private static final long TTL_MILLIS = 60_000L;

    public record Entry(String token, int expiration) {}

    private record Stored(Entry entry, long expiresAt) {}

    private final Map<String, Stored> codes = new ConcurrentHashMap<>();
    private final SecureRandom random = new SecureRandom();

    public String issue(String token, int expiration) {
        purgeExpired();
        byte[] bytes = new byte[32];
        random.nextBytes(bytes);
        String code = Base64.getUrlEncoder().withoutPadding().encodeToString(bytes);
        codes.put(code, new Stored(new Entry(token, expiration), System.currentTimeMillis() + TTL_MILLIS));
        return code;
    }

    /** Returns the entry once; unknown, used or expired codes return null. */
    public Entry consume(String code) {
        if (code == null) return null;
        Stored stored = codes.remove(code);
        if (stored == null || stored.expiresAt() < System.currentTimeMillis()) return null;
        return stored.entry();
    }

    private void purgeExpired() {
        long now = System.currentTimeMillis();
        codes.values().removeIf(stored -> stored.expiresAt() < now);
    }
}
