export interface UIState {
  theme: 'light' | 'dark' ;
  setTheme: (theme: UIState['theme']) => void;
}

export type AuthProviderId = 'patreon';

export interface OAuthProviderConfig {
  name: AuthProviderId;
  iconSrc: string;
  providerId: string;
}

export interface OAuthProvider {
  name: string;
  icon?: React.ReactNode;
  signInFunction: () => void;
};

export interface AuthContentProps {
  onNativeSuccess?: () => void;
  onOAuthSuccess?: (provider: string) => void;
  oauthProviders?: OAuthProvider[];
};


export interface AuthFormProps {
  onSuccess?: () => void;
};