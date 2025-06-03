import axios from './axios';

// Get all available players for draft
export const getAvailablePlayers = (roomId) =>
  axios.get(`/draft/${roomId}/available-players`);

// Make a draft pick
export const makePick = (roomId, userId, playerId) =>
  axios.post(`/draft/${roomId}/pick`, {
    userId,
    playerId,
  });

// Get draft room status
export const getDraftStatus = (roomId) =>
  axios.get(`/draft/${roomId}/status`);
