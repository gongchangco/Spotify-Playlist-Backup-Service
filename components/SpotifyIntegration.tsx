"use client"
import React, { useState, useEffect, useRef } from "react";
import { LoginButton } from "./LoginButton";
import { LogoutButton } from "./LogoutButton";
import getAuthToken from "@/api/GetAuthToken";
import getMyPlaylist from "@/api/GetMyPlaylist";
import getPlaylist from "@/api/GetPlaylist";
import { exportToCSV } from "@/utils/export";

interface Playlist {
    name: string;
    tracks: {
        items: {
            track: {
                name: string;
                artists: { name: string }[];
                album: { name: string };
            }
        }[];
    };
}

interface UserPlaylist {
    id: string;
    name: string;
}

const SpotifyIntegration = () => {
    const [playlistID, setPlaylistID] = useState<string>("");
    const [playlist, setPlaylist] = useState<Playlist | null>(null);
    const [userPlaylists, setUserPlaylists] = useState<UserPlaylist[]>([]);
    const [token, setToken] = useState<string | null>(null);
    const [downloadLink, setDownloadLink] = useState<HTMLAnchorElement | null>(null);
    const downloadLinkRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const urlParams = new URLSearchParams(window.location.search);
        const code = urlParams.get('code');

        if (code) {
            getAuthToken(code).then((token) => {
                if (token) {
                    localStorage.setItem("spotify_access_token", token);
                    setToken(token);
                    fetchUserPlaylists(token);
                }
            })
            .catch((error) => {
                console.error("Error fetching access token: ", error);
            });
        } else {
            const storedToken = localStorage.getItem('spotify_access_token');

            if (storedToken) {
                setToken(storedToken);
                fetchUserPlaylists(storedToken)
            }
        }
    }, []);

    const fetchUserPlaylists = async (token: string) => {
        try {
            const data = await getMyPlaylist(token);
            setUserPlaylists(data.items.map((playlist: any) => ({
                id: playlist.id,
                name: playlist.name
            })));
        } catch (error) {
            console.error("Error fetching user playlists:", error);
            handleLogout();
        }
    }

    const fetchPlaylist = async (id: string) => {
        if (!id) {
            console.error("Playlist ID is required");
            return;
        }

        const token = localStorage.getItem("spotify_access_token");

        if (token) {
            try {
                const data = await getPlaylist(id, token);
                setPlaylist(data);
            } catch (error) {
                console.error("Error fetching playlist:", error);
                handleLogout();
            }
        } else {
            console.error("No access token found");
            handleLogout();
        } 
    }

    const handleExportCSV = () => {
        if (playlist) {
            const link = exportToCSV(playlist);
            setDownloadLink(link);

            // Clear any existing content and append the new link
            if (downloadLinkRef.current) {
                downloadLinkRef.current.innerHTML = '';
                downloadLinkRef.current.appendChild(link);
            }
        }
    }

    const handleLogout = () => {
        localStorage.removeItem("spotify_access_token");
        setToken(null);
        setPlaylist(null);
        setUserPlaylists([]);
        setPlaylistID("");
    }

    return (
        <div className="">
            {!token ? (
                <LoginButton />
            ) : (
                <div className="relative pt-10">
                    <div className="flex flex-row gap-2">
                        <select
                            value={playlistID}
                            onChange={(e) => setPlaylistID(e.target.value)}
                            className="border border-gray-300 text-white h-12 rounded-sm hover:border-gray-400 focus:outline-none p-2 mr-2"
                        >
                            <option value="">Select Your Playlist</option>
                            {userPlaylists.map((playlist) => (
                                <option key={playlist.id} value={playlist.id}>
                                    {playlist.name}
                                </option>
                            ))}
                        </select>

                        <input
                            type="text"
                            placeholder="Enter Playlist ID"
                            value={playlistID}
                            onChange={(e) => setPlaylistID(e.target.value)}
                            className="border border-gray-300 text-white h-12 rounded-sm hover:border-gray-400 focus:outline-none p-2 mr-2"
                        />

                        <button
                            onClick={() => fetchPlaylist(playlistID)}
                            className="h-12 bg-green-500 rounded-sm text-white px-4 py-3 outline-none shadow-lg transform active:scale-x-75 hover:bg-green-600 transition-transform mx-2 flex"
                        >
                            Fetch Playlist by ID
                        </button>

                        {playlist && (
                            <button
                                onClick={handleExportCSV}
                                className="h-12 bg-green-500 rounded-sm text-white px-4 py-3 outline-none shadow-lg transform active:scale-x-75 hover:bg-green-600 transition-transform mx-2 flex"
                            >
                                Generate CSV Download Link
                            </button>
                        )}

                        <div ref={downloadLinkRef} className="h-12 bg-green-500 rounded-sm text-white px-4 py-3 outline-none shadow-lg transform active:scale-x-75 hover:bg-green-600 transition-transform mx-2 flex"></div>

                        <LogoutButton onLogout={handleLogout} />
                    </div>
                    {playlist && (
                        <div className="p-3">
                            <div className="overflow-x-auto">
                                <table className="table-auto w-full">
                                    <thead className="text-xs font-semibold uppercase text-gray-400 bg-gray-50">
                                        <tr>
                                            <th className="p-2 whitespace-nowrap">Track Name</th>
                                            <th className="p-2 whitespace-nowrap">Artist</th>
                                            <th className="p-2 whitespace-nowrap">Album</th>
                                        </tr>
                                    </thead>
                                    <tbody className="text-sm divide-y divide-gray-100">
                                        {playlist.tracks.items.map((item, index) => (
                                            <tr key={index} className="">
                                                <td className="p-2 whitespace-nowrap">{item.track.name}</td>
                                                <td className="p-2 whitespace-nowrap">{item.track.artists.map((artist) => artist.name).join(", ")}</td>
                                                <td className="p-2 whitespace-nowrap">{item.track.album.name}</td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    )}
                </div>
            )}
        </div>
    )
}

export default SpotifyIntegration;
