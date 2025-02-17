import { Button, TextField, Stack } from '@mui/material';
import { Add, Delete, Save, FileDownload } from '@mui/icons-material';



const Toolbar = () => {
  return (
    <Stack direction="row" spacing={2} sx={{ mb: 2 }}>
      <TextField label="Tìm kiếm" variant="outlined" size="small" />
      <Button variant="contained" startIcon={<Add />}  onClick={() => {
        alert('clicked');
      }}>Thêm dòng</Button>
      <Button variant="outlined" color="error" startIcon={<Delete />}>Xóa</Button>
      <Button variant="contained" color="success" startIcon={<Save />}>Lưu</Button>
      <Button variant="outlined" startIcon={<FileDownload />}>Xuất Excel</Button>
    </Stack>
  );
};

export default Toolbar;
