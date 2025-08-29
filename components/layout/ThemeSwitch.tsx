import { MenuItem, Select, InputLabel, FormControl } from '@mui/material';
import { useUIStore } from '@/store/uiStore';
import useThemeActions from '@/hooks/useThemeActions';
import { UI_THEMES } from '@/constants/ui.options';

type Theme = typeof UI_THEMES[number];

export default function ThemeSwitch() {
  const theme = useUIStore((state) => state.theme as Theme);
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
        onChange={(e) => updateTheme(e.target.value as Theme)}
        aria-label="Select application theme"
      >
        {themeMap}
      </Select>
    </FormControl>
  );
}
