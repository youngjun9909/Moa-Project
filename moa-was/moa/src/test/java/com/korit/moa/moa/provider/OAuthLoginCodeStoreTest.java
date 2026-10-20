package com.korit.moa.moa.provider;

import org.junit.jupiter.api.Test;

import static org.junit.jupiter.api.Assertions.*;

class OAuthLoginCodeStoreTest {

    private final OAuthLoginCodeStore store = new OAuthLoginCodeStore();

    @Test
    void codeReturnsTheIssuedTokenExactlyOnce() {
        String code = store.issue("jwt-token", 36000000);

        OAuthLoginCodeStore.Entry first = store.consume(code);
        assertNotNull(first);
        assertEquals("jwt-token", first.token());
        assertEquals(36000000, first.expiration());
        assertNull(store.consume(code));
    }

    @Test
    void unknownOrMissingCodesAreRejected() {
        assertNull(store.consume("not-issued"));
        assertNull(store.consume(null));
    }

    @Test
    void codesDoNotContainTheToken() {
        String code = store.issue("jwt-token", 1);
        assertFalse(code.contains("jwt-token"));
        assertNotEquals(code, store.issue("jwt-token", 1));
    }
}
