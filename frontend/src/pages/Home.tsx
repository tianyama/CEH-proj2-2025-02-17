import { Container, Paper, Typography, Stack, Box } from '@mui/material';
import DataTable from '../components/DataTable';
import SelectCompany from '../components/SelectCompany';
import { useState } from 'react';
import Header from './Header';

const Home = () => {
  const [selectedCompany, setSelectedCompany] = useState('');
  return (
    <Box height="100vh" sx={{ p: 2, mb: 2 }} bgcolor="#f4f4f4">
      <Header />
      <Box display="flex" height="100vh">
        <SelectCompany onCompanyChange={setSelectedCompany} />
        <DataTable selectedCompany={selectedCompany} />
      </Box>
    </Box>
  );
};

export default Home;
