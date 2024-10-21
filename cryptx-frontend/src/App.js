import './App.css';
import { UserProvider } from './context/UserContext';
import Login from './pages/Login/Login';
import Overview from './pages/Overview/Overview';
import Register from './pages/Register/Register';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
function App() {
  return (
    <BrowserRouter>
      <UserProvider>
        <Routes>
          <Route path='/' element={<Login />}></Route>
          <Route path='/login' element={<Login />}></Route>
          <Route path='/register' element={<Register />}></Route>
          <Route path='/overview' element={<Overview />}></Route>
        </Routes>
      </UserProvider>
    </BrowserRouter>
  );
}

export default App;
