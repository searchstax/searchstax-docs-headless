import { SearchstaxInputWidget } from "@searchstax-inc/searchstudio-ux-react";

import type {
    ISearchstaxSuggestResponse,
    ISearchstaxSuggestProps,
    ISearchstaxSuggestion
} from "@searchstax-inc/searchstudio-ux-js";

// MUI
import Autocomplete from '@mui/material/Autocomplete';
import Button from '@mui/material/Button';
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
    onMouseOver: (suggestion: ISearchstaxSuggestion) => void,
    onMouseClick: () => void
  ): React.ReactElement {
    
    return (
      <div className="searchstax-search-input-wrapper">
        <Autocomplete
          id="searchstax-search-input"
          freeSolo
          options={suggestions.map((suggestion) => suggestion.term)}
          renderInput={(params) => 
            <TextField
              id="searchstax-search-input"
              label="Search For..."
              onClick={() => {
                onMouseClick();
              }}
              sx={{backgroundColor: '#FFF', borderRadius: 1}}
              {...params}
            />}
        />
        <Button className="searchstax-spinner-icon" id="searchstax-search-input-action-button"></Button>
      </div>
    );
  }

  const InputWidget: React.FC = () => {
    return (
      <SearchstaxInputWidget
        afterAutosuggest={afterAutosuggest}
        beforeAutosuggest={beforeAutosuggest}
        inputTemplate={InputTemplate}
      ></SearchstaxInputWidget>
    );
  };
  
  export default InputWidget;

