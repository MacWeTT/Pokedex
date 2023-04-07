import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { AddCircleOutlineOutlined, SubjectOutlined } from "@mui/icons-material";
import {
  Drawer,
  Typography,
  List,
  ListItemIcon,
  ListItemText,
  ListItemButton,
  AppBar,
  Toolbar,
} from "@mui/material";
// import format from "date-fns/format";
const drawerWidth = 240;

const styles = {
  page: {
    background: "#f9f9f9",
    width: "100%",
    padding: 3,
  },
  drawer: {
    width: "240px",
  },
  drawerPaper: {
    width: "240px",
  },
  root: {
    display: "flex",
  },
  active: {
    background: "#f4f4f4",
  },
  title: {
    padding: 2,
  },
  appbar: {
    width: `calc(100% - ${drawerWidth}px)  !important`,
  },
};

const Layout = ({ children }: Props) => {
  const navigate = useNavigate();
  const location = useLocation();
  console.log(location.pathname);

  const menuItems = [
    {
      text: "Home",
      icon: <SubjectOutlined color="primary" />,
      path: "/",
    },
    {
      text: "Types",
      icon: <AddCircleOutlineOutlined color="primary" />,
      path: "/types",
    },
  ];

  return (
    <div style={styles.root}>
      <AppBar sx={styles.appbar} elevation={0}>
        <Toolbar>
          <Typography>Search</Typography>
        </Toolbar>
      </AppBar>

      <Drawer sx={styles.drawer} variant="permanent" anchor="left">
        <div>
          <Typography variant="h5" sx={styles.title}>
            Pokedex
          </Typography>
        </div>
        <List>
          {menuItems.map((item) => (
            <ListItemButton
              key={item.text}
              onClick={() => navigate(item.path)}
              sx={
                location.pathname === item.path
                  ? { backgroundColor: "#f4f4f4" }
                  : null
              }
            >
              <ListItemIcon>{item.icon}</ListItemIcon>
              <ListItemText primary={item.text} />
            </ListItemButton>
          ))}
        </List>
      </Drawer>
      <div style={styles.page}>{children}</div>
    </div>
  );
};

export default Layout;

interface Props {
  children: React.ReactNode;
}
