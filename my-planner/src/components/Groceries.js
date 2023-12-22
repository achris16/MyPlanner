import { useEffect, useState } from 'react';
import Box from '@mui/material/Box';
import { DataGrid } from '@mui/x-data-grid';
import { evalErrorResponse } from '../utils/httpUtils';
import moment from 'moment';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import GroceriesForm from './GroceriesForm';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: '80vw',
  maxHeight: '80vh',
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};

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
  
  const requestGroceries = () => {
    props.makeAxiosRequest('get', 'http://127.0.0.1:5000/api/v1/MyPlanner/data/groceries', {'X-AUTH': props.authToken}, params, null)
    .then(resp => {
      console.log(resp.data);
      setGroceries(resp.data.groceries);
    })
    .catch(err => {
      setErrors(evalErrorResponse(err.response.data));
    });
  }

  useEffect(() => {requestGroceries()}, []);

  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

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
      <Button onClick={handleOpen}>Create Groceries</Button>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}> 
          <GroceriesForm 
            authToken={props.authToken}
            makeAxiosRequest={props.makeAxiosRequest}
            handleClose={handleClose}
            requestGroceries={requestGroceries}
          />
        </Box>
      </Modal>
    </div>
  )
}
