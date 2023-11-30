import { useEffect, useState } from 'react';
import Box from '@mui/material/Box';
import { DataGrid } from '@mui/x-data-grid';
import { evalErrorResponse } from '../utils/httpUtils';
import moment from 'moment';


const columns = [
  { 
    field: 'id', 
    headerName: 'ID', 
    width: 20 
  },
  {
    field: 'name',
    headerName: 'Item',
    width: 150,
    editable: true,
  },
  {
    field: 'description',
    headerName: 'Description',
    width: 200,
    editable: true,
  },
  {
    field: 'bought_date',
    headerName: 'Date Purchased',
    type: 'date',
    width: 150,
    valueGetter: (params) => moment(params?.value).toDate(),
    editable: true,
  },
  {
    field: 'open_date',
    headerName: 'Date Opened',
    type: 'date',
    width: 150,
    valueGetter: (params) => moment(params?.value).toDate(),
    editable: true,
  },
  {
    field: 'expiry_date',
    headerName: 'Expiry Date',
    type: 'date',
    width: 150,
    valueGetter: (params) => moment(params?.value).toDate(),
    editable: true,
  }
];

export default function Groceries(props) {
  const [groceries, setGroceries] = useState([]);
  const [params, setParams] = useState({});
  const [errors, setErrors] = useState({});
  
  console.log(groceries);
  useEffect(() => {
    props.makeAxiosRequest('get', 'http://127.0.0.1:5000/api/v1/MyPlanner/data/groceries', {'X-AUTH': props.authToken}, params, null)
      .then(resp => {
        console.log(resp.data);
        setGroceries(resp.data.groceries);
      })
      .catch(err => {
        setErrors(evalErrorResponse(err.response.data));
      });
  }, []);

  return (
    <div>
      <h1>Groceries</h1>
      <Box sx={{ height: 400, width: '100%' }}>
        <DataGrid
          rows={groceries}
          columns={columns}
          initialState={{
            pagination: {
              paginationModel: {
                pageSize: 10,
              },
            },
          }}
          pageSizeOptions={[5, 10, 25]}
          checkboxSelection
          disableRowSelectionOnClick
        />
      </Box>
    </div>
  )
}
