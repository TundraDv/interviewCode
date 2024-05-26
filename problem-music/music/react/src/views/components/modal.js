// SongsModalComponent.js
import React from 'react';
import { Modal, Typography, Grid, IconButton, Card, CardActions, CardContent, Button } from '@mui/material';
import { mdiHeartOutline, mdiHeart } from '@mdi/js';
import Icon from '@mdi/react';
import { useLikedSongs } from './likedSongsContext'; // Make sure this path is correct

const SongsModalComponent = ({ open, handleClose, data }) => {
  const { likedSongs, setLikedSongs } = useLikedSongs();

  // Function to handle liking and unliking
  const handleLike = (tracklist) => {
    const updatedElements = [...likedSongs, tracklist];
    setLikedSongs(updatedElements);
    localStorage.setItem('myLikedSongs', JSON.stringify(updatedElements));
  };

  const handleUnlike = (tracklist) => {
    const updatedElements = likedSongs.filter(item => item.id !== tracklist.id);
    setLikedSongs(updatedElements);
    localStorage.setItem('myLikedSongs', JSON.stringify(updatedElements));
  };

  return (
    <Modal
      open={open}
      onClose={handleClose}
      style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center'
      }}
    >
      <Card style={{ width: '80vw', maxWidth: 500 }}>
        <CardContent>
          <h2 style={{ marginBottom: '30px' }}>{data.title}</h2>
          {data.tracklist.map(tracklist => (
            <div key={tracklist.id} style={{ display: 'flex', alignItems: 'center' }}>
              <Grid container spacing={2} style={{ width: '100%' }}>
                <Grid item xs={8} style={{ display: 'flex', alignItems: 'center' }}>
                  <Typography noWrap>{tracklist.title}</Typography>
                </Grid>
                <Grid item xs={4} style={{ display: 'flex', justifyContent: 'flex-end' }}>
                  {likedSongs.some(item => item.id === tracklist.id) ?
                  (
                    <div>
                      <IconButton color="error" onClick={() => handleUnlike(tracklist)}>
                        <Icon path={mdiHeart} size={1} />
                      </IconButton>
                      </div>
                  ) : (
                    <div>
                    <IconButton color="error" onClick={() => handleLike(tracklist)}>
                      <Icon path={mdiHeartOutline} size={1} />
                    </IconButton>
                    </div>
                  )}
                </Grid>
              </Grid>
            </div>
          ))}
        </CardContent>
        <CardActions style={{ justifyContent: 'flex-end' }}>
          <Button onClick={handleClose}>Close</Button>
        </CardActions>
      </Card>
    </Modal>
  );
}

export default SongsModalComponent;
