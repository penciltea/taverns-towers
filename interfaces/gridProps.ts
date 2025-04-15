export interface GridContainerProps {
    children: React.ReactNode;
}

export interface GridItemProps {
  title: string;
  subtitle?: string;
  image?: string;
  tags?: string[];
}