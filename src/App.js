import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import AppRoutes from './routes';
import ChatComponent from "./ChatComponent";

function App() {
  return (
    <Router>
      <AppRoutes />
      {/* <ChatComponent/> */}
    </Router>
  );
}

export default App;
