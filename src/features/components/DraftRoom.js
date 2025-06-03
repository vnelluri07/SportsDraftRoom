import React, { useEffect, useState } from 'react';
import { getAvailablePlayers, makePick } from '../../api/draftService';
import {
  Container,
  Typography,
  List,
  ListItem,
  Button,
  ListItemText,
} from '@mui/material';

const DraftRoom = ({ roomId, userId }) => {
  const [players, setPlayers] = useState([]);

  useEffect(() => {
    getAvailablePlayers(roomId)
      .then((res) => setPlayers(res.data))
      .catch((err) => console.error('Error loading players:', err));
  }, [roomId]);

  const handlePick = (playerId) => {
    makePick(roomId, userId, playerId)
      .then(() => alert('Pick successful!'))
      .catch(() => alert('Failed to pick player.'));
  };

  return (
    <Container>
      <Typography variant="h5">Draft Room: {roomId}</Typography>
      <List>
        {players.map((player) => (
          <ListItem key={player.id} divider>
            <ListItemText
              primary={player.name}
              secondary={`Position: ${player.position}`}
            />
            <Button
              variant="contained"
              onClick={() => handlePick(player.id)}
              color="primary"
            >
              Pick
            </Button>
          </ListItem>
        ))}
      </List>
    </Container>
  );
};

export default DraftRoom;
