export interface User {
  id: number;
  name: string;
  email: string;
  isActive: boolean;
}

export interface UpdateUser {
  name: string;
  email: string;
  password: string;
}
