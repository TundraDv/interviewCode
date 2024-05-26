//songsGrid.js
import React, { useState, useEffect} from 'react';
import { Typography } from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';
import { useLikedSongs } from './likedSongsContext'; // Import useLikedSongs hook


const SongsGrid = () => {
  const { likedSongs } = useLikedSongs(); // Access likedSongs from context

  const [tracklist, setTracklist] = useState(likedSongs);

  useEffect(() => {
    const storedElements = JSON.parse(localStorage.getItem('myLikedSongs')) || [];
    setTracklist(storedElements);
    
    // Function to update tracklist when changes occur in local storage
    const handleStorageChange = () => {
      const updatedElements = JSON.parse(localStorage.getItem('myLikedSongs')) || [];
      setTracklist(updatedElements);
    };

    // Add event listener for storage change
    window.addEventListener('storage', handleStorageChange);

    // Clean up function to remove event listener
    return () => {
      window.removeEventListener('storage', handleStorageChange);
    };
  }, []);

  const columns = [
    {
      field: 'title',
      headerName: 'Title',
      width: 200,
      renderCell: (params) => (
        <Typography variant="subtitle1">{params.value}</Typography>
      ),
    },
  ];

  const rows = tracklist.map((track, index) => ({
    id: index,
    title: track.title,
  }));

  return (
    <div style={{ height: '80vh', margin: 'auto' }}>
      <DataGrid
        rows={rows}
        columns={columns}
        pageSize={5}
        rowsPerPageOptions={[5]}
      />
    </div>
  );
};

export default SongsGrid;
