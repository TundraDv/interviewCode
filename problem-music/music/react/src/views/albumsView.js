import React, { useState, useEffect } from 'react';
import SongsModalComponent from '../components/modal';
import { Container, Grid, Typography, Button } from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';
import AlbumGrid from '../components/albumsGrid';
import SongsGrid from '../components/songsGrid';
import axios from 'axios';

const AlbumsView = () => {
  const apiUrl = "https://my-json-server.typicode.com/tundraElie/fakeDB/data";
  const [albums, setAlbums] = useState([]);

  useEffect(() => {
    const fetchAlbums = async () => {
      try {
        const response = await axios.get(apiUrl);
        console.log(response.data)
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
      <Grid container spacing={10}>
        {/* AlbumGrid component */}
        <Grid item xs={12} md={8}>
          <AlbumGrid albums={albums} />
        </Grid>
        {/* SongsGrid component */}
        <Grid item xs={12} md={4}>
          <Container>
            <SongsGrid />
          </Container>
        </Grid>
      </Grid>
    </Container>
  );
};

export default AlbumsView;
