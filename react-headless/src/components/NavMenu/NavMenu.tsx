import React, { useEffect, useState } from 'react'
import './NavMenu.css'
import { Link } from "react-router-dom";

import type { menuLink, urlAlias } from '../interface/drupal';

// MUI
import Collapse from '@mui/material/Collapse';
import List from '@mui/material/List';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';

// MUI Icons
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import ExpandMore from '@mui/icons-material/ExpandMore';

function NavMenu(props: { itemID?: string, navMenu?: menuLink[], aliases?: urlAlias[], level?: number }) {
  const {
    itemID = '',
    navMenu = null,
    aliases = [],
    level = 0,
  } = props;
  const [item, setItem] = useState<menuLink>(null);
  const [open, setOpen] = useState<boolean>(true);
  const [subItems, setSubItems] = useState<menuLink[]>([]);

  useEffect(() => {
    if (navMenu !== null) {
      setSubItems(
        navMenu.filter((item) => {
          return item.attributes.parent === 'menu_link_content:' + itemID
        })
        .sort((a, b) => { return a.attributes.weight < b.attributes.weight ? -1 : 1 })
      );
      if (itemID !== '') {
        setItem(
          navMenu.find((item) => {
            return item.id === itemID
          })
        );
      }
    }
  }, [itemID, navMenu]);

  return (
    <>
      {navMenu !== null && item ? (
        <List
          sx={{width: 320, bgcolor: 'background.paper' }}
          component="nav"
          disablePadding={true}
        >
          {subItems.length && subItems.length !== 0 ? (
            <>
              {level !== 0 ? (
                <ListItemButton onClick={() => { setOpen(!open); }}>
                  <ListItemText primary={item.attributes.title} sx={{ pl: level * 1.5 }} />
                  {open ? <ExpandMore /> : <ChevronRightIcon />}
                </ListItemButton>
              ) : ('')}
              <Collapse in={open}>
                {subItems
                .map((menu, index) => (
                  <NavMenu key={index} itemID={menu.id} parentID={item.id} navMenu={navMenu} aliases={aliases} level={level + 1} />
                ))}
              </Collapse>
              </>
            ) : (
              <ListItemButton
                component={Link}
                to={item.attributes.link.uri.replace('internal:','')}
                selected={location.pathname === item.attributes.link.uri.replace('internal:','')}
              >
                <ListItemText primary={item.attributes.title} sx={{ pl: level * 1.5 }}/>
              </ListItemButton>
            )
          }
        </List>
      ) : ''}
    </>
  )
}

export default NavMenu
