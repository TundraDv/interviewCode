// App.js
import React, { useState } from 'react';
import {Modal, Typography, Box, Card, CardActions,CardContent, Button} from '@mui/material';


const SongsModalComponent = ({ open, handleClose, data }) => {
  return (
    <Modal
      open={open}
      onClose={handleClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Card >
        <CardContent>
          <h2>{data.title}</h2>
          <ul>
            {data.tracklist.map(tracklist => (
              <li key={tracklist.id}>{tracklist.title}</li>
            ))}
          </ul>
        </CardContent>
        <CardActions>
          <Button onClick={handleClose}>Close</Button>
        </CardActions>
      </Card>
    </Modal>
  );
}

export default SongsModalComponent;
