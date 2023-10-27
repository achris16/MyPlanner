import './App.css';
import Register from './components/Register';
import { BrowserRouter, Route, Routes } from 'react-router-dom';

function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <div className="container">
          <Routes>
            <Route path="/" element={<Register/>} />
          </Routes>
        </div> 
      </div>
    </BrowserRouter>
  );
}

export default App;
