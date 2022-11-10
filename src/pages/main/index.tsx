import {
  AppBar,
  Box,
  Button,
  Container,
  IconButton,
  Menu,
  MenuItem,
  Typography,
} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import { Link, Outlet, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { StyledContainer } from './style';
import { routes } from '../../constants/routes';
import { StyledLinksMenuItem } from '../director-page/styles';

const Main = () => {
  const navigate = useNavigate();
  const handleExit = () => {
    navigate('/sign-in', { replace: true });
    localStorage.removeItem('userType');
    localStorage.removeItem('userId');
  };
  const pages = [
    {
      name: 'Employees',
      link: routes.employees,
    },
    {
      name: 'Add employee',
      link: routes.addEmployee,
    },
    {
      name: 'Update employee',
      link: routes.updateEmployee,
    },
    {
      name: 'Clients',
      link: routes.clients,
    },
    {
      name: 'Add client',
      link: routes.addClient,
    },
    {
      name: 'Doctors',
      link: routes.employees,
    },
    {
      name: 'Nurses',
      link: routes.employees,
    },
    {
      name: 'Clinic comments',
      link: routes.clinicCommentPage,
    },
    {
      name: 'Add animal to client',
      link: routes.addAnimal,
    },
  ];
  const directorPages = [
    {
      name: 'Employees',
      link: routes.employees,
    },
    {
      name: 'Add employee',
      link: routes.addEmployee,
    },
    {
      name: 'Update employee',
      link: routes.updateEmployee,
    },
    {
      name: 'Clients',
      link: routes.clients,
    },
    {
      name: 'Clinic comments',
      link: routes.clinicCommentPage,
    },
  ];
  const adminPages = [
    {
      name: 'Clients',
      link: routes.clients,
    },
    {
      name: 'Add client',
      link: routes.addClient,
    },
    {
      name: 'Add animal to client',
      link: routes.addAnimal,
    },
    {
      name: 'Employees',
      link: routes.employees,
    },
  ];
  const clientPages = [
    {
      name: 'Employees',
      link: routes.employees,
    },
    {
      name: 'Add animal to client',
      link: routes.addAnimal,
    },
    {
      name: 'Clinic comments',
      link: routes.clinicCommentPage,
    },
  ];
  const doctorPages = [
    {
      name: 'Clients',
      link: routes.clients,
    },
    {
      name: 'Nurses',
      link: routes.employees,
    },
  ];
  const internPages = [
    {
      name: 'Clients',
      link: routes.clients,
    },
  ];
  // TODO: make this with localStorage like if -->
  // TODO: localStorage.getItem('userType)==='director' -->
  // TODO: then link='director/' -->
  // TODO: and pass this link into menu item Link component
  const userTypesAccordingToLinks = [
    {
      type: 'director',
      link: 'director/',
    },
    {
      type: 'admin',
      link: 'admin/',
    },
    {
      type: 'doctor',
      link: 'doctor/',
    },
    {
      type: 'nurse',
      link: 'nurse/',
    },
    {
      type: 'client',
      link: 'client/',
    },
  ];
  const [anchorElNav, setAnchorElNav] = useState<null | HTMLElement>(null);

  const handleOpenNavMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElNav(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };
  const linksArray =
    localStorage.getItem('userType') === 'director'
      ? directorPages
      : localStorage.getItem('userType') === 'admin'
      ? adminPages
      : localStorage.getItem('userType') === 'doctor'
      ? doctorPages
      : localStorage.getItem('userType') === 'intern'
      ? internPages
      : localStorage.getItem('userType') === 'client'
      ? clientPages
      : [];
  return (
    <>
      <AppBar position="static">
        <StyledContainer maxWidth="xl">
          <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
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
                display: { md: 'block' },
              }}
            >
              {linksArray.map((page) => (
                <StyledLinksMenuItem key={page.name} onClick={handleCloseNavMenu}>
                  <Link to={`${localStorage.getItem('userType')}/${page.link}`}>
                    <Typography textAlign="center">{page.name}</Typography>
                  </Link>
                </StyledLinksMenuItem>
              ))}
            </Menu>
          </Box>
          <Button onClick={handleExit} size="large" variant="text" color="inherit">
            Выйти
          </Button>
          <Typography
            variant="h4"
            noWrap
            sx={{
              mr: 1,
              display: { xs: 'none', md: 'flex' },
              fontFamily: 'Arial',
              fontWeight: 200,
              letterSpacing: '.3rem',
              color: 'inherit',
              textDecoration: 'none',
            }}
          >
            Vet clinic
          </Typography>
        </StyledContainer>
      </AppBar>

      <Outlet />
    </>
  );
};

export default Main;
