package com.korit.moa.moa.config;

import org.junit.jupiter.api.Test;
import org.springframework.boot.autoconfigure.condition.ConditionalOnProperty;
import org.springframework.core.annotation.AnnotatedElementUtils;

import java.lang.reflect.Method;

import static org.assertj.core.api.Assertions.assertThat;

class RedisConfigTest {

    @Test
    void redisMessageListenerCanBeDisabledWithProperty() throws NoSuchMethodException {
        Method listenerBean = RedisConfig.class.getDeclaredMethod(
                "redisMessageListenerContainer",
                org.springframework.data.redis.connection.RedisConnectionFactory.class,
                com.korit.moa.moa.redis.RedisSubscriber.class,
                org.springframework.data.redis.listener.ChannelTopic.class
        );

        ConditionalOnProperty condition = AnnotatedElementUtils.findMergedAnnotation(
                listenerBean,
                ConditionalOnProperty.class
        );

        assertThat(condition).isNotNull();
        assertThat(condition.prefix()).isEqualTo("app.redis");
        assertThat(condition.name()).containsExactly("enabled");
        assertThat(condition.havingValue()).isEqualTo("true");
        assertThat(condition.matchIfMissing()).isTrue();
    }
}
