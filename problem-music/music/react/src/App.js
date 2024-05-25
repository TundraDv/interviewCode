// App.js
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import AlbumsView from './views/albumsView';

function App() {
  return (
    <div>
      <Router>
        <Routes>
          <Route path="/" element={<AlbumsView/>}/>
        </Routes>
      </Router>
    </div>
  );
}

export default App;
