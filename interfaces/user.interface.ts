export interface UserInterface {
  id: string;
  email: string;
  username: string;
  avatar?: string;
  tier: string;
  theme: string;
  passwordHash?: string;
  passwordResetToken?: string;
  passwordResetExpires?: Date;
  patreon?: {
    tier?: string;          // optional Patreon tier
    accessToken?: string;   // Patreon API access token
    refreshToken?: string;  // Patreon refresh token
  };
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
  user: { id: string; email: string; username: string; avatar?: string; tier: string, theme: string };
}

export interface LoginFailure {
  success: false;
  error?: string;
}

export interface UpdateUserPayload {
  username?: string;
  email?: string;
  password?: string;
  avatar?: string;
}

// for the "recent activity" section of the account dashboard

export type RecentItem = {
  _id: string;
  updatedAt: string;
  type: string;
  [key: string]: any;
};