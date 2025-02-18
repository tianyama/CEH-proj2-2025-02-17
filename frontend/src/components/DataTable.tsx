import { DataGrid, GridColDef } from '@mui/x-data-grid';
import { useEffect, useState } from 'react';
import { fetchData, addContainer, updateContainer, deleteContainer } from '../services/api';
import { Button, TextField, Stack, Box } from '@mui/material';
import { Add, Delete, Save, FileDownload } from '@mui/icons-material';

const columns: GridColDef[] = [
  { field: 'id', headerName: 'STT', width: 100 },
  { field: 'operationCode', headerName: 'Hãng khai thác', width: 200, editable: true },
  { field: 'localSizeType', headerName: 'Kích cỡ nội bộ', width: 200, editable: true },
  { field: 'isoSizeType', headerName: 'Kích cỡ ISO', width: 150, editable: true },
  { field: 'cargoTypeCode', headerName: 'Loại hàng', width: 200, editable: true },
  { field: 'emptyCargoTypeCode', headerName: 'Loại hàng rỗng', width: 200, editable: true },
];

const DataTable = () => {
  const [rows, setRows] = useState([]);
  const [selectionModel, setSelectionModel] = useState([]);

  useEffect(() => {
    fetchData().then(data => setRows(data));
  }, []);

  const addRow = () => {
    const newRow = { id: rows.length + 1, operationCode: '', localSizeType: '', isoSizeType: '', cargoTypeCode: '', emptyCargoTypeCode: '' };
    setRows([...rows, newRow]);
  };

  const deleteRow = () => {
    const newRows = rows.filter(row => !selectionModel.includes(row.id));
    setRows(newRows);
  };

  const updateData = async () => {
    try {
      // Update existing rows
      for (const row of rows) {
        if (row.id <= rows.length) {
          await updateContainer(row.id.toString(), row);
        } else {
          await addContainer(row);
        }
      }
      // Delete removed rows
      for (const id of selectionModel) {
        await deleteContainer(id.toString());
      }
      alert('Dữ liệu đã được cập nhật thành công!');
    } catch (error) {
      console.error('Lỗi cập nhật dữ liệu:', error);
      alert('Có lỗi xảy ra khi cập nhật dữ liệu.');
    }
  };

  return (
    <Box flex={1} p={4} display="flex" flexDirection="column" bgcolor="white">
      <Stack direction="row" spacing={2} sx={{ mb: 2 }}>
        <TextField label="Tìm kiếm" variant="outlined" size="small" />
        <Button variant="contained" startIcon={<Add />} onClick={addRow}>Thêm dòng</Button>
        <Button variant="outlined" color="error" startIcon={<Delete />} onClick={deleteRow}>Xóa</Button>
        <Button variant="contained" color="success" startIcon={<Save />} onClick={updateData}>Lưu</Button>
        <Button variant="outlined" startIcon={<FileDownload />}>Xuất Excel</Button>
      </Stack>
      <div style={{ height: 500, width: '95%' }}>
        <DataGrid
          rows={rows}
          columns={columns}
          checkboxSelection
          editMode="row"
          onSelectionModelChange={(newSelection) => {
            setSelectionModel(newSelection);
          }}
        />
      </div>
    </Box>
  );
};

export default DataTable;
