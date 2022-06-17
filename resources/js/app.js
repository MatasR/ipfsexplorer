import './bootstrap';
import React from 'react';
import ReactDOM from 'react-dom/client';

import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import Home from './components/Home.js';
import File from './components/File.js';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        // <Route path="/ipfs/:cid" element={<File />} />
      </Routes>
    </Router>
  );
}

export default App;

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
