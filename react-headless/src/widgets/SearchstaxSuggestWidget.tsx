
import { SearchstaxWrapper } from "@searchstax-inc/searchstudio-ux-react";
import { SearchstaxInputWidget } from "@searchstax-inc/searchstudio-ux-react";
import { config } from '../config.ts';

import type {
    ISearchstaxSuggestResponse,
    ISearchstaxSuggestProps,
    ISearchstaxSuggestion,
    ISearchstaxParsedResult,
    ISearchObject
} from "@searchstax-inc/searchstudio-ux-js";

// MUI
import Autocomplete from '@mui/material/Autocomplete';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';

function afterAutosuggest(result: ISearchstaxSuggestResponse) {
    const copy = { ...result };
    return copy;
  }
function beforeAutosuggest(props: ISearchstaxSuggestProps) {
    const propsCopy = { ...props };
    return propsCopy;
}

function InputTemplate(
    suggestions: ISearchstaxSuggestion[],
    onMouseLeave: () => void,
  ): React.ReactElement {
    return (
      <div className="searchstax-search-input-wrapper">

        <Box sx={{width: 300}}>
          <Autocomplete
            freeSolo
            options={[]}
            renderInput={(params) => <TextField {...params} label="Search For..." />}
            sx={{backgroundColor: '#FFF'}}
          />
        <div
          className={`searchstax-autosuggest-container ${suggestions.length === 0 ? "hidden" : ""}`}
          onMouseLeave={onMouseLeave}
        >
        </div>
        </Box>
      </div>
    );
  }

  function beforeSearch(props: ISearchObject) {
    const propsCopy = { ...props };
    return propsCopy;
  }

  function afterSearch(results: ISearchstaxParsedResult[]) {
    const copy = [...results];
    return copy;
  }

  const SuggestWidget: React.FC = () => {
    return (
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
        <SearchstaxInputWidget
          afterAutosuggest={afterAutosuggest}
          beforeAutosuggest={beforeAutosuggest}
          inputTemplate={InputTemplate}
        ></SearchstaxInputWidget>
      </SearchstaxWrapper>
    );
  };
  
  export default SuggestWidget;

