import axios from 'axios';
import { useState } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';
import LogIn from './components/LogIn';
import Register from './components/Register';
import Groceries from './components/Groceries';

// @TODO: Save AuthToken in local storage.
function App() {
  const [authToken, setAuthToken] = useState('');

  function makeAxiosRequest(method, url, headers, params, data) {
    // console.log(method, url, headers, params, data);
    return axios({method, url, headers, params, data})
      .then(resp => {
        if (resp.data && resp.data.token) {
          setAuthToken(resp.data.token);
        }
        console.log(resp);
        return resp;
      })
      .catch(err => {
        console.log(err);
        // @TODO: Handle 401 response token expiration
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
