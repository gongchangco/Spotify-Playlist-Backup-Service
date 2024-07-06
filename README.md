# Spotify Playlist Backup Service

This project is a web application that allows users to backup their Spotify playlists. The project focuses on using Spotify's API to interact with Spotify service to build a client that can download a user's playlist data into a CSV file.

## Tech Stack
* Next.js
* TypeScript
* Axios
* Papaparse

## Getting Started

### Prerequisites
* Node.js
* A Spotify Developer account

### Installation
1. Clone the repository

```bash
git clone https://github.com/gongchangco/Spotify-Playlist-Backup-Service.git
```

2. Install dependencies

```bash
npm install
```

3. Create a `.env` file in the root of the project and add your Spotify API credentials:

```bash
SPOTIFY_CLIENT_ID=your_spotify_client_id
SPOTIFY_CLIENT_SECRET=your_spotify_client_secret
SPOTIFY_REDIRECT_URI=http://localhost:3000/
```

4. Run the development server:

```bash
npm run dev
```

5. Open your browser and navigate to `http://localhost:3000`.
