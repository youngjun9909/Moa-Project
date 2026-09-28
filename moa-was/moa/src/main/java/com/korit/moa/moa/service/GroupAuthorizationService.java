package com.korit.moa.moa.service;

import com.korit.moa.moa.entity.userList.UserLevel;
import com.korit.moa.moa.repository.UserListRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class GroupAuthorizationService {

    private final UserListRepository userListRepository;

    public boolean isManager(Long groupId, String userId) {
        if (groupId == null || userId == null || userId.isBlank()) {
            return false;
        }
        return userListRepository.findByGroupIdAndUserId(groupId, userId)
                .map(userList -> userList.getUserLevel() == UserLevel.관리자)
                .orElse(false);
    }
}
