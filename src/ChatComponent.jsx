import React, { useEffect, useState } from "react";
import * as signalR from "@microsoft/signalr";
import {
  Box,
  Button,
  Container,
  Paper,
  TextField,
  Typography,
  List,
  ListItem,
  ListItemText,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
} from "@mui/material";

const ChatComponent = () => {
  const [connection, setConnection] = useState(null);
  const [messages, setMessages] = useState([]);
  const [user, setUser] = useState(() => sessionStorage.getItem("username") || "");
  const [message, setMessage] = useState("");
  const [showUsernameDialog, setShowUsernameDialog] = useState(!user);
  const [tempUsername, setTempUsername] = useState("");

  // Setup SignalR connection
  useEffect(() => {
    const newConnection = new signalR.HubConnectionBuilder()
      .withUrl("https://localhost:7156/chathub")
      .withAutomaticReconnect()
      .build();

    setConnection(newConnection);
  }, []);

  // Start connection and subscribe to messages
  useEffect(() => {
    if (connection) {
      connection
        .start()
        .then(() => {
          console.log("Connected to SignalR");

          connection.on("ReceiveMessage", (user, message) => {
            setMessages((prev) => [...prev, { user, message }]);
          });
        })
        .catch((err) => console.error("Connection error: ", err));
    }
  }, [connection]);

  const sendMessage = async () => {
    if (connection && message) {
      try {
        await connection.invoke("SendMessage", user, message);
        setMessage("");
      } catch (err) {
        console.error("Send failed: ", err);
      }
    }
  };

  const handleUsernameSubmit = () => {
    if (tempUsername.trim()) {
      sessionStorage.setItem("username", tempUsername);
      setUser(tempUsername);
      setShowUsernameDialog(false);
    }
  };

  return (
    <Container maxWidth="sm" sx={{ mt: 4 }}>
      <Paper elevation={4} sx={{ p: 3, borderRadius: 3 }}>
        <Typography variant="h5" gutterBottom>
          🗨️ SignalR Chat
        </Typography>

        <Typography variant="subtitle1" gutterBottom>
          Logged in as: <strong>{user}</strong>
        </Typography>

        <Box sx={{ maxHeight: 300, overflowY: "auto", mb: 2 }}>
          <List>
            {messages.map((msg, index) => (
              <ListItem key={index} alignItems="flex-start">
                <ListItemText
                  primary={<strong>{msg.user}</strong>}
                  secondary={msg.message}
                />
              </ListItem>
            ))}
          </List>
        </Box>

        <Box
          component="form"
          onSubmit={(e) => {
            e.preventDefault();
            sendMessage();
          }}
        >
          <TextField
            fullWidth
            label="Your Message"
            variant="outlined"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            sx={{ mb: 2 }}
          />

          <Button
            fullWidth
            variant="contained"
            color="primary"
            type="submit"
            disabled={!message}
          >
            Send
          </Button>
        </Box>
      </Paper>

      {/* Username Dialog */}
      <Dialog open={showUsernameDialog} disableEscapeKeyDown>
        <DialogTitle>Enter Your Name</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            label="Username"
            fullWidth
            value={tempUsername}
            onChange={(e) => setTempUsername(e.target.value)}
          />
        </DialogContent>
        <DialogActions>
          <Button
            onClick={handleUsernameSubmit}
            disabled={!tempUsername.trim()}
            variant="contained"
          >
            Continue
          </Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
};

export default ChatComponent;