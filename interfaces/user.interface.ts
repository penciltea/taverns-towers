export interface UserInterface {
  id: string;
  email: string;
  username: string;
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
  user: { id: string; email: string; username: string; tier: string, theme: string };
}

export interface LoginFailure {
  success: false;
  error?: string;
}


// for the "recent activity" section of the account dashboard

export type RecentItem = {
  _id: string;
  updatedAt: string;
  type: string;
  [key: string]: any;
};

// For Patreon users
export interface PatreonMember {
  id: string;
  type: "member";
  attributes: {
    patron_status?: string;
    patron_title?: string;
    // add other attributes if needed
  };
  relationships?: {
    campaign?: {
      data?: {
        id: string;
      };
    };
    // add other relationships if needed
  };
}