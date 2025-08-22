export interface UIState {
  theme: 'light' | 'dark' ;
  setTheme: (theme: UIState['theme']) => void;
}