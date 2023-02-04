import logo from './logo.svg';
import './App.css';
import { Route, Routes, useNavigate } from 'react-router';
import { useContext, useEffect } from 'react';
import { PageLayout } from './components/PageLayout/PageLayout';
import { LOCAL_STORAGE_JWT_TOKEN_KEY } from './constants/constants';
import { UserContext } from './contexts/UserContextWrapper';
import { Participants } from './pages/Participants/Participants';
import { Login } from './pages/Login/Login';
import { NotFound } from './pages/NotFound/NotFound';
import { Register } from './pages/Register/Register';


function App() {
  const { setUser } = useContext(UserContext);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem(LOCAL_STORAGE_JWT_TOKEN_KEY);
    if (token) {
      fetch(`${process.env.REACT_APP_API_URL}/token/verify`, {
        headers: {
          authorization: 'Bearer ' + token
        }
      })
      .then(res => res.json())
      .then(data => {
        if (!data.error) {
          const { id, name } = data;
          setUser({ id, name });
          navigate('/');
        }
      });
    }
  }, []);

  return (
    <div className="App">
      <Routes>
      <Route path="/" element={<PageLayout />}>
          <Route index element={<Participants />} />
        </Route>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="*" element={<NotFound />} />
      </Routes>

    </div>
  );
}

export default App;
