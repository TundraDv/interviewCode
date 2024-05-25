
// views/Albums.js
import React, { useState, useEffect } from 'react';
import SongsModalComponent from '../components/modal'
import {Container, Card, CardActions, CardHeader, Typography, CardMedia, CardContent, Button, Box, Grid} from '@mui/material';
import axios from 'axios';

const AlbumsView = () => {
  const apiUrl = "https://my-json-server.typicode.com/tundraElie/fakeDB/data";
  const [albums, setAlbums] = useState([]);
  const [open, setOpen] = useState(false);
  const [selectedAlbum, setSelectedAlbum] = useState(null); 

  const handleOpen = (album) => {
    setSelectedAlbum(album);
    setOpen(true);
  };
  const handleClose = () => setOpen(false);

  useEffect(() => {
    const fetchAlbums = async () => {
      try {
        const response = await axios.get(apiUrl);
        // console.log(response);
        setAlbums(response.data);
      } catch (error) {
        console.error('Error fetching albums:', error);
      }
    };

    fetchAlbums();
  }, []);

  return (
    <Container m={5} p={2}>
      <Typography align="center" variant="h4" component="div" m={5}>
        Music Albums from IVE
      </Typography>
      <Grid container spacing={3}>
        {albums.map((album, index) => (
          <Grid item xs={12} sm={6} md={4} key={index}>
            <Card>
              <CardHeader title={album.title}/>
              <CardContent>
              <CardMedia
                component="img"
                image={album.cover_big} // URL of the image
                alt={album.title} // Alt text for accessibility
              />
              </CardContent>
              <CardActions>
                <Button size="small"  onClick={() => handleOpen(album)}>Show Tracklist</Button>
              </CardActions>
            </Card>
          </Grid>
        ))}
      </Grid>
      {/* Conditionally render the ModalComponent */}
      {selectedAlbum && (
        <SongsModalComponent open={open} handleClose={handleClose} data={selectedAlbum} />
      )}
    </Container>
  );
};

export default AlbumsView;