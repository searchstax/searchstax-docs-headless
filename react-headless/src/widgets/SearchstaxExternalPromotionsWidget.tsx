import { Link } from "react-router-dom";
import { SearchstaxExternalPromotionsWidget } from "@searchstax-inc/searchstudio-ux-react";

import type {
    ISearchstaxExternalPromotionsData,
} from "@searchstax-inc/searchstudio-ux-js";

// MUI
import Paper from '@mui/material/Paper';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';

// MUI Icons
import StarsIcon from '@mui/icons-material/Stars';

function searchExternalPromotionsTemplate(
    externalPromotionsData: null | ISearchstaxExternalPromotionsData
  ) {
    return (
      <Stack>
        {externalPromotionsData &&
          externalPromotionsData?.searchExecuted &&
          externalPromotionsData?.hasExternalPromotions &&
          externalPromotionsData.externalPromotions.map((externalPromotion, index: number) => (
            <Paper
              key={index}
              sx={{m: 0, mb: 2, p: 1, textDecoration: 'none'}}
              component={Link}
              to={externalPromotion.url}
              elevation={5}
            >
              <Stack spacing={2} sx={{p: 1}}>
                <Stack direction="row">
                  <Typography variant="h5" sx={{flexGrow: 1}}>{externalPromotion.name}</Typography>
                  <StarsIcon />
                </Stack>
                {externalPromotion.description && (
                  <p className="searchstax-search-result-description searchstax-search-result-common">
                    {externalPromotion.description}
                  </p>
                )}
                {externalPromotion.url && (
                  <Typography sx={{fontSize: 14}}>
                    {externalPromotion.url}
                  </Typography>
                )}
              </Stack>
            </Paper>
          ))}
      </Stack>
    );
  }

const ExternalPromotionsWidget: React.FC = () => {
  return (
    <SearchstaxExternalPromotionsWidget
      searchExternalPromotionsTemplate={searchExternalPromotionsTemplate}
    />
  );
};

export default ExternalPromotionsWidget;

