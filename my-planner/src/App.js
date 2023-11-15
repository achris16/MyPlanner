import './App.css';
import LogIn from './components/LogIn';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Register from './components/Register';

function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <div className="container">
          <Routes>
            <Route path="/" element={<LogIn/>} />
            <Route path="/register" element={<Register/>} />
          </Routes>
        </div> 
      </div>
    </BrowserRouter>
  );
}

export default App;
