import './App.css';
import Login from './pages/Login/Login';
import Overview from './pages/Overview/Overview';
import Register from './pages/Register/Register';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Login />}></Route>
        <Route path='/login' element={<Login />}></Route>
        <Route path='/register' element={<Register />}></Route>
        <Route path='/overview' element={<Overview />}></Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
