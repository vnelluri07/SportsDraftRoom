import React from 'react';
import { Route, Routes } from 'react-router-dom';
import DraftRoom from './features/components/DraftRoom';
import Home from './features/components/Home';
import ChatComponent from './ChatComponent';

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/chat" element={<ChatComponent />} /> 
      <Route path="/draft/:roomId" element={<DraftRoomWrapper />} />
    </Routes>
  );
};

// Optional wrapper to pass dummy userId to DraftRoom
const DraftRoomWrapper = () => {
  const roomId = window.location.pathname.split('/').pop(); // or use useParams
  const userId = 'user123'; // replace with real user ID later
  return <DraftRoom roomId={roomId} userId={userId} />;
};

export default AppRoutes;