import React from 'react';
import './App.css';
import { Navbar } from './components/Navbar/Navbar';
import { BrowserRouter, Route, Routes } from 'react-router';
import { MainPage } from './pages/MainPage/MainPage';
import { Epicentr } from './pages/Epicentr/Epicentr';
import { Rozetka } from './pages/Rozetka/Rozetka';
import { Hotline } from './pages/Hotline/Hotline';
import { WordParser } from './pages/WordParser/WordParser';

const App = () => {
  return (
     <BrowserRouter>
    <Navbar>
      <Routes>
        <Route path="/settings/epicentr" element={<Epicentr />}></Route>
        <Route path="/settings/hotline" element={<Hotline />}></Route>
        <Route path="/settings/rozetka" element={<Rozetka />}></Route>
        <Route path="/word-parser" element={<WordParser />}></Route>
        <Route path="/" element={<MainPage />}></Route>
      </Routes>
  </Navbar>
    </BrowserRouter>
  )
}

export default App;