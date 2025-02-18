import { Container, Paper, Typography, Stack, Box } from '@mui/material';
import DataTable from '../components/DataTable';
import SelectCompany from '../components/SelectCompany';

const Home = () => {
  return (
    <Box height="100vh" sx={{ p: 2, mb: 2 }} bgcolor="#f4f4f4">
      <Typography variant="h5" sx={{ my: 2 }}>CẢNG CONTAINER QUỐC TẾ HATECO HẢI PHÒNG</Typography>
      <Box display="flex" height="100vh">
        <Box width="20%" bgcolor="white" p={2} boxShadow={1}>
          <SelectCompany />
        </Box>
        <DataTable />
      </Box>
    </Box>
  );
};

export default Home;
