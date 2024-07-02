import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Avatar from '@material-ui/core/Avatar';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import { Drawer } from '@material-ui/core';
import Search from './search';
import Backup from './backup';
import AddIcon from '@mui/icons-material/Add';
import SearchIcon from '@mui/icons-material/Search';

const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
  },
  drawerPaper: {
    width: drawerWidth,
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(3),
  },
  avatar: {
    margin: 'auto',
    width: theme.spacing(10),
    height: theme.spacing(10),
  },
  card: {
    maxWidth: 600,
    margin: 'auto',
    marginTop: theme.spacing(5),
  },
}));

const Dashboard = () => {
  const classes = useStyles();
  const [currentContent, setCurrentContent] = useState('nikah');

  const handleClickSearch = () => {
    setCurrentContent('search');
  };

  const handleClickNikahNama = () => {
    setCurrentContent('nikah');
  };

  return (
    <div className={classes.root}>
      <Drawer
        className={classes.drawer}
        variant="permanent"
        classes={{
          paper: classes.drawerPaper,
        }}
      >
        <div>
          <br />
          <br />
          <Avatar
            alt="Profile Image"
            src="/path_to_image.jpg"
            className={classes.avatar}
          />

          <List>
            <ListItem button onClick={handleClickSearch}>
                <ListItemIcon>
                <SearchIcon />
              </ListItemIcon>
              <ListItemText primary="Search" />
            </ListItem>

            <ListItem button onClick={handleClickNikahNama}>
              <ListItemIcon>
                <AddIcon />
              </ListItemIcon>
              <ListItemText primary="Nikah Nama" />
            </ListItem>
          </List>
        </div>
      </Drawer>
      <main className={classes.content}>

        {/* Conditionally render content based on currentContent state */}
        {currentContent === 'nikah' && <Backup />}
        {currentContent === 'search' && <Search />}

        {/* Optionally add cards for other content sections */}
      </main>
    </div>
  );
};

export default Dashboard;
