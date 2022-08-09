import Home from './components/home/Home';
import Editer from './components/Edit/Editer';
import NotFound from './components/NotFound';
import React from 'react';
import { Routes, Route } from 'react-router-dom';
// 로그인 페이지, 로그인 시 로그인 페이지 마운트

function App() {
  return (
      <div className="App">
        <header className="App-header"></header>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="edit" element={<Editer />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </div>
  );
}

export default App;
