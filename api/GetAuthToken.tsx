import axios from "axios";

const clientID = process.env.SPOTIFY_CLIENT_ID;
const clientSecret = process.env.SPOTIFY_CLIENT_SECRET;
const redirectUri  = process.env.SPOTIFY_REDIRECT_URI;

const getAuthToken = async (code: string): Promise<string | null> => {
    if (!clientID || !clientSecret || !redirectUri) {
        console.error('Missing environment variables for Spotify API.');
        return null;
    }

    try {
        const response = await axios.post(`https://accounts.spotify.com/api/token`, null, {
            params: {
                grant_type: 'authorization_code',
                code,
                redirect_uri: redirectUri,
            },
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
                'Authorization': 'Basic ' + Buffer.from(clientID + ':' + clientSecret).toString('base64')
            }
        });

        return response.data.access_token;
    } catch (error) {
        console.error('Error getting auth token:', error);
        return null;
    }
};

// Function to redirect to Spotify
export const redirectLogin = () => {
    if (!clientID || !redirectUri) {
        console.error('Missing environment variables for Spotify API.');
        return;
    }

    const scopes = 'user-read-private user-read-email playlist-read-private';

    const spotifyAuthURL = `https://accounts.spotify.com/authorize?client_id=${clientID}&response_type=code&redirect_uri=${encodeURIComponent(redirectUri)}&scope=${encodeURIComponent(scopes)}`;
    window.location.href = spotifyAuthURL;
};


export default getAuthToken;