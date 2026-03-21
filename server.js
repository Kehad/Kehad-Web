import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';

dotenv.config();

const app = express();
app.use(cors());

app.get('/api/spotify/token', async (req, res) => {
  const { code, redirect_uri } = req.query;
  
  if (!code || !redirect_uri) {
    return res.status(400).json({ error: 'No code or redirect_uri provided' });
  }

  const clientId = process.env.VITE_APP_SPOTIFY_CLIENT_ID;
  const clientSecret = process.env.VITE_REACT_APP_SPOTIFY_CLIENT_SECRET;
  
  let redirectUri = redirect_uri;

  try {
    const response = await fetch('https://accounts.spotify.com/api/token', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        'Authorization': 'Basic ' + Buffer.from(clientId + ':' + clientSecret).toString('base64'),
      },
      body: new URLSearchParams({
        grant_type: 'authorization_code',
        code: code,
        redirect_uri: redirectUri,
      }),
    });

    const data = await response.json();

    if (data.error) {
      console.error('Spotify token error:', data);
      return res.status(400).json(data);
    }

    res.json(data);
  } catch (error) {
    console.error('Server error fetching token:', error);
    res.status(500).json({ error: 'Failed to fetch token' });
  }
});

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Backend server successfully running on port ${PORT}`);
});
