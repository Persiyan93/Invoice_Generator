import * as React from 'react';
import { DataGrid } from '@material-ui/data-grid';

const columns = [
  { field: 'id', headerName: 'Номер на Фактура', width: 230 },
  { field: 'ClientName', headerName: 'Клиент', width: 400 },
  { field: 'ClientVatNumber', headerName: 'ДДС Номер на клиента', width: 300 },
  {
    field: 'PriceWithoutVat',
    headerName: 'Цена без ДДС',
    type: 'number',
    width: 200,
  },

  // {
  //   field: 'fullName',
  //   headerName: 'Full name',
  //   description: 'This column has a value getter and is not sortable.',
  //   sortable: false,
  //   width: 160,
  //   valueGetter: (params) =>
  //     `${params.getValue('firstName') || ''} ${params.getValue('lastName') || ''}`,
  // },
];

const rows = [
  { id: 1, ClientName: 'Snow', firstName: 'Jon', age: 35 },
  { id: 2, ClientName: 'Lannister', firstName: 'Cersei', age: 42 },
  { id: 3, ClientName: 'Lannister', firstName: 'Jaime', age: 45 },
  { id: 4, ClientName: 'Stark', firstName: 'Arya', age: 16 },
  { id: 5, ClientName: 'Targaryen', firstName: 'Daenerys', age: null },
  { id: 6, ClientName: 'Melisandre', firstName: 'Gosj', age: 150 },
  { id: 7, ClientName: 'Clifford', firstName: 'Ferrara', age: 44 },
  { id: 8, ClientName: 'Frances', firstName: 'Rossini', age: 36 },
  { id: 9, ClientName: 'Roxie', firstName: 'Harvey', age: 65 },
];

export default function DataTable() {
  return (
    <div style={{ height: 400, width: '100%' }}>
      <DataGrid rows={rows} columns={columns} pageSize={5} checkboxSelection />
    </div>
  );
}