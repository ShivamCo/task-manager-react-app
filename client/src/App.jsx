import { useState } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { PopUpProvider, PopContext } from './components/PopUpContext';

//Components
import HeaderBar from './components/HeaderBar';

//Pages
import HomePage from './pages/HomePage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';

function App() {
  const [count, setCount] = useState(0)

  return (
    <PopUpProvider>
      <BrowserRouter>
        <HeaderBar />
        <Routes>
          <Route path='/' element={< HomePage />} />
          <Route path='/login' element={<LoginPage />} />
          <Route path='/register' element={< RegisterPage />} />
        </Routes>
      </BrowserRouter>
    </PopUpProvider>
  )
}

export default App
