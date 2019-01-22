export class User {
  email: string;
  password: string;
}

export class ErrorResponse {
  message: string;
}

export class ServerResponse {
  status: number;
  error: ErrorResponse;
}

export class UserReg {
  firstname: string;
  lastname: string;
  email: string;
  password: string;
}

export class TestRes {
  id: number;
  person_id: number;
  token: string;
}
