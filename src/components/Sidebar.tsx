import React from 'react';
import {
  createStyles,
  Theme,
  useTheme,
  makeStyles
} from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import List from '@material-ui/core/List';
import Hidden from '@material-ui/core/Hidden';
import Divider from '@material-ui/core/Divider';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import InboxIcon from '@material-ui/icons/MoveToInbox';
import MailIcon from '@material-ui/icons/Mail';
import Datatable from './DataTable/CustomDataTable';
import { Link, Route } from 'react-router-dom';
import { drawerWidth } from './../common/constants';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    drawer: {
      [theme.breakpoints.up('sm')]: {
        width: drawerWidth,
        flexShrink: 0
      }
    },
    toolbar: theme.mixins.toolbar,
    drawerPaper: {
      width: drawerWidth
    },
    content: {
      flexGrow: 1,
      padding: theme.spacing(3)
    }
  })
);

interface SidebarProps {
  mobileOpen: boolean;
  onDrawerToggle(): void;
  container?: Element;
}

const Sidebar: React.FC<SidebarProps> = props => {
  const { container } = props;
  const classes = useStyles();
  const theme = useTheme();

  const routes = [
    {
      path: '/',
      exact: true,
      name: 'Dashboard',
      component: () => (
        <div>
          <Datatable />
        </div>
      )
    },
    {
      path: '/users',
      name: 'Users',
      component: () => <div>Users</div>
    },
    {
      path: '/tiers',
      name: 'Tiers',
      component: () => <div>Tiers</div>
    }
  ];

  const drawer = (
    <div>
      <div className={classes.toolbar} />
      <Divider />
      <List>
        {routes.map(({ name, path }, index) => (
          <ListItem
            button
            key={name}
            component={Link}
            to={path}
            onClick={props.mobileOpen ? props.onDrawerToggle : () => {}}
          >
            <ListItemIcon>
              {index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
            </ListItemIcon>
            <ListItemText primary={name} />
          </ListItem>
        ))}
      </List>
    </div>
  );

  const renderBody = (
    <>
      <nav className={classes.drawer} aria-label="mailbox folders">
        {/* The implementation can be swapped with js to avoid SEO duplication of links. */}
        <Hidden smUp implementation="css">
          <Drawer
            container={container}
            variant="temporary"
            anchor={theme.direction === 'rtl' ? 'right' : 'left'}
            open={props.mobileOpen}
            onClose={props.onDrawerToggle}
            classes={{
              paper: classes.drawerPaper
            }}
            ModalProps={{
              keepMounted: true // Better open performance on mobile.
            }}
          >
            {drawer}
          </Drawer>
        </Hidden>
        <Hidden xsDown implementation="css">
          <Drawer
            classes={{
              paper: classes.drawerPaper
            }}
            variant="permanent"
            open
          >
            {drawer}
          </Drawer>
        </Hidden>
      </nav>
      <main className={classes.content}>
        <div className={classes.toolbar} />
        {routes.map((route, index) => (
          // You can render a <Route> in as many places
          // as you want in your app. It will render along
          // with any other <Route>s that also match the URL.
          // So, a sidebar or breadcrumbs or anything else
          // that requires you to render multiple things
          // in multiple places at the same URL is nothing
          // more than multiple <Route>s.
          <Route
            key={index}
            path={route.path}
            exact={route.exact}
            component={route.component}
          />
        ))}
      </main>
    </>
  );

  return renderBody;
};

export default Sidebar;
