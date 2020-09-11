import React from 'react';
import { Form }  from './components/form';
import { Title } from './components/title';
import { ToastProvider } from 'react-toast-notifications'
import './App.css';

ToastProvider.defaultProps.placement = 'top-center';

function App() {
  return (
      <ToastProvider>
          <div className="container">
            <Title/>
            <Form/>
          </div>
      </ToastProvider>
  );
}

export default App;
