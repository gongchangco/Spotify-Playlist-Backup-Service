import Papa from 'papaparse';

interface Track {
    name: string;
    artists: { name: string }[];
    album: { name: string };
}

interface Playlist {
    name: string;
    tracks: {
      items: {
        track: Track;
      }[];
    };
}

export const exportToCSV = (playlist: Playlist) => {
  const csvData = playlist.tracks.items.map(item => ({
    'Track Name': item.track.name,
    'Artist': item.track.artists.map(artist => artist.name).join(', '),
    'Album': item.track.album.name
  }));

  const csv = Papa.unparse(csvData);

  // Create a Blob with the CSV data
  const blob = new Blob(['\uFEFF' + csv], { type: 'text/csv;charset=utf-8;' });

  // Create a URL for the Blob
  const url = URL.createObjectURL(blob);

  // Create a link element
  const link = document.createElement('a');
  link.href = url;
  link.setAttribute('download', `${playlist.name}.csv`);
  link.textContent = 'Download CSV';

  return link;
}