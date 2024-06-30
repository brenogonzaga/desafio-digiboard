export interface Login {
  email: string;
  password: string;
}

export interface Signup {
  name: string;
  email: string;
  password: string;
}

export interface Token {
  access_token: string;
  type: string;
}
