import { GridRenderEditCellParams } from '@mui/x-data-grid';
import { Autocomplete, TextField, Box } from '@mui/material';

export const companyList = [
  { code: 'HLC', title: 'Hapag-Lloyd' },
  { code: 'MMA', title: 'Mediterranean Shipping Company' },
  { code: 'CMA', title: 'CMA CGM' },
];

const SelectEditInputCell = (params: GridRenderEditCellParams) => {
  return (
    <Autocomplete
      options={companyList}
      getOptionLabel={(option) => option.code}
      renderOption={(props, option) => {
        const { key, ...optionProps } = props;
        return (
          <Box
            key={key}
            component="li"
            {...optionProps}
          >
            {option.title}
          </Box>
        );
        }}
      renderInput={(params) => <TextField {...params} />}
      value={companyList.find((item) => item.code === params.value) || null}
      onChange={(event, newValue) => {
        params.api.setEditCellValue({ id: params.id, field: params.field, value: newValue ? newValue.code : '' });
        params.api.stopCellEditMode({ id: params.id, field: params.field });
      }}
      fullWidth
    />
  );
};

export default SelectEditInputCell;