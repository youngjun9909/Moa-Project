package com.korit.moa.moa.repository;

import com.korit.moa.moa.entity.meetingGroup.GroupCategory;
import com.korit.moa.moa.entity.meetingGroup.GroupTypeCategory;
import com.korit.moa.moa.entity.meetingGroup.MeetingGroup;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;


@Repository
public interface MeetingGroupRepository extends JpaRepository<MeetingGroup,Long> {

    @Query(value = """
SELECT ranked.*
FROM (
    SELECT mg.*,
           ROW_NUMBER() OVER (PARTITION BY mg.group_category ORDER BY RAND()) AS rn
    FROM Meeting_Groups mg
    WHERE EXISTS (
        SELECT 1
        FROM Users u
        JOIN user_hobbies uh ON u.user_id = uh.user_id
        JOIN hobby h ON uh.hobby_id = h.hobby_id
        WHERE u.user_id = :userId
          AND (h.hobby_name = mg.group_category)
    )
    OR mg.group_category IN (
        SELECT group_category
        FROM (
            SELECT DISTINCT mg2.group_category
            FROM Meeting_Groups mg2
            ORDER BY RAND()
            LIMIT 3
        ) AS random_categories
    )
) AS ranked
WHERE ranked.rn <= 3
ORDER BY ranked.group_category, RAND();
""", nativeQuery = true)
    Optional<List<MeetingGroup>> findGroupByUserId(@Param("userId") String userId);

    @Query(value = """

SELECT ranked.*
       FROM (
           SELECT mg.*,
                  ROW_NUMBER() OVER (PARTITION BY mg.group_category ORDER BY RAND()) AS rn
           FROM Meeting_Groups mg
           WHERE EXISTS (
               SELECT 1
               FROM Users u
               WHERE mg.group_category IN (
                   SELECT group_category
                   FROM (
                       SELECT DISTINCT mg2.group_category
                       FROM Meeting_Groups mg2
                       ORDER BY RAND()
                       LIMIT 3
                   ) AS random_categories
               )
           )
       ) AS ranked
       WHERE ranked.rn <= 3
       ORDER BY ranked.group_category, RAND();
""", nativeQuery = true)
    Optional<List<MeetingGroup>> findGroupRandom();

    @Query("SELECT m FROM MeetingGroup m " +
            "WHERE m.groupTitle LIKE %:keyword% " +
            "ORDER BY m.groupId")
    Optional<List<MeetingGroup>> findByGroupTitle(@Param("keyword") String keyword);

    @Query("SELECT m FROM MeetingGroup m " +
            "WHERE m.groupCategory = :groupCategory " +
            "AND m.groupAddress Like CONCAT('%', :region, '%') " +
            "ORDER BY m.groupId ")
    Optional<List<MeetingGroup>> findByGroupCategoryAndRegion(
            @Param("groupCategory")GroupCategory groupCategory,
            @Param("region") String region);

    Optional<List<MeetingGroup>> findByGroupType(@Param("groupType") GroupTypeCategory groupType);

    Boolean existsByGroupIdAndCreatorId(Long groupId, String userId);

    boolean existsByGroupTitle(String groupTitle);

}