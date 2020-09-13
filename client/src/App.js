import React from 'react';
import { ToastProvider } from 'react-toast-notifications'
import './App.css';
import { Navbar } from './components/navbar/navbar';
import { MainSection } from './components/main/mainSection';


function App() {
  return (
      <div className='main-wrapper'>
          <Navbar/>
          <ToastProvider>
              <MainSection/>
          </ToastProvider>
      </div>
  );
}

export default App;
