// DB 저장 주소
import { REQUEST_URL } from "../constants";

export const emp = '';

//PaginationScroll
export const PAGINATION_RECOMMENDATION_GET_API = `${REQUEST_URL}/api/v1/recommendation`;
export const PAGINATION_RECOMMENDATION_POST_API = `${REQUEST_URL}/api/v1/recommendation`;
export const PAGINATION_RECOMMENDATION_DELETE_API = `${REQUEST_URL}/api/v1/recommendation/user-id`;
export const PAGINATION_GROUP_IMG_API = `${REQUEST_URL}/image/`

//NaverMap
export const NAVER_MAP_API = `https://openapi.map.naver.com/openapi/v3/maps.js?ncpClientId=`;

//GroupNaviBar
export const GROUP_NAV_GET_API = `${REQUEST_URL}/api/v1/user-list`;
export const GROUP_NAV_IMG = `${REQUEST_URL}/image/`;

//InformationNaviBar
export const INFORMATION_IMG = `${REQUEST_URL}/image/`;

//CategorySearchList
export const CATEGORY_GET_API = `${REQUEST_URL}/api/v1/auth/meeting-group/group-category`;

//SearchBar
export const SEARCHBAR_GET_API = `${REQUEST_URL}/api/v1/auth/meeting-group`;

//KeywordSearchGroupList 
export const KEYWORD_LIST_API = `${REQUEST_URL}/api/v1/auth/meeting-group`

//FindPassword
export const MAIL_SEND_API = `${REQUEST_URL}/api/v1/mails`;

//VerficationPassword
export const RESET_PASSWORD_PUT_API = `${REQUEST_URL}/api/v1/users/password`;

//FindUserIdResult
export const Find_USERID_POST_API = `${REQUEST_URL}/api/v1/mails/user-id`;
export const Find_USERID_GET_API = `${REQUEST_URL}/api/v1/mails/verification/user-id`;

//SignIn
export const SIGN_IN_API = `${REQUEST_URL}/api/v1/auth/signin`;
export const SIGN_IN_SNS_API = `${REQUEST_URL}/api/v1/auth/sns-sign-in/`

//SignUp
export const SIGN_UP_HPBBY_GET_API = `${REQUEST_URL}/api/v1/auth/hobbies`;
export const SIGN_UP_DUPLICATION_USERID_API = `${REQUEST_URL}/api/v1/auth/duplicate-id/`;
export const SIGN_UP_DUPLICATION_NICKNAME_API = `${REQUEST_URL}/api/v1/auth/duplicate-nickname/`;
export const SIGN_UP_POST_API = `${REQUEST_URL}/api/v1/auth/signup`;
export const SIGN_UP_SNS_API = `${REQUEST_URL}/api/v1/auth/sns-sign-in/`;

//CreateGroup
export const CREATE_GROUP_API = `${REQUEST_URL}/api/v1/meeting-group`;

//GroupDetail
export const GROUP_DETAIL_MEETING_API = `${REQUEST_URL}/api/v1/auth/meeting-group/`;
export const GROUP_DETAIL_USER_LIST_API = `${REQUEST_URL}/api/v1/user-list/user-list-in/`;
export const GROUP_DETAIL_IMG_API = `${REQUEST_URL}/image/`;
export const GROUP_DETAIL_DUPLICATION_ANSWER = `${REQUEST_URL}/api/v1/user-answers/duplication/`

//HomeGroup
export const HOME_GROUP_GET_API = `${REQUEST_URL}/api/v1/meeting-group/home-recommendation`;
export const HOME_GROUP_AUTH_GET_API = `${REQUEST_URL}/api/v1/auth/meeting-group/group`
export const HOME_GROUP_RECOMMENDATION_GET_API = `${REQUEST_URL}/api/v1/recommendation`;
export const HOME_GROUP_RECOMMENDATION_POST_API = `${REQUEST_URL}/api/v1/recommendation`;
export const HOME_GROUP_RECOMMENDATION_DELETE_API = `${REQUEST_URL}/api/v1/recommendation/user-id`;
export const HOME_GROUP_IMG_API = `${REQUEST_URL}/image/`;

//GroupMainPage 
export const GROUP_MAIN_IMG_API = `${REQUEST_URL}/image/`;

//JoinGroupAnswer
export const JOIN_GROUP_ANSWER_POST_API = `${REQUEST_URL}/api/v1/user-answers`;
export const FIND_GROUP_GET_API = `${REQUEST_URL}/api/v1/meeting-group/`;
export const JOIN_GROUP_ANSWER_IMG_API = `${REQUEST_URL}/image/`;

//UserListPage
export const USER_LIST_PAGE_GET_API = `${REQUEST_URL}/api/v1/user-list/`;
export const USER_LIST_PAGE_IMG_API = `${REQUEST_URL}/image/`;

//GroupHeader
export const GROUP_HEADER_BASE_URL_API = `http://localhost:3000/meeting-group/`;
export const GROUP_HEADER_GET_API = `${REQUEST_URL}/api/v1/auth/meeting-group/`;
export const GROUP_HEADER_EXIST_VOTE_GET_API = `${REQUEST_URL}/api/v1/votes/exists-vote/`;
export const GROUP_HEADER_EXIST_GET_API = `${REQUEST_URL}/api/v1/meeting-group/exists/`;
export const GROUP_HEADER_USER_LIST_DELETE_API = `${REQUEST_URL}/api/v1/user-list/leave/`;

//Approved -> index
export const APPROVED_USER_ANSWERS_GET_API = `${REQUEST_URL}/api/v1/user-answers/`;
export const APPROVED_USER_ANSWERS_POST_API =`${REQUEST_URL}/api/v1/user-answers/approved/`;
export const APPROVED_USER_ANSWERS_DELETE_API =`${REQUEST_URL}/api/v1/user-answers/`;

//BlackList 
export const BLACK_LIST_API = `${REQUEST_URL}/api/v1/black-list/`;
export const BLACK_LIST_DELETE_API = `${REQUEST_URL}/api/v1/black-list`;
export const BLACK_LIST_PAGE_IMG_API = `${REQUEST_URL}/image/`;

//Chart
export const GENDER_CHART_GET_API = `${REQUEST_URL}/api/v1/user-list/gender-chart/`;
export const USER_CHART_API = `${REQUEST_URL}/api/v1/user-list/user-chart/`;


//GroupUpdate
export const GROUP_UPDATE_API = `${REQUEST_URL}/api/v1/meeting-group/`;

//ManagerHome
export const MANGE_HOME_GET_API = `${REQUEST_URL}/api/v1/user-list/`;
export const MANGE_HOME_PUT_API = `${REQUEST_URL}/api/v1/user-list/user-level/`;
export const MANGE_HOME_DELTE_API = `${REQUEST_URL}/api/v1/user-list/van/`;
export const MANGE_HOME_IMG_API = `${REQUEST_URL}/image/`;

//Report 
export const REPORT_API = `${REQUEST_URL}/api/v1/reports/`;
export const  REPORT_IMG_API=`${REQUEST_URL}/image/`;

//Vote
export const VOTE_API_POST = `${REQUEST_URL}/api/v1/votes`;
export const VOTE_API = `${REQUEST_URL}/api/v1/votes/`;
export const VOTE_RESULT_GET_API = `${REQUEST_URL}/api/v1/vote-results/exist-answer/`;
export const VOTE_RESULT_POST = `${REQUEST_URL}/api/v1/vote-results`;
export const VOTE_RESULT_GET = `${REQUEST_URL}/api/v1/vote-results/`;

//DeleteUserInfo
export const DELETE_USER_INFO_API = `${REQUEST_URL}/api/v1/users/user`;

//GetUserInfo
export const GET_USER_INFO_API = `${REQUEST_URL}/api/v1/users/user-id`;
export const PUT_USER_INFO_API = `${REQUEST_URL}/api/v1/users/user-info`;
export const GET_DUPLICATION_NICK_NAME_API = `${REQUEST_URL}/api/v1/users/duplication/`;
export const GET_USER_INFO_IMG_API = `${REQUEST_URL}/image/`;
export const POST_MY_PAGE = `${REQUEST_URL}/api/v1/users/password`;

//MypageReview
export const REVIEW_GET_API = `${REQUEST_URL}/api/v1/reviews/my-review`;
export const REVIEW_DELETE_API = `${REQUEST_URL}/api/v1/reviews/`;
export const REVIEW_IMG_API = `${REQUEST_URL}/image/`;

//NoticePage
export const NOTICE_API = `${REQUEST_URL}/api/v1/notices`;

//Report_PAGE
export const REPORT_POST_API =`${REQUEST_URL}/api/v1/reports`;

//CreateReview
export const CREATE_REVIEW_POST_API = `${REQUEST_URL}/api/v1/reviews`;

//ReviewMain
export const CREATE_REVIEW_GET_API = `${REQUEST_URL}/api/v1/reviews/auth`;
export const CREATE_REVIEW_IMG_API = `${REQUEST_URL}/image/`;

//RegularGroup & ShortGroup
export const GROUP_TYPE_API = `${REQUEST_URL}/api/v1/auth/meeting-group/group-type`;

// 참여 요청 내역 확인
export const GROUP_PARTICIPATION_STATUS = `${REQUEST_URL}/api/v1/user-answers/participation-status`;
export const GROUP_GET_PARTICIPATION_STATUS = `${REQUEST_URL}/api/v1/user-answers/`;






























