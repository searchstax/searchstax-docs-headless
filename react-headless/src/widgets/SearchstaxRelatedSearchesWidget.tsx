import { SearchstaxRelatedSearchesWidget } from "@searchstax-inc/searchstudio-ux-react";

import { config } from '../config.ts';

import type {
    ISearchstaxRelatedSearchesData,
    ISearchstaxRelatedSearchResult
} from "@searchstax-inc/searchstudio-ux-js";

// MUI
import Chip from '@mui/material/Chip';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';

function searchRelatedSearchesTemplate(
    relatedData: null | ISearchstaxRelatedSearchesData,
    executeSearch: (result: ISearchstaxRelatedSearchResult) => void
  ) {
    return (
      <>
        {relatedData && relatedData?.searchExecuted && relatedData?.hasRelatedSearches && (
          <Stack
            direction="row"
            className="searchstax-related-searches-container"
            id="searchstax-related-searches-container"
            sx={{alignItems: 'center'}}
            spacing={1}
          >
            <Typography sx={{fontWeight: 800}}>Related searches</Typography>
            {relatedData.relatedSearches && (
              <Stack direction="row" spacing={1}>
                {relatedData.relatedSearches.map((related) => (
                  <Chip
                    key={related.related_search}
                    onClick={() => {
                      executeSearch(related);
                    }}
                    className="searchstax-related-search searchstax-related-search-item"
                    label={related.related_search}
                  />
                ))}
              </Stack>
            )}
          </Stack>
        )}
      </>
    );
  }


  const RelatedSearchesWidget: React.FC = () => {
    return (
      <SearchstaxRelatedSearchesWidget
        relatedSearchesURL={config.relatedSearchesURL}
        relatedSearchesAPIKey={config.relatedSearchesAPIKey}
        searchRelatedSearchesTemplate={searchRelatedSearchesTemplate}
      />
    );
  };
  
  export default RelatedSearchesWidget;

