export const baseAPIUrl = "https://localhost:7296/api/";

export const endPoint = {
    Register: "User/register",
    IsUserExist: "User/IsUserExist",
    Login: "User/Login",
    ForgotPassword: "User/ForgotPassword",
    ResetPassword: "User/ResetPassword",
    CheckPassWord:"User/CheckPassWord",

    AddToFavourite: "Mission/AddToFavourite",
    GetMissionsByFilter: "Mission/GetMissionsByFilter",
    RecommandMissionToWorkers:"Mission/RecommandMissionToWorkers",
    GetVolunteeringMission: "Mission/GetVolunteeringMission",
    SaveMissionApplication: "Mission/SaveMissionApplication",
    SaveComment: "Mission/SaveComment",
    SaveRatings: "Mission/SaveRatings",
    checkMissionApplied :"Mission/checkMissionApplied",
    GetRelatedMission:"Mission/GetRelatedMission",

    GetStory: "Story/GetStory",
    GetStoryById: "Story/GetStoryById",

    GetCities: "Common/getcities",
    GetCountries: "Common/getcountries",

    UpdateUser : "User/updateUser",
    IsEmployeeIdUnique : "User/isEmployeeIdUnique",
    checkOldPassword : "User/checkOldPassword",
    changePassword: "User/changePassword",
    GetUserDetails:"User/userDetails",
    GetUserRole: "User/getUserRole",
    GetUsers: "User/getUsers",
    UpdateUserStatus: "User/updateUserStatus",
    DeleteUser: "User/deleteUser",

    GetMissionThemes: "MissionTheme/getMissionThemes",
    AddMission: "Mission/addMission",

    GetAllSkills: "Mission/getSkills",
    GetUserSkills: "User/userSkills",
    GetMissionList: "Mission/getMissionList",
    GetMissionSkills: "Mission/getMissionSkills",
    UpdateMission: "Mission/updateMission",
    DeleteMission: "Mission/deleteMission",


    AddMissionTheme:"MissionTheme/addMissionTheme",
    GetMissionThemeFromId:"MissionTheme/getMissionThemeFromId",
    EditMissionTheme: "MissionTheme/editMissionTheme",
    DeleteMissionTheme: "MissionTheme/deleteMissionTheme",

    GetSkills:"Skill/getSkills",
    UpdateSkillStatus:"Skill/updateSkillStatus",
    AddSkill: "Skill/addSkill",
    UpdateSkill: "Skill/updateSkill",
    GetSkillById: "Skill/getSkillById"
};

export const StatusCodes = {
    Ok: 200,
    Created: 201,
    NotModified: 304,
    BadRequest: 400,
    Unauthorized: 401,
    Forbidden: 403,
    NotFound: 404,
    Conflict: 409,
    InternalServer: 500
};
