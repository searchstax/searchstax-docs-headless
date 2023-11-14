import React, { useEffect, useState } from 'react'
import './Docs.css'
import { Link, useNavigate } from "react-router-dom";
import { Parser, ProcessNodeDefinitions } from "html-to-react";

import { fetchArticleFromID, fetchAliases } from "../../api/drupal";
import { popular } from '../../api/popular';

import type { popularResult } from '../../interface/popularResults';
import type { article, menuLink, urlAlias } from '../interface/drupal';

import Curl from '../Curl/Curl';
import Code from '../Code/Code';
import NavMenu from '../NavMenu/NavMenu';

// MUI
import Avatar from '@mui/material/Avatar';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Chip from '@mui/material/Chip';
import Container from '@mui/material/Container';
import Drawer from '@mui/material/Drawer';
import Fade from '@mui/material/Fade';
import SpeedDial from '@mui/material/SpeedDial';
import Stack from '@mui/material/Stack';
import Tab from '@mui/material/Tab';
import Tabs from '@mui/material/Tabs';
import Typography from '@mui/material/Typography';
import useScrollTrigger from '@mui/material/useScrollTrigger';

// MUI Icons
import CloseIcon from '@mui/icons-material/Close';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import TerminalIcon from '@mui/icons-material/Terminal';

function Docs(props: { url?: string, section?: string, navMenu?: menuLink[] }) {
  const {
    url = '',
    section = '',
    navMenu = null,
  } = props;
  const [selectedTab, setSelectedTab] = React.useState(0);
  const [aliases, setAliases] = useState<urlAlias[] | null>([]);
  const [showCodeDrawer, setShowCodeDrawer] = useState<boolean>(false);
  const [reactContent, setReactContent] = useState(null);
  const [menuParentID, setMenuParentID] = useState<string>('');
  const [popularResults, setPopularSearches] = useState<popularResult[]>([]);
  const navigate = useNavigate();
  const [scrollTarget] = useState<Node | Window | undefined>()
  const scrollToTopTrigger = useScrollTrigger({ target: scrollTarget });

  useEffect(() => {
    void fetchAliases().then((data: urlAlias) => {
      setAliases(data);
    });
    void popular('en').then(data => {
      setPopularSearches(data.response.docs);
    });
  }, []);

  useEffect(() => {
    if (navMenu !== null && section !== '') {
      const firstMenuItem = navMenu
        .filter((item) => { return item.attributes.menu_name === section && item.attributes.parent === null })
        .sort((a, b) => { return a.attributes.weight < b.attributes.weight ? -1 : 1 })[0];
      setMenuParentID(firstMenuItem.id);
      setSelectedTab(0);
    }
  }, [navMenu, section]);

  useEffect(() => {
    if (aliases?.length) {
      const drupalPath = aliases.find((page) => { return page.attributes.alias === url});
      if (drupalPath) {
        void fetchArticleFromID(drupalPath.attributes.path.replace('/node/','')).then((data: article) => {
          if (data.data) {
            document.title = data.data[0].attributes.title;

            const htmlInput = data.data[0].attributes.body.value;
            const isValidNode = () => { return true; };
            const processNodeDefinitions = ProcessNodeDefinitions(React);
            const processingInstructions = [
              {
                shouldProcessNode: (node) => { return node.name && node.name === 'a'; },
                processNode: (node, children, index) => {
                  return React.createElement(React.Fragment, {key: index,}, [
                    <a
                      key={index}
                      href={node.attribs.href}
                      onClick={(e) => { handleLink(e, node.attribs.href); }}
                    >
                      {node.children[0].data}
                    </a>
                  ]);
                }
              },
              {
                shouldProcessNode: (node) => { return node.name && node.name === 'pre'; },
                processNode: (node, children, index) => {
                  return React.createElement(React.Fragment, {key: index,}, [
                    <Code
                      key={index}
                      text={node.children[0].data}
                      openConsole={handleShowConsole}
                    />
                  ]);
                }
              },
              {
                shouldProcessNode: () => { return true; },
                processNode: processNodeDefinitions.processDefaultNode,
              },
            ];
          setReactContent(Parser().parseWithInstructions(htmlInput, isValidNode, processingInstructions));
          }
        });
      }
    }
  }, [url, aliases]);

  const handleLink = (e, url: string) => {
    if (aliases?.length) {
      const drupalPath = aliases.find((page) => { return page.attributes.alias === url});
      if (drupalPath) {
        e.preventDefault();
        navigate(url);
        return false;
      }
    }
  }

  const handleTab = (event: React.SyntheticEvent, newValue: number) => {
    setSelectedTab(newValue);
  };

  const handleShowConsole = () => {
    setShowCodeDrawer(true);
  }

  const handleScrollTotop = () => {
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: "smooth",
    });
  }

  const loadSearch = (query: string): void => {
    navigate(`search?searchstax[query]=${query}&searchstax[page]=1`);
  }

  return (
    <Box>
      <Stack direction="row">
        <Tabs value={selectedTab} onChange={handleTab} sx={{flexGrow: 1}}>
          {navMenu && navMenu
            .filter((item) => { return item.attributes.menu_name === section && item.attributes.parent === null })
            .sort((a, b) => { return a.attributes.weight < b.attributes.weight ? -1 : 1 })
            .map((menu, index) => (
              <Tab
                key={index}
                component={Link}
                to={menu.attributes.link.uri.replace('internal:','')}
                label={menu.attributes.title}
                onClick={() => { setMenuParentID(menu.id); }}
              />
          ))}
        </Tabs>
        <Button
          onClick={() => { setShowCodeDrawer(!showCodeDrawer); }}
          variant="contained"
          size="small"
          sx={{m: 0.5}}
          startIcon={<TerminalIcon />}
        >
          API Console
        </Button>
      </Stack>
      <Stack direction="row">
        <Box sx={{ maxWidth: 360 }}>
          <NavMenu
            itemID={menuParentID}
            navMenu={navMenu}
            aliases={aliases}
          />
        </Box>
        <Container maxWidth="lg" sx={{textAlign: "left"}}>
          {reactContent && (
            <Box>
              {reactContent}
              <Box>
               {popularResults.length > 0
                  ? (
                    <Box>
                      <Typography variant="h6">
                        Popular Searches
                      </Typography>
                      {popularResults.map((result, index) => (
                        <Chip
                          key={index}
                          label={result.query}
                          onClick={() => { loadSearch(result.query); }}
                          avatar={<Avatar>{result.count}</Avatar>}
                        />
                      ))}
                    </Box>
                    )
                  : ('')}
              </Box>
            </Box>
          )}
          <Fade in={scrollToTopTrigger}>
            <Box
              sx={{
                position: 'fixed',
                bottom: 10,
                right: 10,
              }}
            >
              <SpeedDial
                ariaLabel="Back to Top"
                icon={<KeyboardArrowUpIcon />}
                onClick={handleScrollTotop}
              />
            </Box>
          </Fade>
        </Container>
        <Drawer
          variant="persistent"
          anchor="right"
          open={showCodeDrawer}
        >
          <Box sx={{pt: 12}}>
            <Button
              onClick={() => { setShowCodeDrawer(false); }}
              variant="outlined"
              sx={{ ml: 1 }}
              startIcon={<CloseIcon />}
            >
              Hide API Console
            </Button>
            <Curl />
          </Box>
        </Drawer>
      </Stack>
    </Box>
  )
}

export default Docs
