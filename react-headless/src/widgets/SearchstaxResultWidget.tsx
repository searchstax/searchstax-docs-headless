import { Link } from "react-router-dom";
import { SearchstaxResultWidget } from "@searchstax-inc/searchstudio-ux-react";

import type { 
    ISearchstaxSearchMetadata,
    ISearchstaxParsedResult
} from "@searchstax-inc/searchstudio-ux-js";

// MUI
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';

function afterLinkClick(result: ISearchstaxParsedResult) {
    const propsCopy = { ...result };
    return propsCopy;
  }

  function noResultTemplate(searchTerm: string, metaData: ISearchstaxSearchMetadata | null): React.ReactElement {
    return (
      <div>
        <div className="searchstax-no-results">
          {" "}
          Showing <strong>no results</strong> for <strong>"{searchTerm}"</strong>
          <br />
          {metaData?.spellingSuggestion && (
            <span>
              &nbsp;Did you mean{" "}
              <a href="#" className="searchstax-suggestion-term">
                {metaData?.spellingSuggestion}
              </a>
              ?
            </span>
          )}
        </div>
        <div>
          <p>
            {" "}
            Try searching for search related terms or topics. We offer a wide variety of content to help you get the
            information you need.{" "}
          </p>
          <p>Lost? Click on the ‘X” in the Search Box to reset your search.</p>
        </div>
      </div>
    );
  }

  function resultsTemplate(
    searchResults: ISearchstaxParsedResult[],
  ): React.ReactElement {
    return (
      <Box 
        className="searchstax-search-results"
      >
        <Stack spacing={2}>
        {searchResults &&
          searchResults.length > 0 &&
          searchResults.map((searchResult, index) => (
            <Paper
              className={`searchstax-search-result ${searchResult.thumbnail ? "has-thumbnail" : ""}`}
              key={index}
              sx={{m: 1, p: 1, textDecoration: 'none'}}
              component={Link}
              to={searchResult.url ? searchResult.url : ''}
              variant="outlined"
            >
              <Stack direction="row" spacing={1}>
                <Box>
                  {searchResult.unmappedFields.map(unmappedField => (
                    <div key={unmappedField.key}>
                      {unmappedField.isImage && typeof unmappedField.value === "string" ? (
                        <Box 
                          className="searchstax-search-result-image-container"
                          sx={{maxHeight: 150, maxWidth: 200, overflow: 'hidden'}}
                        >
                          <Box
                            component="img"
                            src={unmappedField.value}
                            className="searchstax-result-image"
                            sx={{width: '100%', minWidth: 200, maxHeight: '100%', objectFit: 'cover'}}
                          />
                        </Box>
                      ) : (
                        <div>
                          <p className="searchstax-search-result-common">{unmappedField.value}</p>
                        </div>
                      )}
                    </div>
                  ))}
                </Box>
                <Box>
                  <div className="searchstax-search-result-title-wrapper">
                    <div className="searchstax-search-result-title-container">
                      <Typography variant="h5">{searchResult.title}</Typography>
                    </div>
    
                    {searchResult.ribbon && (
                      <div className="searchstax-search-result-ribbon">
                        <span className="pill">{searchResult.ribbon}</span>
                        {searchResult.promoted && <div className="searchstax-search-result-promoted" />}
                      </div>
                    )}
                  </div>
    
                  {searchResult.description && (
                    <p className="searchstax-search-result-description searchstax-search-result-common">
                      {searchResult.description}
                    </p>
                  )}
                </Box>
              </Stack>
            </Paper>
          ))}
        </Stack>
      </Box>
    );
  }

const ResultWidget: React.FC = () => {
  return (
    <SearchstaxResultWidget
      afterLinkClick={afterLinkClick}
      noResultTemplate={noResultTemplate}
      resultsTemplate={resultsTemplate}
    />
  );
};
  
export default ResultWidget;
