import React, { useState } from "react";
import { roleMenu, Role, menuIcons } from "../menuItem"; // menuIcons: { [key: string]: React.ReactNode }
import {
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  IconButton,
  Divider,
  Typography,
  Box
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";

interface SidebarProps {
  role: Role;
  selectedMenu: string;
  onSelectMenu: (menu: string) => void;
}

const drawerWidth = 240;

const Sidebar: React.FC<SidebarProps> = ({ role, selectedMenu, onSelectMenu }) => {
  const [open, setOpen] = useState(true);

  return (
    <Drawer
      variant="permanent"
      open={open}
      sx={{
        width: open ? drawerWidth : 64,
        flexShrink: 0,
        "& .MuiDrawer-paper": {
          width: open ? drawerWidth : 64,
          boxSizing: "border-box",
          transition: "width 0.3s",
        },
      }}
    >
      <Box display="flex" alignItems="center" justifyContent={open ? "space-between" : "center"} p={2}>
        {open && <Typography variant="h6" fontWeight="bold">Clinic</Typography>}
        <IconButton onClick={() => setOpen(!open)}>
          <MenuIcon />
        </IconButton>
      </Box>
      <Divider />
      <List>
        {roleMenu[role].map((item) => (
          <ListItem key={item} disablePadding>
            <ListItemButton
              selected={selectedMenu === item}
              onClick={() => onSelectMenu(item)}
              sx={{ justifyContent: open ? "initial" : "center" }}
            >
              <ListItemIcon sx={{ minWidth: 0, mr: open ? 2 : "auto", justifyContent: "center" }}>
                {menuIcons[item] || <MenuIcon />}
              </ListItemIcon>
              {open && <ListItemText primary={item} />}
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </Drawer>
  );
};

export default Sidebar;
