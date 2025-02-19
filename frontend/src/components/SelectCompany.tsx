import { Autocomplete, TextField, FormControl, Button, Box } from '@mui/material';
import { useState } from 'react';
import { companyList } from './SelectEditInputCell';

interface SelectCompanyProps {
  onCompanyChange: (company: string) => void;
}

const SelectCompany = ({ onCompanyChange }: SelectCompanyProps) => {
  const [company, setCompany] = useState('');

  const handleLoadData = () => {
    // Gọi hàm onCompanyChange để truyền giá trị hãng khai thác được chọn
    onCompanyChange(company);
    console.log(`Nạp dữ liệu cho công ty: ${company}`);
  };

  return (
    <Box width="20%" bgcolor="white" p={2} boxShadow={1}>
      <p>Chọn hãng khai thác:</p>
      <Box display="flex" flexDirection="column" alignItems="center">
        <FormControl sx={{ width: 300 }}>
          <Autocomplete
            options={companyList}
            getOptionLabel={(option) => option.title}
            renderInput={(params) => <TextField {...params} label="Hãng khai thác" />}
            onChange={(event, newValue) => {
              setCompany(newValue ? newValue.code : '');
            }}
          />
        </FormControl>
        <Button variant="contained" color="primary" onClick={handleLoadData} sx={{ mt: 2 }}>
          Nạp dữ liệu
        </Button>
      </Box>
    </Box>
  );
};

export default SelectCompany;
