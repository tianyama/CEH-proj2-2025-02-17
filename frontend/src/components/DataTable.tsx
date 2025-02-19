import { DataGrid, GridColDef } from '@mui/x-data-grid';
import { useEffect, useState } from 'react';
import { fetchData, addContainer, updateContainer, deleteContainer } from '../services/api';
import { Button, TextField, Stack, Box } from '@mui/material';
import { AddCircleOutline, Delete, Save, FileDownload, UploadFile } from '@mui/icons-material';
import * as XLSX from 'xlsx';
import SelectEditInputCell from './SelectEditInputCell';

const columns: GridColDef[] = [
  { field: '_id', headerName: 'ID', width: 150 },
  {
    field: 'operationCode',
    headerName: 'Hãng khai thác',
    width: 100,
    editable: true,
    renderEditCell: (params) => <SelectEditInputCell {...params} />,
  },
  { field: 'localSizetype', headerName: 'Kích cỡ nội bộ', width: 200, editable: true },
  { field: 'isoSizetype', headerName: 'Kích cỡ ISO', width: 150, editable: true },
  { field: 'cargoTypeCode', headerName: 'Loại hàng', width: 200, editable: true },
  { field: 'emptyCargoTypeCode', headerName: 'Loại hàng rỗng', width: 200, editable: true },
];

interface DataTableProps {
  selectedCompany: string;
}

export default function DataTable ({ selectedCompany }: DataTableProps) {
  interface RowData {
    _id: string;
    operationCode: string;
    localSizeType: string;
    isoSizeType: string;
    cargoTypeCode: string;
    emptyCargoTypeCode: string;
  }

  const [rows, setRows] = useState<RowData[]>([]);
  const [selectionModel, setSelectionModel] = useState<number[]>([]);
  const [rowsOLD, setRowsOLD] = useState<RowData[]>([]);

  useEffect(() => {
    fetchData().then(data => {
      setRowsOLD(data);
      if (selectedCompany) {
        const filteredRows = data.filter(data => data.operationCode === selectedCompany);
        setRows(filteredRows);}
      else {
        setRows(data);
      }
    });
  }, [selectedCompany]);

  const addRow = () => {
    const newRow = { _id: rows.length + 1, operationCode: '', localSizeType: '', isoSizeType: '', cargoTypeCode: '', emptyCargoTypeCode: '' };
    setRows([...rows, newRow]);
  };

  const deleteRow = async () => {
    const newRows = rows.filter(row => !selectionModel.includes(row._id));
    setRows(newRows);
    try {
      for (let delrow of selectionModel) {
        await deleteContainer(delrow.toString());
      }
      alert('Dữ liệu đã được cập nhật thành công!');
    } catch (error) {
      console.error('Lỗi cập nhật dữ liệu:', error);
      alert('Có lỗi xảy ra khi cập nhật dữ liệu.');
    }
  };

  const updateData = async () => {
    try {
      for (let row of rows) {
        let flag = 0;
        for (let rowOLD of rowsOLD) {
          if (row._id == rowOLD._id) { 
            const { _id, ...rowData } = row;
            await updateContainer(row._id, rowData);
            flag = 1;
            break;
          } 
        }
        if (flag == 0) {
          const { _id, ...rowData } = row;
          await addContainer(rowData);
        }
      }
      alert('Dữ liệu đã được cập nhật thành công!');
    } catch (error) {
      console.error('Lỗi cập nhật dữ liệu:', error);
      alert('Có lỗi xảy ra khi cập nhật dữ liệu.');
    }
  };

  const processRowUpdate = (newRow: RowData) => {
    const updatedRows = rows.map(row => (row._id === newRow._id ? newRow : row));
    setRows(updatedRows);
    return newRow;
  };

  const exportRawExcel = () => {
    const headers = columns.map(col => col.headerName);
    const worksheet = XLSX.utils.aoa_to_sheet([headers]);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, 'Data');
    XLSX.writeFile(workbook, 'Mẫu danh sách container rỗng.xlsx');
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
        const rowData: any = {};
        headers.forEach((header, i) => {
          const column = columns.find(col => col.headerName === header);
          if (column) {
            rowData[column.field] = row[i];
          }
        });
        return rowData;
      });

      const updatedRows = [...rows];
      newRows.forEach((newRow) => {
        const existingRowIndex = updatedRows.findIndex(row => row._id === newRow._id);
        if (existingRowIndex !== -1) {
          // Ghi đè dữ liệu trong Excel lên bảng
          updatedRows[existingRowIndex] = { ...updatedRows[existingRowIndex], ...newRow };
        } else {
          // Thêm vào các hàng cuối
          updatedRows.push({ ...newRow, _id: (updatedRows.length + 1).toString() });
        }
      });

      setRows(updatedRows);
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
        <Button variant="outlined" startIcon={<FileDownload />} onClick={exportRawExcel}>Excel mẫu</Button>
        <Button variant="outlined" startIcon={<UploadFile />} component="label">
          Nhập Excel <input type="file" hidden onChange={importFromExcel} />
        </Button>
      </Stack>
      <div style={{ height: 500, width: '95%' }}>
        <DataGrid
          rows={rows}
          columns={columns}
          getRowId={(row) => row._id}
          editMode="row"
          rowSelectionModel={selectionModel}
          checkboxSelection
          disableColumnResize
          disableRowSelectionOnClick
          hideFooter
          processRowUpdate={processRowUpdate}
          onRowSelectionModelChange={(newSelection) => {
            console.log(newSelection);
            setSelectionModel(newSelection);
          }}
        />
      </div>
    </Box>
  );
};
