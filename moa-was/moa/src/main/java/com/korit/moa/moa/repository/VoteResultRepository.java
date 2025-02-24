package com.korit.moa.moa.repository;

import com.korit.moa.moa.entity.voteResult.VoteResult;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface VoteResultRepository extends JpaRepository<VoteResult, Long> {

    Boolean existsByUserIdAndVoteId(String userId, Long voteId);
    @Query("""
    select vr.voteAnswer, count(vr)
    from VoteResult vr
    where vr.voteId = :voteId
    group by  vr.voteAnswer
    
""")
    List<Object[]> findByVoteId(@Param("voteId") Long voteId);
}
