import React, { createRef } from "react";
import { SearchstaxFacetsWidget } from "@searchstax-inc/searchstudio-ux-react";

import type {
    IFacetsTemplateData,
    IFacetValueData,
    IFacetData,
} from "@searchstax-inc/searchstudio-ux-js";

// MUI
import Checkbox from '@mui/material/Checkbox';
import FormControlLabel from '@mui/material/FormControlLabel';
import Paper from '@mui/material/Paper';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';

function facetsTemplateDesktop(
    facetsTemplateDataDesktop: IFacetsTemplateData | null,
    facetContainers: {
      [key: string]: React.LegacyRef<HTMLDivElement> | undefined;
    },
    isNotDeactivated: (name: string) => boolean,
    toggleFacetGroup: (name: string) => void,
    selectFacet: (
      index: string,
      event: React.MouseEvent<HTMLDivElement, MouseEvent>,
      data: IFacetValueData,
      isInput: boolean
    ) => void,
    isChecked: (facetValue: IFacetValueData) => boolean | undefined,
    showMoreLessDesktop: (e: React.MouseEvent<HTMLDivElement, MouseEvent>, data: IFacetData) => void
  ) {
    return (
      <Stack
        spacing={2}
        className="searchstax-facets-container-desktop"
      >
        {facetsTemplateDataDesktop?.facets.map((facet) => {
          return (
            <Paper
              className={`searchstax-facet-container ${isNotDeactivated(facet.name) ? "active" : ""}`}
              key={facet.name + "desktop"}
              sx={{p: 2, minWidth: 200}}
              variant="outlined"
            >
              <div>
                <div
                  className="searchstax-facet-title-container"
                  onClick={() => {
                    toggleFacetGroup(facet.name);
                  }}
                >
                  <Typography variant="h6"> {facet.label}</Typography>
                  <div className="searchstax-facet-title-arrow active"></div>
                </div>
                <div className="searchstax-facet-values-container">
                  {facet.values.map(
                    //@ts-ignore
                    (facetValue: IFacetValueData, key: string) => {
                      facetContainers[key + facet.name] = createRef();
                      return (
                        <div
                          key={facetValue.value + facetValue.parentName}
                          className={`searchstax-facet-value-container ${
                            facetValue.disabled ? "searchstax-facet-value-disabled" : ""
                          }`}
                        >
                          <FormControlLabel
                            className="searchstax-facet-input"
                            control={
                              <Checkbox
                                className="searchstax-facet-input-checkbox"
                                checked={isChecked(facetValue)}
                                disabled={facetValue.disabled}
                                onChange={(e: any) => {
                                  selectFacet(key + facet.name, e, facetValue, false);
                                }}
                              />
                            }
                            label={`${facetValue.value} (${facetValue.count})`}
                            onChange={(e: React.SyntheticEvent<Element, Event>) => {
                              selectFacet(key + facet.name, e as React.MouseEvent<HTMLDivElement, MouseEvent>, facetValue, true);
                            }}
                          />
                        </div>
                      );
                    }
                  )}
                  {facet.hasMoreFacets && (
                    <div className="searchstax-facet-show-more-container">
                      <div
                        className="searchstax-facet-show-more-container"
                        onClick={(e) => {
                          showMoreLessDesktop(e, facet);
                        }}
                      >
                        {facet.showingAllFacets && (
                          <div className="searchstax-facet-show-less-button searchstax-facet-show-button">less</div>
                        )}
                        {!facet.showingAllFacets && (
                          <div className="searchstax-facet-show-more-button  searchstax-facet-show-button">more</div>
                        )}
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </Paper>
          );
        })}
      </Stack>
    );
  }

  const FacetsWidget: React.FC = () => {
    return (
      <SearchstaxFacetsWidget
        facetingType="and"
        itemsPerPageDesktop={9999999}
        itemsPerPageMobile={9999999}
        specificFacets={undefined}
        facetsTemplateDesktop={facetsTemplateDesktop}
      ></SearchstaxFacetsWidget>
    );
  };
  
  export default FacetsWidget;

