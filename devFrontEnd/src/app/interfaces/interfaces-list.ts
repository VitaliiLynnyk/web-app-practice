export interface ResponseMessage {
    status?: number;
    message: string;
}

export interface ServerResponseError {
    status: number;
    error: ResponseMessage;
}

export interface ServerResponseOk {
    status: number;
    token: string;
    username: string;
}

export interface AlertObject {
    messageAlert: string;
    typeAlert: string;
    timeAlert: number;
}

export interface SurveyDetails {
    description: string;
    firstname: string;
    lastname: string;
    survey_id: number;
}

export interface SurveyInfo {
    question: string;
    answers: Array<SurveyInfoAnswerItem>;
}

export interface SurveyInfoAnswerItem {
    is_right: boolean;
    answer: string;
}

export interface SurveysDegreesItem {
    id: number;
    description: string;
}

export interface UserListItem {
    id: number;
    firstname: string;
    lastname: string;
    email: string;
}

