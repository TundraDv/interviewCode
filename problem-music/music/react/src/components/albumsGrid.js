import React, { useState } from 'react';
import SongsModalComponent from '../components/modal';
import { Container, Grid, Typography, Button } from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';

const AlbumGrid = ({ albums }) => {
  const [open, setOpen] = useState(false);
  const [selectedAlbum, setSelectedAlbum] = useState(null);

  const handleOpen = (album) => {
    setSelectedAlbum(album);
    console.log(album)
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setSelectedAlbum(null);
  };

  const columns = [
    {
      field: 'cover_big',
      headerName: 'Cover',
      width: 250,
      sortable: false,
      disableColumnMenu: true,
      renderCell: (params) => (
        <img src={params.value} alt={params.row.title} style={{ width: '100%', height: 'auto' }} />
      ),
    },
    {
      field: 'title',
      headerName: 'Title',
      width: 200,
      renderCell: (params) => (
        <Typography variant="subtitle1">{params.value}</Typography>
      ),
    },
    {
      field: 'actions',
      headerName: '',
      width: 150,
      sortable: false,
      disableColumnMenu: true,
      renderCell: (params) => (
        <div>
          <Button size="small" onClick={() => handleOpen(params.row)}>Show Tracklist</Button>
          {selectedAlbum && selectedAlbum.id === params.row.id && (
            <SongsModalComponent open={open} handleClose={handleClose} data={selectedAlbum} />
          )}
        </div>
      ),
    },
  ];

  const rows = albums.map((album, index) => ({
    id: index,
    title: album.title,
    cover_big: album.cover_big,
    tracklist: album.tracklist
  }));

  return (
    <div style={{ height: '80vh', margin: 'auto' }}>
      <DataGrid
        rows={rows}
        columns={columns}
        pageSize={5}
        rowsPerPageOptions={[5]}
        rowHeight={250}
      />
    </div>
  );
};

export default AlbumGrid;