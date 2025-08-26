export interface UserInterface {
    id: string;
    email: string;
    username: string;
    tier: string;
    theme: string;
}

export interface UserPermissions {
  id: string;
  roles?: string[];
  permissions?: string[];
}

export interface RegisterPayload {
  username: string;
  email: string;
  password: string;
}

export interface LoginPayload {
    credential: string;
    password: string;
}

export interface LoginSuccess {
  success: true;
  user: { id: string; email: string; username: string; tier: string, theme: string };
}

export interface LoginFailure {
  success: false;
  error?: string;
}