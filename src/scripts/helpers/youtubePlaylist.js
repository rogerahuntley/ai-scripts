import { google } from 'googleapis';
import { getAccessToken } from './youtubeAuth.js';

// get auth
const auth = await getAccessToken();
if(!auth) process.exit(1)

// connect to youtube
const youtube = google.youtube({version: 'v3', auth: auth});

// Function to search for a video ID based on a song title
async function searchVideoId(title) {
  const response = await youtube.search.list({
    part: 'id',
    q: title,
    type: 'video'
  });
  if (response.data.items.length > 0) {
    return response.data.items[0].id.videoId;
  } else {
    return null;
  }
}

// Function to create a playlist and add videos to it
async function createPlaylist(playlist) {
  console.log(playlist)
  const response = await youtube.playlists.insert({
    part: 'snippet,status',
    requestBody: {
      snippet: {
        title: playlist.name,
        description: playlist.description
      },
      status: {
        // make private until ready
        privacyStatus: 'private'
      }
    }
  });
  const playlistId = response.data.id;

  for (const title of playlist.videoTitles) {
    const videoId = await searchVideoId(title);
    if (videoId) {
      console.log(`inserting ${title} (${videoId}) into playlist ${playlistId}`)
      await youtube.playlistItems.insert({
        part: 'snippet',
        requestBody: {
          snippet: {
            playlistId: playlistId,
            resourceId: {
              kind: 'youtube#video',
              videoId: videoId
            }
          }
        }
      });
    }
  }

  // update playlist to be platlist.privacy
  console.log(`updating playlist to be: ${playlist.privacy}`)
  await youtube.playlists.update({
    part: 'snippet',
    requestBody: {
      snippet: {
        playlistId: playlistId,
        privacyStatus: playlist.privacy
      }
    }
  });

  return `https://www.youtube.com/playlist?list=${playlistId}`;
}

export { createPlaylist }