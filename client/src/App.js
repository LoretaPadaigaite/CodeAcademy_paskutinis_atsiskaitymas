import logo from './logo.svg';
import './App.css';
import { Route, Routes } from 'react-router';

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path='/' element={<div>Home route</div>}/>
        <Route path='/participants' element={<div>Participants route</div>}/>
      </Routes>

    </div>
  );
}

export default App;
