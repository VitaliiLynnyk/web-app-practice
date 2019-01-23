export interface User {
  email: string;
  password: string;
}

export interface ResponseMessage {
  message: string;
}

export interface ServerResponseError {
  status: number;
  error: ResponseMessage;
}

export interface ServerResponseOk {
  token: string;
}

export interface AlertObject {
  messageAlert: string;
  typeAlert: string;
}

export interface UserReg {
  firstname: string;
  lastname: string;
  email: string;
  password: string;
}

export interface TestRes {
  id: number;
  person_id: number;
  token: string;
}
