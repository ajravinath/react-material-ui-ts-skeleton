import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import './App.css';
import MainPage from './components/MainPage';

const App: React.FC = () => {
  return (
    <BrowserRouter>
      <div className="App">
        <MainPage />
      </div>
    </BrowserRouter>
  );
};

export default App;
