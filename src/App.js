import React from 'react';
import './App.css';
import Popup from './Popup';
import { Route, Routes } from 'react-router-dom';
import CitiesTable from './CitiesTable';

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<CitiesTable />} />
        <Route path="/popup/:dataRelease/:value/:user/:comment" element={<Popup />} />
      </Routes>
    </div>
  );
}

export default App;
