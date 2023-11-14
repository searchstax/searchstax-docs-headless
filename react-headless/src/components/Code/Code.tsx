import React, { useState } from 'react'
import './Code.css'

// MUI
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Fade from '@mui/material/Fade';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';

// MUI Icons
import ContentPasteIcon from '@mui/icons-material/ContentPaste';
import TerminalIcon from '@mui/icons-material/Terminal';

function Code(props: { text?: string, openConsole?: void }) {
  const {
    text = '',
    openConsole
  } = props;
  const [flash, setFlash] = useState<boolean>(true);

  const copyToClipboard = () => {
    navigator.clipboard.writeText(text);
    setFlash(false);
    setTimeout(() => { setFlash(true); }, 200);
  }

  return (
    <Box sx={{
      border: 'solid',
      borderWidth: '1px',
      borderColor: '#222',
    }}>
      <Stack>
        <Stack direction="row">
          <Button
            startIcon={<TerminalIcon />}
            onClick={() => { openConsole(); }}
            variant="contained"
            disableElevation
            sx={{ borderRadius: 0 }}
          >
            Open Console
          </Button>
          <Button
            startIcon={<ContentPasteIcon />}
            onClick={copyToClipboard}
            variant="outlined"
            disableElevation
            sx={{ borderRadius: 0 }}
          >
            Copy
          </Button>
          <Typography sx={{p: 1, flexGrow: 1, backgroundColor: '#EEE'}}>
          </Typography>
        </Stack>
        <Box sx={{
          p: 1,
          fontFamily: 'monospace',
          backgroundColor: '#222',
          color: '#0F0',
          whiteSpace: 'pre',
          overflow: 'auto',
          fontSize: 14,
        }}>
          <Fade in={flash} timeout={100}><Box>{text}</Box></Fade></Box>
      </Stack>
    </Box>
  )
}

export default Code
