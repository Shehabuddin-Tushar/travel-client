import React,{useState,useEffect} from 'react';
import PropTypes from 'prop-types';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import CssBaseline from '@mui/material/CssBaseline';
import Divider from '@mui/material/Divider';
import Drawer from '@mui/material/Drawer';
import IconButton from '@mui/material/IconButton';
import InboxIcon from '@mui/icons-material/MoveToInbox';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import MailIcon from '@mui/icons-material/Mail';
import MenuIcon from '@mui/icons-material/Menu';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import { Button, MenuItem } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import ManageAccountsIcon from '@mui/icons-material/ManageAccounts';
import SupervisorAccountIcon from '@mui/icons-material/SupervisorAccount';
import AdminPanelSettingsIcon from '@mui/icons-material/AdminPanelSettings';
import useAuth from '../../hooks/useAuth';
import LogoutIcon from '@mui/icons-material/Logout';
import LoginIcon from '@mui/icons-material/Login';
import {
    Switch,
    Route,
    Link,
    useParams,
    useRouteMatch,
    useHistory,
    NavLink
} from "react-router-dom";
const drawerWidth = 240;


function Dashboard(props) {
    const { window } = props;
    const [mobileOpen, setMobileOpen] = React.useState(false);

        const {Logout,user}=useAuth();
        const[myrole,setMyrole]=useState();
 
       const [databaseuser,setDatabaseuser]=useState({});
       const useremail=user.email;
        useEffect(()=>{
            fetch(`http://localhost:5000/userfind/${user.email}`).then(res=>res.json()).then(data=>{
                setDatabaseuser(data);
                console.log(data)
            setMyrole(data.role==="admin"?true:false)
          
          })
        }, [useremail, myrole])
    
    const history = useHistory();
    const gotologin = () => {
        history.push("/login")
    }

    const logout = () => {
        Logout();
        history.push("/login")
    }










    let { path, url } = useRouteMatch();
    const handleDrawerToggle = () => {
        setMobileOpen(!mobileOpen);
    };

    const drawer = (
        <div>
            <Toolbar />
            <Divider />
            <List>
               
                <MenuItem>
                    <ListItemIcon>
                        <AdminPanelSettingsIcon />

                    </ListItemIcon>
                    <NavLink exact to={`${url}`} activeStyle={{ color: 'red' }} style={{ color: "#000", marginTop: "0px", padding: "10px 15px", textDecoration: "none" }}>Admin home</NavLink>
                </MenuItem>
                <Divider />
                {myrole && <MenuItem>
                    <ListItemIcon>
                        <ManageAccountsIcon />
                    </ListItemIcon>
                    <NavLink exact to={`${url}/manageblogs`} activeStyle={{ color: 'red' }} style={{ color: "#000", marginTop: "0px", padding: "10px 15px", textDecoration: "none" }}>Manage Blogs</NavLink>
                </MenuItem>}
                <Divider />
                {myrole && <MenuItem>
                    <ListItemIcon>
                        <AddIcon />
                    </ListItemIcon>
                    <NavLink to={`${url}/addblogs`} activeStyle={{ color: 'red' }} style={{ color: "#000", marginTop: "0px", padding: "10px 15px", textDecoration: "none" }}>Add Blogs</NavLink>
                </MenuItem>}
                <Divider />
                {myrole && <MenuItem>
                    <ListItemIcon>
                        <SupervisorAccountIcon />
                    </ListItemIcon>
                    <NavLink to={`${url}/makeadmin`} activeStyle={{ color: 'red' }} style={{ color: "#000", marginTop: "0px", padding: "10px 15px", textDecoration: "none" }}>Make admin</NavLink>
                </MenuItem>}

                <Divider />
                <MenuItem>
                    <ListItemIcon>
                        {user.email && myrole ? <LoginIcon /> : <LogoutIcon />}
                    </ListItemIcon>

                    {user.email ? <Button onClick={logout} style={{ color: "#000", marginTop: "0px", padding: "10px 15px", textDecoration: "none" }}>Logout</Button> : <Button onClick={gotologin} style={{ color: "#000", marginTop: "0px", padding: "10px 15px", textDecoration: "none" }}>LogIn</Button>}
                </MenuItem>
                
              
            </List>
            <Divider />
            
        </div>
    );

    const container = window !== undefined ? () => window().document.body : undefined;

    return (
        <Box sx={{ display: 'flex' }}>
            <CssBaseline />
            <AppBar
                position="fixed"
                sx={{
                    width: { sm: `calc(100% - ${drawerWidth}px)` },
                    ml: { sm: `${drawerWidth}px` },
                }}
            >
                <Toolbar>
                    <IconButton
                        color="inherit"
                        aria-label="open drawer"
                        edge="start"
                        onClick={handleDrawerToggle}
                        sx={{ mr: 2, display: { sm: 'none' } }}
                    >
                        <MenuIcon />
                    </IconButton>
                    <Typography variant="h6" noWrap component="div">
                        Travel destination Admin panel
                    </Typography>
                </Toolbar>
            </AppBar>
            <Box
                component="nav"
                sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 } }}
                aria-label="mailbox folders"
            >
                {/* The implementation can be swapped with js to avoid SEO duplication of links. */}
                <Drawer
                    container={container}
                    variant="temporary"
                    open={mobileOpen}
                    onClose={handleDrawerToggle}
                    ModalProps={{
                        keepMounted: true, // Better open performance on mobile.
                    }}
                    sx={{
                        display: { xs: 'block', sm: 'none' },
                        '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
                    }}
                >
                    {drawer}
                </Drawer>
                <Drawer
                    variant="permanent"
                    sx={{
                        display: { xs: 'none', sm: 'block' },
                        '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
                    }}
                    open
                >
                    {drawer}
                </Drawer>
            </Box>
            <Box
                component="main"
                sx={{ flexGrow: 1, p: 3, width: { sm: `calc(100% - ${drawerWidth}px)` } }}
            >
                <Toolbar />
                
                <Switch>
                    <Route exact path={path}>
                       <h1>tushar</h1>
                    </Route>
                    <Route path={`${path}/manageblogs`}>
                        <h1>manageblogs</h1>
                    </Route>
                    <Route path={`${path}/addblogs`}>
                         <h1>add blogs</h1>
                    </Route>
                    <Route path={`${path}/makeadmin`}>
                       <h1>make admin</h1> 
                    </Route>
                   
                    <Route path={`${path}/payment/:id`}>
                       
                    </Route>

                    

                    <Route path={`${path}/viewblog`}>
                        
                    </Route>

                    

                </Switch>
            </Box>
        </Box>
    );
}

Dashboard.propTypes = {
    /**
     * Injected by the documentation to work in an iframe.
     * You won't need it on your project.
     */
    window: PropTypes.func,
};

export default Dashboard;