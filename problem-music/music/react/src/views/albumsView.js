
// views/Albums.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';

const AlbumsView = () => {
  const apiUrl = process.env.REACT_APP_API_URL_IVE;
  const [albums, setAlbums] = useState([]);

  useEffect(() => {
    const fetchAlbums = async () => {
      try {
        const response = await axios.get(apiUrl);
        console.log(apiUrl)
        console.log(response)
        setAlbums(response.data.data);
      } catch (error) {
        console.error('Error fetching albums:', error);
      }
    };

    fetchAlbums();
  }, []);
  // console.log(apiUrl)
  // console.log(albums)
  return (
    <div>
      <h2>Music Albums</h2>
      {/* <ul>
        {albums.map(album => (
          <li key={album.id}>{album.title}</li>
        ))}
      </ul> */}
    </div>
  );
};

export default AlbumsView;