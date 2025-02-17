import { MenuItem, Select, FormControl, InputLabel } from '@mui/material';
import { useState } from 'react';

const SelectCompany = () => {
  const [company, setCompany] = useState('');

  return (
    <>
    <p>Chọn hãng khai thác:</p>
    <FormControl sx={{ minWidth: 200 }}>
      <InputLabel></InputLabel>
      <Select value={company} onChange={e => setCompany(e.target.value)}>
        <MenuItem value="HLC">HLC: HAPAG-LLOYD AG</MenuItem>
        <MenuItem value="MSC">MSC: MEDITERRANEAN SHIPPING CO</MenuItem>
      </Select>
    </FormControl>
    </>
  );
};

export default SelectCompany;
