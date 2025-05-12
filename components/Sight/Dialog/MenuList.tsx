import { Box, Typography } from "@mui/material";

interface MenuItem {
  name: string;
  price?: string;
  description?: string;
}

interface MenuListProps {
  menu: MenuItem[];
  label: string;
}

const MenuList = ({ menu = [], label }: MenuListProps) => {
    return (
      menu.length > 0 && (
        <Box sx={{mt: 2}}>
          <Typography variant="h6" component="h2" sx={{ textDecoration: "underline" }}><strong>{label}</strong></Typography>
          <ul>
            {menu.map((item, index) => (
              <li key={index}>
                <strong>{item.name}</strong> ({item.price || "N/A"})<br />
                {item.description && <em>{item.description}</em>}
              </li>
            ))}
          </ul>
        </Box>
      )
    );
  };
  
  export default MenuList;