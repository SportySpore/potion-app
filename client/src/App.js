import React from 'react';
import { Form }  from './components/form';
import { Title } from './components/title';
import { ToastProvider } from 'react-toast-notifications'
import './App.css';
import { Navbar } from './components/navbar';


function App() {
  return (
      <div className='main-wrapper'>
          <Navbar/>
          <ToastProvider>
              <section className='container section1'>
                  <div className='row'>
                    <Title/>
                    <Form/>
                  </div>
              </section>
          </ToastProvider>
      </div>
  );
}

export default App;
