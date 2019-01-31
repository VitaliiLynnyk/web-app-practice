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
}

export interface AlertObject {
  messageAlert: string;
  typeAlert: string;
  timeAlert: number;
}

export interface SurveyInfo {
  description: string;
  firstname: string;
  lastname: string;
  survey_id: number;
}

