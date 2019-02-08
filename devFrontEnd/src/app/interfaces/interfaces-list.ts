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
    survey_id: number;
    firstname: string;
    lastname: string;
    status: string;
    description: string;
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
    name: string;
    email: string;
}

export interface CreateSurveyResponse {
    random_url: string;
    survey_id: number;
}

export interface SurveyQuestionsForPass {
    question: string;
    answers: Array<SurveyAnswerItemForPass>;
}

export interface SurveyAnswerItemForPass {
    id: number;
    answer: string;
}

export interface AnswerItemForSend {
    surv_id: number;
    answer_id: number;
    full_answer: string;
}

export interface SurveyStatisticItem {
    description: string;
    count: number;
}
