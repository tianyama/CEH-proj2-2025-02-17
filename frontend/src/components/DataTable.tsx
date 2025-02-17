import { DataGrid, GridColDef } from '@mui/x-data-grid';
import { useEffect, useState } from 'react';
import { fetchData } from '../services/api';

const columns: GridColDef[] = [
  { field: 'id', headerName: 'STT', width: 100 },
  { field: 'company', headerName: 'Hãng khai thác', width: 200 },
  { field: 'internalSize', headerName: 'Kích cỡ nội bộ', width: 200 },
  { field: 'isoSize', headerName: 'Kích cỡ ISO', width: 150 },
  { field: 'cargoType', headerName: 'Loại hàng', width: 200 },
  { field: 'emptyCargoType', headerName: 'Loại hàng rỗng', width: 200 },
];

const DataTable = () => {
  const [rows, setRows] = useState([]);

  useEffect(() => {
    fetchData().then(data => setRows(data));
  }, []);

  return (
    <div style={{ height: 500, width: '95%' }}>
      <DataGrid rows={rows} columns={columns} checkboxSelection />
    </div>
  );
};

export default DataTable;
