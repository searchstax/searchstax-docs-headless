import './Search.css'

import { SearchstaxWrapper } from "@searchstax-inc/searchstudio-ux-react";
import InputWidget from '../../widgets/SearchstaxInputWidget.tsx';
import ResultWidget from "../../widgets/SearchstaxResultWidget.tsx";

import type {
  ISearchObject,
  ISearchstaxParsedResult,

} from "@searchstax-inc/searchstudio-ux-js";
import { config }  from '../../config.js';
import PaginationWidget from "../../widgets/SearchstaxPaginationWidget.tsx";
import OverviewWidget from "../../widgets/SearchstaxOverviewWidget.tsx";
import SortingWidget from "../../widgets/SearchstaxSortingWidget.tsx";
import RelatedSearchesWidget from "../../widgets/SearchstaxRelatedSearchesWidget.tsx";
import ExternalPromotionsWidget from "../../widgets/SearchstaxExternalPromotionsWidget.tsx";
import FacetsWidget from "../../widgets/SearchstaxFacetsWidget.tsx";

// MUI
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Stack from '@mui/material/Stack';

function Search() {
  function beforeSearch(props: ISearchObject) {
    const propsCopy = { ...props };
    return propsCopy;
  }

  function afterSearch(results: ISearchstaxParsedResult[]) {
    const copy = [...results];
    return copy;
  }

  return (
    <Container maxWidth="xl" sx={{p: 1, pt: 2}}>
      <SearchstaxWrapper
        searchURL={config.searchURL}
        suggesterURL={config.suggesterURL}
        trackApiKey={config.trackApiKey}
        searchAuth={config.searchAuth}
        initialized={() => {}}
        beforeSearch={beforeSearch}
        afterSearch={afterSearch}
        authType={config.authType}
        router={{ enabled: true }}
        language={config.language}
      >
        <Stack spacing={1}>
          <Box>
            <InputWidget />
          </Box>
          <RelatedSearchesWidget />
          <Stack direction="row" spacing={2} sx={{justifyContent: 'space-between', alignContent: 'center'}}>
            <OverviewWidget />
            <SortingWidget />
          </Stack>
          <Stack direction="row" spacing={2}>
            <Box>
              <FacetsWidget />
            </Box>
            <Stack>
              <ExternalPromotionsWidget />
              <ResultWidget />
            </Stack>
          </Stack>
          <Box sx={{width: '100%'}}>
            <PaginationWidget />
          </Box>
        </Stack>
      </SearchstaxWrapper>
    </Container>
  )
}

export default Search
