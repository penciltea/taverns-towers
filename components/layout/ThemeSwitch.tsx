import { MenuItem, Select } from '@mui/material';
import { useUIStore } from '@/store/uiStore';
import useThemeActions from '@/hooks/useThemeActions';

export default function ThemeSwitch(){
  const theme = useUIStore((state) => state.theme);
  const { updateTheme } = useThemeActions();

  return (
    <Select fullWidth value={theme} onChange={(e) => updateTheme(e.target.value as any)}>
      <MenuItem value="light">Light</MenuItem>
      <MenuItem value="dark">Dark</MenuItem>
    </Select>
  );
};