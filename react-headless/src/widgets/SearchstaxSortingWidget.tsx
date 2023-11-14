import { SearchstaxSortingWidget } from "@searchstax-inc/searchstudio-ux-react";

import type {
    ISearchstaxSearchSortingData
} from "@searchstax-inc/searchstudio-ux-js";

// MUI
import ToggleButton from '@mui/material/ToggleButton';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';

function searchSortingTemplate(
    sortingData: null | ISearchstaxSearchSortingData,
    orderChange: (value: string) => void,
    selectedSorting: string
  ) {
    return (
      <>
        {sortingData && sortingData?.searchExecuted && sortingData?.hasResultsOrExternalPromotions && (
          <div className="searchstax-sorting-container">
            <ToggleButtonGroup
              id="searchstax-search-order-select"
              color="primary"
              value={selectedSorting}
              exclusive
              onChange={(e) => {
                orderChange(e.target.value);
              }}
              size="small"
            >
              <ToggleButton value="">Relevance</ToggleButton>
              <ToggleButton value="date desc">Newest</ToggleButton>
              <ToggleButton value="date asc">Oldest</ToggleButton>
            </ToggleButtonGroup>
          </div>
        )}
      </>
    );
  }


  const SortingWidget: React.FC = () => {
    return (
        <SearchstaxSortingWidget searchSortingTemplate={searchSortingTemplate}></SearchstaxSortingWidget>
    );
  };
  
  export default SortingWidget;

