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
              <Link to="">SearchStax Cloud</Link>
              <Link to="">SearchStax Studio</Link>
            </Stack>
          </Grid>
          <Grid item xs={2}>
            <Stack spacing={1}>
              <Typography variant="h6">Pricing</Typography>
              <Link to="">SearchStax Cloud</Link>
              <Link to="">SearchStax Studio</Link>
            </Stack>
          </Grid>
          <Grid item xs={2}>
            <Stack spacing={1}>
              <Typography variant="h6">Resources</Typography>
              <Link to="">Documentation</Link>
              <Link to="">Case Studies</Link>
              <Link to="">White Papers</Link>
              <Link to="">Blog</Link>
              <Link to="">Support</Link>
            </Stack>
          </Grid>
          <Grid item xs={2}>
            <Stack spacing={1}>
              <Typography variant="h6">Company</Typography>
              <Link to="">About</Link>
              <Link to="">Partners</Link>
              <Link to="">Careers</Link>
              <Link to="">Press</Link>
              <Link to="">Terms of Service</Link>
              <Link to="">Privacy Policy</Link>
            </Stack>
          </Grid>
          <Grid item xs={2}>
            <Stack spacing={1}>
              <Typography variant="h6">Contact Us</Typography>
              <Typography variant="h6">Social Networks</Typography>
              <Typography variant="h6">Security & Compliance</Typography>
              <Link to="">AICPA SOC 2</Link>
              <Link to="">GDPR</Link>
              <Link to="">HIPAA</Link>
              <Link to="">ISO/IEC 27001</Link>
            </Stack>
          </Grid>
        </Grid>
      </Container>
    </Box>
  )
}

export default Footer
