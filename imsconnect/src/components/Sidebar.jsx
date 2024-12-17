import React from 'react';
import { useAuth } from '../context/AuthContext';
import { NavLink } from 'react-router-dom';
import { List, ListItem, ListItemText, Drawer, Divider } from '@mui/material';

const Sidebar = () => {
  const { user } = useAuth();

  return (
    <Drawer
      sx={{
        width: 240,
        flexShrink: 0,
        '& .MuiDrawer-paper': {
          width: 240,
          boxSizing: 'border-box',
          height: 'calc(100vh - 64px)', // Subtract height of the header (adjust as needed)
          top: '64px', // This ensures the sidebar starts below the header
        },
      }}
      variant="permanent"
      anchor="left"
    >
      <List>
        {user?.role === 'manager' ? (
          <>
            <ListItem button component={NavLink} to="/admin">
              <ListItemText primary="Dashboard" />
            </ListItem>
            <ListItem button component={NavLink} to="/admin/reports">
              <ListItemText primary="Reports" />
            </ListItem>
            <ListItem button component={NavLink} to="/view-ideas">
              <ListItemText primary="View Others' Ideas" />
            </ListItem>
            <ListItem button component={NavLink} to="/admin/payroll">
              <ListItemText primary="Payroll" />
            </ListItem>
          </>
        ) : (
          <>
            <ListItem button component={NavLink} to="/employee">
              <ListItemText primary="Dashboard" />
            </ListItem>
            <ListItem button component={NavLink} to="/employee/timesheets">
              <ListItemText primary="Timesheets" />
            </ListItem>
            <ListItem button component={NavLink} to="/view-ideas">
              <ListItemText primary="View Others' Ideas" />
            </ListItem>
          </>
        )}
      </List>
      <Divider />
    </Drawer>
  );
};

export default Sidebar;
