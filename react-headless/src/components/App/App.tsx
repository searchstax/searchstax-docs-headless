import { useEffect, useState } from 'react'
import './App.css'
import { Routes, Route, Link, useLocation, useNavigate } from "react-router-dom";

import { fetchNavMenu } from "../../api/drupal";

import type { menuLink } from '../interface/drupal';

import Docs from '../Docs/Docs';
import Footer from '../Footer/Footer';
import Search from '../Search/Search';
import SearchBar from '../SearchBar/SearchBar';

// MUI
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Toolbar from '@mui/material/Toolbar';
import { ThemeProvider, createTheme } from '@mui/material/styles';

function App() {
  const [navMenu, setNavMenu] = useState<menuLink[] | null>(null);
  const [section, setSection] = useState<string>('');
  const navigate = useNavigate();
  const location = useLocation();
  const theme = createTheme({
    palette: {
      primary: {
        main: '#EB3500',
      }
    }
  });

  useEffect(() => {
    if (navMenu === null) {
      void fetchNavMenu().then((data: menuLink[]) => {
        setNavMenu(data);
      })
    }
  }, [navMenu]);

  useEffect(() => {
    if (location.search.includes('searchstax[query]') && !location.pathname.includes('/search')) {
      navigate('/search');
    }
    if (location.pathname.startsWith('/docs/searchstudio')) {
      setSection('studio');
    }
    else if (location.pathname.startsWith('/cloud')) {
      setSection('cloud');
    }
    else {
      setSection('');
    }
  }, [location, navigate]);

  return (
    <div className="App">
      <ThemeProvider theme={theme}>
        <AppBar position="fixed" sx={{ backgroundColor: '#FFF', zIndex: (theme) => theme.zIndex.drawer + 1 }}>
          <Toolbar sx={{display: 'flex', height: 90}}>
            <Box
              sx={{maxHeight: 30, mr: 3}}
              component="img"
              src="/logo.svg"
            />
            <Box sx={{flexGrow: 1}}>
              {navMenu && navMenu
                .filter((item) => { return item.attributes.menu_name === 'main' })
                .sort((a, b) => { return a.attributes.weight < b.attributes.weight ? -1 : 1 })
                .map((menu, index) => (
                <Button
                  key={index}
                  component={Link}
                  to={menu.attributes.link.uri.replace('internal:','')}
                  sx={{ color: '#222' }}
                  variant={section !== '' && menu.attributes.link.uri.replace('internal:','').startsWith(`/${section}`) ? 'contained' : ''}
                >
                    {menu.attributes.title}
                </Button>
              ))}
            </Box>
            {location.pathname !== '/search' && (
              <SearchBar section={section} />
            )}
          </Toolbar>
        </AppBar>
        <Box sx={{mt: 12, minHeight: 'calc(100vh - 26.8rem)'}}>
          <Routes>
            <Route path="/">
              <Route index element={<Box />} />
              <Route path="docs" element={<Docs url={location.pathname} />} />
              <Route path="search" element={<Search />} />
              <Route path="*" element={<Docs url={location.pathname} navMenu={navMenu} section={section} />} />
            </Route>
          </Routes>
        </Box>
        <Footer />
      </ThemeProvider>
    </div>
  )
}

export default App
