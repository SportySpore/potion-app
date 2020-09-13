import React from 'react';
import { ToastProvider } from 'react-toast-notifications'
import './App.css';
import { Navbar } from './components/navbar/navbar';
import { MainSection } from './components/main/mainSection';

ToastProvider.defaultProps.placement = 'top-right';


function App() {
  return (
      <ToastProvider>
          <div className='main-wrapper'>
              <Navbar/>
              <MainSection/>
          </div>
      </ToastProvider>
  );
}

export default App;
