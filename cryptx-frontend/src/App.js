import './App.css';
import ProtectedRoutes from './components/ProtectedRoute/ProtectedRoutes';
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
          <Route element={<ProtectedRoutes />}>
            <Route path='/overview' element={<Overview />}></Route>
          </Route>
        </Routes>
      </UserProvider>
    </BrowserRouter>
  );
}

export default App;
