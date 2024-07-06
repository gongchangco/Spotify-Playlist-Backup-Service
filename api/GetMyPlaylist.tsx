import axios from "axios";

const getMyPlaylist = async (token: string) => {
    const playlistURL = `https://api.spotify.com/v1/me/playlists`;
    const playlistOptions = {
        method: 'GET',
        url: playlistURL,
        headers: {
            Authorization: `Bearer ${token}`
        }
    };

    try {
        const response = await axios(playlistOptions);
        return response.data;
    } catch (error) {
        console.error('Error getting Spotify playlist:', error);
    }
}

export default getMyPlaylist;