import { useEffect, useState } from 'react'
import './SearchBar.css'
import { useNavigate } from "react-router-dom";

import { suggest } from '../../api/suggest';

import type { suggestion } from '../../interface/suggestResults';
import type { siteSection } from '../../interface/navigation';

// MUI
import Box from '@mui/material/Box';
import Chip from '@mui/material/Chip';
import IconButton from '@mui/material/IconButton';
import InputAdornment from '@mui/material/InputAdornment';
import List from '@mui/material/List';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import OutlinedInput from '@mui/material/OutlinedInput';

// MUI Icons
import HighlightOffIcon from '@mui/icons-material/HighlightOff';
import SearchIcon from '@mui/icons-material/Search';

let debounce = setTimeout(() => {}, 0);

function SearchBar(props: { section?: siteSection}) {
  const {
    section = {menu: '', url: '', sectionURL: ''},
  } = props;
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [facet, setFacet] = useState<string>(section.menu);
  const [suggestedTerms, setSuggestedTerms] = useState<suggestion[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    setFacet(section.menu);
  }, [section]);

  const clearSearch = () => {
    setSearchTerm('');
    setSuggestedTerms([]);
  }

  const clearFacet = () => {
    setFacet('');
  }

  const selectSuggestion = (search: string): void => {
    if (facet !== '') {
      navigate(`search?searchstax[query]=${search}&searchstax[page]=1&searchstax[facets][0]=and:content_type:Documentation`);
      //navigate(`search?searchstax[query]=${search}&searchstax[page]=1&searchstax[facets][0]=and:content_type:${facet}`);
    }
    else {
      navigate(`search?searchstax[query]=${search}&searchstax[page]=1`);
    }
  }

  const handleSearch = (search: string): void => {
    setSearchTerm(search);
    clearTimeout(debounce);
    debounce = setTimeout(() => {
      if (search !== '' && search.length > 2) {
        void suggest(
          search,
          'en'
        ).then(data => {
          if (data.suggest !== undefined) {
            setSuggestedTerms(data.suggest.studio_suggestor_en[search].suggestions);
          } else {
            setSuggestedTerms([]);
          }
        });
      } else {
        setSuggestedTerms([]);
      }
    }, 250);
  };

  const loadSearch = (): void => {
    if (facet !== '') {
      navigate(`search?searchstax[query]=${searchTerm}&searchstax[page]=1&searchstax[facets][0]=and:content_type:Documentation`);
      //navigate(`search?searchstax[query]=${searchTerm}&searchstax[page]=1&searchstax[facets][0]=and:content_type:${facet}`);
    }
    else {
      navigate(`search?searchstax[query]=${searchTerm}&searchstax[page]=1`);
    }
  }

  return (
    <Box sx={{position: 'relative'}}>
      <form onSubmit={loadSearch}>
        <OutlinedInput
          id="outlined-adornment-password"
          type="text"
          size="small"
          autoComplete="off"
          value={searchTerm}
          onChange={(e) => { handleSearch(e.target.value) }}
          startAdornment={
            <InputAdornment position="start">
              {facet !== '' ? (
                <Chip label={facet} onDelete={clearFacet} sx={{textTransform: 'capitalize' }} />
              ) : ('')}
            </InputAdornment>
          }
          endAdornment={
            <InputAdornment position="end">
              <IconButton
                onClick={clearSearch}
                edge="end"
              >
                {searchTerm !== '' ? <HighlightOffIcon /> : ''}
              </IconButton>
              <IconButton size="large" onClick={loadSearch}>
                <SearchIcon />
              </IconButton>
            </InputAdornment>
          }
          sx={{width: 400}}
        />
        {suggestedTerms.length && suggestedTerms.length > 0 ? (
          <Box
            sx={{position: 'absolute', top: 'calc(100% - 2px)', left: 5, right: 5, border: 'solid', borderWidth: '1px', borderColor: '#222', backgroundColor: '#FFF'}}
          >
            <List dense={true} component="nav">
              {suggestedTerms?.map((result, index) => (
                <ListItemButton
                  key={index}
                  onClick={() => { selectSuggestion(result.term.replace(/<[^>]+>/g, '')); }}
                  sx={{color: '#222'}}
                >
                  <ListItemText>
                    {result.term.replace(/<[^>]+>/g, '')}
                  </ListItemText>
                </ListItemButton>
              ))}
            </List>
          </Box>
        ) : ('')}
      </form>
    </Box>
  )
}

export default SearchBar
