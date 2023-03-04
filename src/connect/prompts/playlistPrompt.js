import { defaultOptions, basePrompt } from "../connect.js"

const myPlaylist = {
  videoTitles: [
    'F-Zero GX Mute City OST',
    'Super Smash Bros. Ultimate Lifelight OST',
    'F-Zero GX Big Blue OST',
    'Super Smash Bros. Ultimate Gang-Plank Galleon OST',
    'F-Zero GX Green Plant OST',
    'Super Smash Bros. Ultimate Brinstar Depths OST',
    'F-Zero GX Fire Field OST',
    'Super Smash Bros. Ultimate sMain Theme (Brawl) OST'
  ],
  name: 'My Video Game Tracks Playlist',
  description: 'Smash Ultimate / Golden Captain Falcon',
  privacy: 'public'
}

const playlistPrompt = async (prompt, options) => {
  options = {...defaultOptions, ...options, max_tokens: 500}

  const messages = [
    { role: "system", name: "user", content: "You are a content organizer designed to create playlists under a given theme. A user will describe the kind of playlist they want, and you will return playlist data in a JSON object with the following fields: videoTitles (array of video titles), name (name of playlist), and description (short summary). You must add 'OST', artist name or album name to any song titles." },
    { role: "user", name: "me", content: `Smash Ultimate Captain Falcon Playlist` },
    { role: "system", name: "user", content: JSON.stringify({videoTitles: myPlaylist.videoTitles, name: myPlaylist.name, description: myPlaylist.description}) },
    { role: "user", name: "me", content: `${prompt}` },
  ]

  return await basePrompt({
    ...options,
    messages: [
      ...messages,
      { role: "user", name: "me", content: `Me: ${prompt}` },
    ],
  })

}

export { playlistPrompt };