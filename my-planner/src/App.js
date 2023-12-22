import axios from 'axios';
import { useState } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';
import LogIn from './components/LogIn';
import Register from './components/Register';
import Groceries from './components/Groceries';

function App() {
  const [authToken, setAuthToken] = useState(localStorage.getItem('authToken') || '');
  
  function makeAxiosRequest(method, url, headers, params, data) {
    // console.log(method, url, headers, params, data);
    return axios({method, url, headers, params, data})
    .then(resp => {
        console.log(resp);
        if (resp.data && resp.data.token) {
          localStorage.setItem('authToken', resp.data.token);
          setAuthToken(resp.data.token);
        }
        return resp;
      })
      .catch(err => {
        console.log(err);
        if (err.response.status === 401) {
          console.log(err.response.status);
          localStorage.setItem('authToken', '');
          setAuthToken(''); 
        }
        throw err;
      });
  }

  return (
    <BrowserRouter>
      <div className="App">
        <div className="container">
          <Routes>
            <Route 
              path="/" 
              element={
              authToken ?
                <Groceries 
                  authToken={authToken}
                  makeAxiosRequest={makeAxiosRequest}
                /> :
                <LogIn 
                  makeAxiosRequest={makeAxiosRequest}
                />
              }
            />
            <Route 
              path="/register" 
              element={<Register/>}
            />
          </Routes>
        </div> 
      </div>
    </BrowserRouter>
  );
}

export default App;
