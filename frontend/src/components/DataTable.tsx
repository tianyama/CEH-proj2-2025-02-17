import { DataGrid, GridColDef } from '@mui/x-data-grid';
import { useEffect, useState } from 'react';
import { fetchData, addContainer, updateContainer, deleteContainer } from '../services/api';
import { Button, TextField, Stack, Box } from '@mui/material';
import { AddCircleOutline, Delete, Save, FileDownload, UploadFile } from '@mui/icons-material';
import * as XLSX from 'xlsx';
import SelectEditInputCell from './SelectEditInputCell';

const columns: GridColDef[] = [
  { field: 'id', headerName: 'STT', width: 100 },
  {
    field: 'operationCode',
    headerName: 'Hãng khai thác',
    width: 200,
    editable: true,
    renderEditCell: (params) => <SelectEditInputCell {...params} />,
  },
  { field: 'localSizeType', headerName: 'Kích cỡ nội bộ', width: 200, editable: true },
  { field: 'isoSizeType', headerName: 'Kích cỡ ISO', width: 150, editable: true },
  { field: 'cargoTypeCode', headerName: 'Loại hàng', width: 200, editable: true },
  { field: 'emptyCargoTypeCode', headerName: 'Loại hàng rỗng', width: 200, editable: true },
];

interface DataTableProps {
  readonly selectedCompany: string;
}

export default function DataTable ({ selectedCompany }: DataTableProps) {
  interface RowData {
    id: number;
    operationCode: string;
    localSizeType: string;
    isoSizeType: string;
    cargoTypeCode: string;
    emptyCargoTypeCode: string;
  }

  const [rows, setRows] = useState<RowData[]>([]);
  const [selectionModel, setSelectionModel] = useState<number[]>([]);

  useEffect(() => {
    fetchData().then(data => {
      const getIndex = data.map((index: number) => ({
        id: index + 1,
        operationCode: data[index].operationCode,
        localSizeType: data[index].localSizeType,
        isoSizeType: data[index].isoSizeType,
        cargoTypeCode: data[index].cargoTypeCode,
        emptyCargoTypeCode: data[index].emptyCargoTypeCode,
      }));
      setRows(getIndex);
    });
  }, []);

  useEffect(() => {
    if (selectedCompany) {
      const filteredRows = rows.filter(row => row.operationCode === selectedCompany);
      setRows(filteredRows);
    }
  }, [selectedCompany]);

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

  const processRowUpdate = (newRow: RowData) => {
    const updatedRows = rows.map(row => (row.id === newRow.id ? newRow : row));
    setRows(updatedRows);
    return newRow;
  };

  const exportToExcel = () => {
    const worksheetData = rows.map(row => {
      const newRow = {};
      columns.forEach(col => {
        newRow[col.headerName] = row[col.field];
      });
      return newRow;
    });

    const worksheet = XLSX.utils.json_to_sheet(worksheetData);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, 'Data');
    XLSX.writeFile(workbook, 'Danh sách container rỗng.xlsx');
  };

  const importFromExcel = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (e) => {
      const data = new Uint8Array(e.target?.result as ArrayBuffer);
      const workbook = XLSX.read(data, { type: 'array' });
      const sheetName = workbook.SheetNames[0];
      const worksheet = workbook.Sheets[sheetName];
      const jsonData = XLSX.utils.sheet_to_json(worksheet, { header: 1 });
      const headers = jsonData[0] as string[];
      const rowsData = jsonData.slice(1);
      const newRows = rowsData.map((row, index) => {
        const rowData: any = { id: rows.length + index + 1 };
        headers.forEach((header, i) => {
          const column = columns.find(col => col.headerName === header);
          if (column) {
            rowData[column.field] = row[i];
          }
        });
        return rowData;
      });

      setRows([...rows, ...newRows]);
    };
    reader.readAsArrayBuffer(file);
  };

  return (
    <Box flex={1} p={4} display="flex" flexDirection="column" bgcolor="white">
      <Stack direction="row" spacing={2} sx={{ mb: 2 }}>
        <TextField label="Tìm kiếm" variant="outlined" size="small" />
        <Button variant="outlined" color="primary" startIcon={<AddCircleOutline />} onClick={addRow}>Thêm dòng</Button>
        <Button variant="outlined" color="error" startIcon={<Delete />} onClick={deleteRow}>Xóa</Button>
        <Button variant="outlined" color="success" startIcon={<Save />} onClick={updateData}>Lưu</Button>
        <Button variant="outlined" startIcon={<FileDownload />} onClick={exportToExcel}>Xuất Excel</Button>
        <Button variant="outlined" startIcon={<UploadFile />} component="label">
          Nhập Excel <input type="file" hidden onChange={importFromExcel} />
        </Button>
      </Stack>
      <div style={{ height: 500, width: '95%' }}>
        <DataGrid
          rows={rows}
          columns={columns}
          editMode="row"
          rowSelectionModel={selectionModel}
          checkboxSelection
          disableColumnResize
          disableRowSelectionOnClick
          hideFooter
          processRowUpdate={processRowUpdate}
          onRowSelectionModelChange={(newSelection) => {
            setSelectionModel(newSelection as number[]);
          }}
        />
      </div>
    </Box>
  );
};
