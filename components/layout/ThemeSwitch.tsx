import { MenuItem, Select, InputLabel, FormControl } from '@mui/material';
import { useUIStore } from '@/store/uiStore';
import useThemeActions from '@/hooks/useThemeActions';
import { UI_THEMES } from '@/constants/ui.options';

export default function ThemeSwitch() {
  const theme = useUIStore((state) => state.theme);
  const { updateTheme } = useThemeActions();

  const themeMap = UI_THEMES.map((t) => (
    <MenuItem key={t} value={t}>
      {t.charAt(0).toUpperCase() + t.slice(1)}
    </MenuItem>
  ));

  return (
    <FormControl fullWidth>
      <InputLabel id="theme-select-label">Theme</InputLabel>
      <Select
        labelId="theme-select-label"
        id="theme-select"
        value={theme}
        onChange={(e) => updateTheme(e.target.value as any)}
        aria-label="Select application theme"
      >
        {themeMap}
        
      </Select>
    </FormControl>
  );
}
