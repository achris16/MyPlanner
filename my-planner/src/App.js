import './App.css';
import LogIn from './components/LogIn';
import { BrowserRouter, Route, Routes } from 'react-router-dom';

function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <div className="container">
          <Routes>
            <Route path="/" element={<LogIn/>} />
          </Routes>
        </div> 
      </div>
    </BrowserRouter>
  );
}

export default App;
