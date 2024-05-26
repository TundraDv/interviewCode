// App.js
import React, { useState, useEffect } from 'react';
import { Modal, Typography, Grid, IconButton, Card, CardActions, CardContent, Button } from '@mui/material';
import { mdiHeartOutline, mdiHeart } from '@mdi/js';
import Icon from '@mdi/react';

const SongsModalComponent = ({ open, handleClose, data }) => {
  const [elementsFromLocal, setElementsFromLocal] = useState([]);

  // Effect to retrieve liked elements from local storage on component mount and update when changes occur
  useEffect(() => {
    const storedElements = JSON.parse(localStorage.getItem('myLikedSongs')) || [];
    setElementsFromLocal(storedElements);
    
    // Function to update elements when changes occur in local storage
    const handleStorageChange = () => {
      const updatedElements = JSON.parse(localStorage.getItem('myLikedSongs')) || [];
      setElementsFromLocal(updatedElements);
    };

    // Add event listener for storage change
    window.addEventListener('storage', handleStorageChange);

    // Clean up function to remove event listener
    return () => {
      window.removeEventListener('storage', handleStorageChange);
    };
  }, []);

  // Function to handle liking and unliking
  const handleLike = (tracklist) => {
    const updatedElements = [...elementsFromLocal, tracklist];
    setElementsFromLocal(updatedElements);
    localStorage.setItem('myLikedSongs', JSON.stringify(updatedElements));
  };

  const handleUnlike = (tracklist) => {
    const updatedElements = elementsFromLocal.filter(item => item.id !== tracklist.id);
    setElementsFromLocal(updatedElements);
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
                  {elementsFromLocal.some(item => item.id === tracklist.id) ? 
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
