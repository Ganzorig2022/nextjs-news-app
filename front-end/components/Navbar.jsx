import {
  AppBar,
  Box,
  Toolbar,
  Typography,
  Stack,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  useMediaQuery,
  useTheme,
} from '@mui/material';
import { useRouter } from 'next/router';
// import MenuIcon from '@mui/icons-material/Menu';
import { useEffect, useState } from 'react';
import { useAuthContext } from '@/context/AuthContext';

const Navbar = ({ children }) => {
  // const [scrollValue, setScrollValue] = useState(0);
  const theme = useTheme();
  const router = useRouter();
  const { isLoggedIn } = useAuthContext();
  const routerHandler = (path) => {
    if (path === '/blogs') {
      if (!isLoggedIn) router.push('/login');
    } else router.push(path);
  };

  // useEffect(() => {
  //   window.onscroll = (event) => {
  //     setScrollValue(window.pageYOffset);
  //   };
  // });
  const is600px = useMediaQuery(theme.breakpoints.down('sm'));

  return (
    <>
      <Box sx={{ flexGrow: 1 }}>
        <AppBar
          position='fixed'
          sx={{
            background: router.pathname === '/' ? 'transparent' : '#fff',
            color: router.pathname === '/' ? '#fff' : '#6D7D8B',
            boxShadow: router.pathname === '/' ? '0' : '',
          }}
        >
          <Toolbar>
            {/* <IconButton
              size='large'
              edge='start'
              color='inherit'
              aria-label='menu'
              sx={{ mr: 2 }}
            >
              <MenuIcon />
            </IconButton> */}
            <Typography
              variant='h6'
              component='div'
              sx={{ flexGrow: 1 }}
              fontWeight={800}
              color={router.pathname === '/' ? '#fff' : '#1E2742'}
            >
              teams.
            </Typography>
            <Stack direction='row'>
              <List>
                <ListItem
                  sx={{
                    padding: '0',
                  }}
                >
                  <ListItemButton onClick={(e) => routerHandler('/')}>
                    <ListItemText
                      primary='Home'
                      sx={{
                        textDecoration:
                          router.pathname === '/' ? 'none' : 'underline',
                      }}
                    />
                  </ListItemButton>
                </ListItem>
              </List>
              <List>
                <ListItem sx={{ padding: '0' }}>
                  <ListItemButton onClick={(e) => routerHandler('/blogs')}>
                    <ListItemText
                      primary='Blog'
                      sx={{
                        textDecoration:
                          router.pathname === '/' ? 'none' : 'underline',
                      }}
                    />
                  </ListItemButton>
                </ListItem>
              </List>
              <List>
                <ListItem sx={{ padding: '0' }}>
                  <ListItemButton>
                    <ListItemText
                      primary='Contacts'
                      sx={{
                        textDecoration:
                          router.pathname === '/' ? 'none' : 'underline',
                      }}
                    />
                  </ListItemButton>
                </ListItem>
              </List>
              <List>
                {!isLoggedIn ? (
                  <ListItem sx={{ padding: 0 }}>
                    <ListItemButton onClick={(e) => routerHandler('/login')}>
                      <ListItemText
                        primary='Login'
                        sx={{
                          textDecoration:
                            router.pathname === '/login' ? 'none' : 'underline',
                        }}
                      />
                    </ListItemButton>
                  </ListItem>
                ) : (
                  <ListItem sx={{ padding: 0 }}>
                    <ListItemButton onClick={(e) => routerHandler('/logout')}>
                      <ListItemText
                        primary='Logout'
                        sx={{
                          textDecoration:
                            router.pathname === '/login' ? 'none' : 'underline',
                        }}
                      />
                    </ListItemButton>
                  </ListItem>
                )}
              </List>
              <List>
                <ListItem
                  sx={{
                    padding: 0,
                    border:
                      router.pathname === '/'
                        ? '1px solid #ffffff'
                        : '2px solid #4DA0FD',
                    background: router.pathname === '/' ? 'none' : '#4DA0FD',
                  }}
                >
                  <ListItemButton>
                    <ListItemText
                      primary='Get Access'
                      sx={{
                        color: router.pathname === '/' ? '#fff' : '#6D7D8B',
                      }}
                    />
                  </ListItemButton>
                </ListItem>
              </List>
            </Stack>
          </Toolbar>
        </AppBar>
      </Box>
      {children}
    </>
  );
};
export default Navbar;
