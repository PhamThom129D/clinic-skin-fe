"use client";
import React from "react";
import { List, ListItem, ListItemButton, ListItemIcon, ListItemText, Typography, Collapse, useTheme } from "@mui/material";
import Link from 'next/link';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ExpandLessIcon from '@mui/icons-material/ExpandLess';
import { usePathname } from "next/navigation";
import path from "path";

interface SidebarSectionProps {
  title: string;
  mainIcon: React.ReactNode; // Tên prop đã được đổi
  items: {
    text: string;
    icon: React.ReactNode;
    href: string;
  }[];
  isOpen: boolean;
  onClick: () => void;
  href?: string;
}

const SidebarSection: React.FC<SidebarSectionProps> = ({ title, mainIcon, items, isOpen, onClick, href }) => {
  const theme = useTheme();
  const isDark = theme.palette.mode === "dark";
  const pathName = usePathname();

  const isActive = href === pathName || items.some(item => item.href === pathName);

  return (
    <>
      <ListItem disablePadding>
        <ListItemButton onClick={onClick}>
          <ListItemIcon sx={{ color: isDark ? theme.palette.text.primary : theme.palette.text.secondary }}>
            {mainIcon}
          </ListItemIcon>
          <ListItemText primary={<Typography fontWeight="medium">{title}</Typography>} />
          {isOpen ? <ExpandLessIcon /> : <ExpandMoreIcon />}
        </ListItemButton>
      </ListItem>
      <Collapse in={isOpen} timeout="auto" unmountOnExit>
        <List component="div" disablePadding>
          {items.map((item) => {
            const activeItem = pathName === item.href;
            return (
              <ListItem key={item.text} disablePadding sx={{ pl: 4 }}>
                <ListItemButton
                  component={Link}
                  href={item.href}
                  selected={activeItem}
                  sx={{
                    borderRadius: 1,
                    "&:hover": {
                      backgroundColor: theme.palette.action.hover,
                    },
                    "&.Mui-selected": {
                      backgroundColor: theme.palette.action.selected,
                      "&:hover": {
                      backgroundColor: isDark ? "#333333" : "#d5d5d5",
                      },
                    },
                  }}
                >
                  <ListItemIcon sx={{ color: activeItem ? theme.palette.primary.main : (isDark ? theme.palette.text.primary : theme.palette.text.secondary) }}>
                    {item.icon}
                  </ListItemIcon>
                  <ListItemText primary={<Typography fontWeight="medium" color={activeItem ? "primary" : "inherit"}>{item.text}</Typography>} />
                </ListItemButton>
              </ListItem>
            );
          })}
        </List>
      </Collapse>
    </>
  );
};

export default SidebarSection;