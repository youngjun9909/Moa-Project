package com.korit.moa.moa.repository;

import com.korit.moa.moa.entity.votes.Votes;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface VoteRepository extends JpaRepository<Votes, Long> {

    @Query(
            "SELECT v " +
                    "FROM Votes v JOIN MeetingGroup mg ON v.groupId = mg.groupId " +
                    "WHERE v.groupId = :groupId"
    )
    Optional<Votes> findVoteByGroupId(@Param("groupId") Long groupId);

    Boolean existsByGroupId (Long groupId);
}
