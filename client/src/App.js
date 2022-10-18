import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import Home from './pages/Home';
import About from './pages/About';
import Blog from './pages/Blog';
import Battlefield from './pages/Battlefield';
import Create from './pages/Create';
import Error from './pages/Error';

function App() {
  return (
    <Router>
      <Routes>
        <Route exact path="/" element={<Home />} />
        <Route exact path="/about" element={<About />} />
        <Route exact path="/blog" element={<Blog />} />
        <Route exact path="/category/:category" element={<Home />} />
        <Route exact path="/create" element={<Create />} />
        <Route exact path="/:vote" element={<Battlefield />} />

        <Route exact path="/*" element={<Error />} />
      </Routes>
    </Router>
  )
}

export default App;
