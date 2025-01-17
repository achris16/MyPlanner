import { useState } from 'react';
import { Link as RouterLink } from 'react-router-dom'
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';
import Container from '@mui/material/Container';
import { evalErrorResponse } from '../utils/httpUtils';
import moment from 'moment';

function formatDate(dateStr, formatStr='YYYY-MM-DD HH:mm:ss') {
  const newDate = moment(dateStr).format(formatStr);
  console.log(newDate);
  console.log(newDate.indexOf('Invalid date'));
  return newDate.indexOf('Invalid date') !== -1 ? '' : newDate;
}

export default function GroceriesForm(props) {
  const [errors, setErrors] = useState({});

  const handleSubmit = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const groceryData = {
      name: data.get('name'),
      total_price: data.get('totalPrice'),
      bought_date: formatDate(data.get('boughtDate')),
      description: data.get('description'),
    };

    if (data.get('store') !== '') {
      groceryData['store'] = data.get('store');
    }
    if (formatDate(data.get('expiryDate')) !== '') {
      groceryData['expiry_date'] = formatDate(data.get('expiryDate'));
    }
    if (formatDate(data.get('openDate')) !== '') {
      groceryData['open_date'] = formatDate(data.get('openDate'));
    }
    if (formatDate(data.get('finishDate')) !== '') {
      groceryData['finish_date'] = formatDate(data.get('finishDate'));
    }
    if (data.get('unitPrice') !== '') {
      groceryData['unit_price'] = data.get('unitPrice');
    }
    if (data.get('weight') !== '') {
      groceryData['weight'] = data.get('weight');
    }

    props.makeAxiosRequest('post', 'http://127.0.0.1:5000/api/v1/MyPlanner/data/groceries', {'X-AUTH': props.authToken}, null, { groceries: [ groceryData ] })
    .then(resp => {
        console.log(resp.data);
        props.requestGroceries();
        props.handleClose();
      })
    .catch(err => {
      console.log(err);
      setErrors(evalErrorResponse(err.response.data));
    });
  };

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
      }}
    >
      <Typography variant="h6" component="h2">
        Groceries Form
      </Typography>
      <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
        <Box sx={{ height: '400px', overflow: 'scroll' }}>
          <TextField
            error={errors && errors.name ? true : false}
            helperText={errors && errors.name ? errors.name : ''}
            margin="normal"
            required
            fullWidth
            id="name"
            label="Name"
            type="text"
            name="name"
          />
          <TextField
            error={errors && errors.totalPrice ? true : false}
            helperText={errors && errors.totalPrice ? errors.totalPrice : ''}
            margin="normal"
            required
            fullWidth
            name="totalPrice"
            label="Total Price"
            type="number"
          />
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DemoContainer components={['DateTimePicker']}>
              {/* DatePicker name attribute issue https://github.com/mui/mui-x/issues/8595 */}
              <DateTimePicker 
                slotProps={{ 
                  textField: { 
                    name: 'boughtDate',
                    required: true 
                  }
                }}
                label="Date Bought"
              />
            </DemoContainer>
          </LocalizationProvider>
          <TextField
            margin="normal"
            fullWidth
            id="description"
            label="Description"
            type="text"
            name="description"
          />
          <TextField
            margin="normal"
            fullWidth
            name="store"
            label="Store"
            type="text"
          />
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DemoContainer components={['DateTimePicker']}>
              <DateTimePicker 
                slotProps={{ textField: { name: 'expiryDate' }}}
                label="Expiry Date"
              />
            </DemoContainer>
          </LocalizationProvider>
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DemoContainer components={['DateTimePicker']}>
              <DateTimePicker 
                slotProps={{ textField: { name: 'openDate' }}}
                label="Date Opened"
              />
            </DemoContainer>
          </LocalizationProvider>
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DemoContainer components={['DateTimePicker']}>
              <DateTimePicker 
                slotProps={{ textField: { name: 'finishDate' }}}
                label="Date Finished"
              />
            </DemoContainer>
          </LocalizationProvider>
          <TextField
            margin="normal"
            fullWidth
            name="unitPrice"
            label="Unit Price"
            type="number"
          />
          <TextField
            margin="normal"
            fullWidth
            name="weight"
            label="Weight"
            type="text"
          />
        </Box>
        <Button
          type="submit"
          fullWidth
          variant="contained"
          sx={{ mt: 3, mb: 2 }}
        >
          Submit
        </Button>
      </Box>
    </Box>
  )
}
