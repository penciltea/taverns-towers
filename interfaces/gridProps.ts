export interface GridContainerProps {
    children: React.ReactNode;
}

export interface GridItemProps {
  title: string;
  link?: string;
  subtitle?: string;
  image?: string;
  tags?: string[];
  tone?: string[];
  genre?: string[];
  onClick?: () => void;
}