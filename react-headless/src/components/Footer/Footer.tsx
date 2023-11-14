import React from 'react'
import './Footer.css'
import { Link } from "react-router-dom";

// MUI
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';

function Footer() {
  return (
    <Box sx={{m: 0, mt: 2, p: 1, height: 300, backgroundColor: '#EEE'}}>
      <Container
        maxWidth="xl"
      >
        <Grid container spacing={2} justifyContent="center" alignItems="top">
          <Grid item xs={2}>
            <Stack spacing={1}>
              <Typography variant="h6">Products</Typography>
              <Link>SearchStax Cloud</Link>
              <Link>SearchStax Studio</Link>
            </Stack>
          </Grid>
          <Grid item xs={2}>
            <Stack spacing={1}>
              <Typography variant="h6">Pricing</Typography>
              <Link>SearchStax Cloud</Link>
              <Link>SearchStax Studio</Link>
            </Stack>
          </Grid>
          <Grid item xs={2}>
            <Stack spacing={1}>
              <Typography variant="h6">Resources</Typography>
              <Link>Documentation</Link>
              <Link>Case Studies</Link>
              <Link>White Papers</Link>
              <Link>Blog</Link>
              <Link>Support</Link>
            </Stack>
          </Grid>
          <Grid item xs={2}>
            <Stack spacing={1}>
              <Typography variant="h6">Company</Typography>
              <Link>About</Link>
              <Link>Partners</Link>
              <Link>Careers</Link>
              <Link>Press</Link>
              <Link>Terms of Service</Link>
              <Link>Privacy Policy</Link>
            </Stack>
          </Grid>
          <Grid item xs={2}>
            <Stack spacing={1}>
              <Typography variant="h6">Contact Us</Typography>
              <Typography variant="h6">Social Networks</Typography>
              <Typography variant="h6">Security & Compliance</Typography>
              <Link>AICPA SOC 2</Link>
              <Link>GDPR</Link>
              <Link>HIPAA</Link>
              <Link>ISO/IEC 27001</Link>
            </Stack>
          </Grid>
        </Grid>
      </Container>
    </Box>
  )
}

export default Footer
