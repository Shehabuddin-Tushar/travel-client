import React,{useState,useEffect} from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import Container from '@mui/material/Container';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import Tooltip from '@mui/material/Tooltip';
import MenuItem from '@mui/material/MenuItem';
import { Link, NavLink } from 'react-router-dom'
import './Navbar.css'
import useAuth from '../../hooks/useAuth';



const ResponsiveAppBar = () => {
  const { user, Logout } = useAuth()
  const [anchorElNav, setAnchorElNav] = React.useState(null);
  const [anchorElUser, setAnchorElUser] = React.useState(null);
  const [myrole, setMyrole] = useState();
  const [databaseuser, setDatabaseuser] = useState({});
   console.log(user.photoURL)
  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };
  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  const useremail = user.email;
  useEffect(() => {
    fetch(`http://localhost:5000/userfind/${user.email}`).then(res => res.json()).then(data => {
      setDatabaseuser(data);
      
      setMyrole(data.role === "admin" ? true : false)

    })
  }, [useremail, myrole])

  return (
    <AppBar position="fixed" style={{ backgroundColor:"#2a72d8"}}>
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <Typography
            variant="h6"
            noWrap
            component="div"
            sx={{ mr: 2, display: { xs: 'none', md: 'flex' } }}
          >
             
                <img src="https://i.postimg.cc/XNGYBNwp/logo.png" style={{ height: "70px", width: "70px" }} />
          
            
          </Typography>

          <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
            <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleOpenNavMenu}
              color="inherit"
            >
              <MenuIcon />
            </IconButton>
            <Menu
              id="menu-appbar"
              anchorEl={anchorElNav}
              anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'left',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'left',
              }}
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}
              sx={{
                display: { xs: 'block', md: 'none' },
              }}
              className="mainmenumobile"
            >
            
              <MenuItem onClick={handleCloseNavMenu}>
                <NavLink exact to="/" activeStyle={{ textDecoration: "none", color: "#000", fontWeight: "bold", padding: "5px 0px" }}>Home</NavLink>
                  
              </MenuItem>

              <MenuItem onClick={handleCloseNavMenu}>
                <NavLink to="/blog" activeStyle={{ textDecoration: "none", color: "#000", fontWeight: "bold", padding: "5px 0px" }}>Blog</NavLink>

              </MenuItem>
              {
                !user.email &&
               <>
                  
                  <MenuItem onClick={handleCloseNavMenu}>
                    <NavLink to="/login" activeStyle={{ textDecoration: "none", color: "#000", fontWeight: "bold", padding: "5px 0px" }}>Login</NavLink>
                  </MenuItem>
                </>
              }
              {
                user.email &&
                <>
                <MenuItem onClick={handleCloseNavMenu}>
                    <NavLink to="/addexperience" activeStyle={{ textDecoration: "none", color: "#000", fontWeight: "bold", padding: "5px 0px" }}>Add your experience</NavLink>
                
                  </MenuItem>
                  <MenuItem onClick={handleCloseNavMenu} >
                    <Button onClick={Logout} style={{ textDecoration: "none", color: "gray", fontWeight: "bold", padding: "0px 0px" }}>Logout</Button>
                  </MenuItem>
                </>
              }

              {
                user.email && myrole &&
                <>
                  <MenuItem onClick={handleCloseNavMenu}>
                    <NavLink to="/dashboard" activeStyle={{ textDecoration: "none", color: "#000", fontWeight: "bold", padding: "5px 0px" }}>dashboard</NavLink>

                  </MenuItem>
                  
                </>
              }
            </Menu>
          </Box>
          <Typography
            variant="h6"
            noWrap
            component="div"
            sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}
          >
            Travel-destination
          </Typography>
          <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }} className="mainmenu">
            
              <Button
               
                onClick={handleCloseNavMenu}
                sx={{ my: 2, color: 'white', display: 'block' }}
              >
              <NavLink exact to="/" activeStyle={{ textDecoration: "none", color: "#000", fontWeight: "bold", padding: "5px 0px" }}>Home</NavLink>
            </Button>

            <Button

              onClick={handleCloseNavMenu}
              sx={{ my: 2, color: 'white', display: 'block' }}
            >
              <NavLink  to="/blog" activeStyle={{ textDecoration: "none", color: "#000", fontWeight: "bold", padding: "5px 0px" }}>Blog</NavLink>
            </Button>
            {
              user.email &&
              <Button

                onClick={handleCloseNavMenu}
                sx={{ my: 2, color: 'white', display: 'block' }}
              >
                <NavLink to="/addexperience" activeStyle={{ textDecoration: "none", color: "#000", fontWeight: "bold", padding: "5px 0px" }}>Add your experience</NavLink>
              </Button>
            }
            {!user.email && 
              <>
            <Button
               onClick={handleCloseNavMenu}
              sx={{ my: 2, color: 'white', display: 'block' }}
            >
              <NavLink to="/login" activeStyle={{ textDecoration: "none", color: "#000", fontWeight: "bold", padding: "5px 0px" }}>Login</NavLink>
            </Button>

            
            </>
            }
            {user.email && myrole &&
              <>
                <Button
                  onClick={handleCloseNavMenu}
                  sx={{ my: 2, color: 'white', display: 'block' }}
                >
                  <NavLink to="/dashboard" activeStyle={{ textDecoration: "none", color: "#000", fontWeight: "bold", padding: "5px 0px" }}>dashboard</NavLink>
                </Button>


              </>
            }
            
            {user.email &&
              <Button

                onClick={handleCloseNavMenu}
                sx={{ my: 2, color: 'white', display: 'block' }}
                onClick={Logout}
              >
                <NavLink to="" activeStyle={{ textDecoration: "none", color: "white", fontWeight: "bold", padding: "5px 0px" }}>Logout</NavLink>
              </Button>
            }
          </Box>

          <Box sx={{ flexGrow: 0 }}>
            <Tooltip title="Click here">
              <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                {
                  user.photoURL ?  <Avatar alt="Remy Sharp" src={user.photoURL} /> :
                    <Avatar alt="Remy Sharp" src="/static/images/avatar/2.jpg" />
                }
               
              </IconButton>
            </Tooltip>
            <Menu
              sx={{ mt: '45px' }}
              id="menu-appbar"
              anchorEl={anchorElUser}
              anchorOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              open={Boolean(anchorElUser)}
              onClose={handleCloseUserMenu}
             
            >
              <MenuItem onClick={handleCloseUserMenu}>
                {
                  user.displayName ? <Typography textAlign="center"><p style={{ fontSize: "10px" }}>{user.displayName}</p></Typography> :
                    <Link to="/login" textAlign="center"><p style={{ fontSize: "10px" }}>first login</p></Link>
                }
                
              </MenuItem>
            </Menu>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
};
export default ResponsiveAppBar;