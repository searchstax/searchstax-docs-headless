import React, { useState } from 'react'
import './Curl.css'

import EditText from '../EditText/EditText';

import { config }  from '../../config.ts';

// MUI
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';
import LoadingButton from '@mui/lab/LoadingButton';
import Paper from '@mui/material/Paper';
import Stack from '@mui/material/Stack';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import TextField from '@mui/material/TextField';
import ToggleButton from '@mui/material/ToggleButton';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';
import Typography from '@mui/material/Typography';

// MUI Icons
import AddCircleIcon from '@mui/icons-material/AddCircle';
import DeleteIcon from '@mui/icons-material/Delete';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

const defaultHeaders = [
  {
    'field': 'authorization',
    'value': `Token ${config.searchAuth}`
  }
];

function Curl(props: { url?: string }) {
  const {
    url = `${config.searchURL}?q=*:*`
  } = props;
  const [requestUrl, setRequestUrl] = useState<string>(url);
  const [requestHeaders, setRequestHeaders] = useState(defaultHeaders);
  const [headerField, setHeaderField] = useState<string>('');
  const [headerValue, setHeaderValue] = useState<string>('');
  const [urlLoading, setUrlLoading] = useState<boolean>(false);
  const [urlResponse, setUrlResponse] = useState({});
  const [requestError, setRequestError] = useState<string>('');
  const [requestType, setRequestType] = useState<string>('GET');

  const fetchUrl = async () => {
    if (requestUrl.includes('searchstax.com')) {
      setUrlLoading(true);
      setRequestError('');
      setUrlResponse({});
      const headers: any = {};
      requestHeaders.forEach((item) => {
        headers[item.field] = item.value;
      });
      fetch(requestUrl, {
        method: requestType,
        headers: headers,
      })
      .then(response => {
        setUrlResponse('');
        setUrlLoading(false);
        return response.json();
      })
      .then(data => {
        setRequestError('');
        setUrlResponse(data);
      })
      .catch(error => {
        setRequestError(error.message);
        setUrlLoading(false);
      });
    }
    else {
      setRequestError('URL must include searchstax.com');
    }
  }

  const addHeader = () => {
    if (headerField !== '' && headerValue !== '') {
      setRequestHeaders([
        ...requestHeaders,
        {
          'field': headerField,
          'value': headerValue
        }
      ]);
      setHeaderField('');
      setHeaderValue('');
    }
  }

  const updateHeader = (fieldName: string, fieldValue: string) => {
    setRequestHeaders(
      requestHeaders.map((item) => {
        if (item.field === fieldName) {
          return {
            'field': fieldName,
            'value': fieldValue
          }
        }
        else {
          return item;
        }
      })
    );
  }

  const removeHeader = (fieldName: string) => {
    setRequestHeaders(
      requestHeaders.filter((item) => {
        return item.field !== fieldName;
      })
    );
  }

  return (
    <Box sx={{width: 500}}>
      <Stack spacing={1} sx={{position: 'absolute', top: 130, bottom: 0, overflow: 'hidden'}}>
        <Stack spacing={1} sx={{p: 1}}>
          <Typography variant="h5">SearchStax API Demo</Typography>
          <TextField 
            size="small"
            label="API URL"
            value={requestUrl}
            onChange={(e) => { setRequestUrl(e.target.value); }}
            sx={{ flexGrow: 1 }}
          />
          <Accordion>
            <AccordionSummary
              expandIcon={<ExpandMoreIcon />}
            >
              <Typography>Request Headers</Typography>
            </AccordionSummary>
            <AccordionDetails sx={{p: 0}}>
              <TableContainer component={Paper}>
                <Table sx={{ minWidth: 450 }}>
                  <TableHead>
                    <TableRow>
                      <TableCell sx={{ width: 90 }}>Header Field</TableCell>
                      <TableCell>Value</TableCell>
                      <TableCell sx={{ width: 40 }}>Action</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    <TableRow sx={{backgroundColor: '#FBFBFB', p: 0}}>
                      <TableCell sx={{p: 1}}>
                        <TextField
                          size="small"
                          label="Field"
                          value={headerField}
                          onChange={(e) => { setHeaderField(e.target.value); }}
                          sx={{backgroundColor: '#FFF'}}
                        />
                      </TableCell>
                      <TableCell>
                        <TextField
                          size="small"
                          label="Value"
                          value={headerValue}
                          onChange={(e) => { setHeaderValue(e.target.value); }}
                          sx={{backgroundColor: '#FFF', width: 260}}
                        />
                      </TableCell>
                      <TableCell align="right">
                        <IconButton
                          onClick={() => { addHeader(); }}
                          color="primary"
                          disabled={headerField === '' || headerValue === ''}
                        >
                          <AddCircleIcon />
                        </IconButton>
                      </TableCell>
                    </TableRow>
                    {requestHeaders.map((header, key: number) => (
                      <TableRow key={key}>
                        <TableCell>{header.field}</TableCell>
                        <TableCell>
                          <EditText
                            text={header.value}
                            fieldName={header.field}
                            update={(fieldName, fieldValue) => updateHeader(fieldName, fieldValue)}
                          />
                        </TableCell>
                        <TableCell align="right">
                          <IconButton onClick={() => { removeHeader(header.field); }}>
                            <DeleteIcon />
                          </IconButton>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
              <Stack>
              </Stack>
            </AccordionDetails>
          </Accordion>
          <Stack direction="row" spacing={2}>
            <ToggleButtonGroup
              color="primary"
              value={requestType}
              exclusive
              onChange={(e: React.MouseEvent<HTMLElement, MouseEvent>) => { setRequestType((e.target as HTMLInputElement).value); }}
              size="small"
            >
              <ToggleButton value="GET">GET</ToggleButton>
              <ToggleButton value="POST">POST</ToggleButton>
            </ToggleButtonGroup>
            <LoadingButton
              variant="contained"
              loading={urlLoading}
              onClick={fetchUrl}
            >
              Fetch
            </LoadingButton>
          </Stack>
        </Stack>
        <Stack sx={{overflow: 'auto', p: 0.5, width: 490}}>
          <Typography>Response</Typography>
          <Box sx={{ color: '#F00' }}>{requestError}</Box>
          <Box sx={{
            m: 0,
            p: 0.5,
            fontFamily: 'monospace',
            fontSize: 11,
            whiteSpace: 'pre',
            overflow: 'auto'
          }}>
            {JSON.stringify(urlResponse, null, 2)}
          </Box>
        </Stack>
      </Stack>
    </Box>
  )
}

export default Curl
