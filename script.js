// api link: https://api.lyrics.ovh/suggest/:searchText

// example: https://api.lyrics.ovh/suggest/hello

// Lyric
// lyric link: https://api.lyrics.ovh/v1/:artist/:title

// example: https://api.lyrics.ovh/v1/Adele/Hello


//using then
const searchButton = () => {
    const searchInput = document.getElementById('search-input').value;
    const url = `https://api.lyrics.ovh/suggest/${searchInput}`
    fetch(url)
        .then(res => res.json())
        .then(data => displaySongs(data.data))
        .catch(error =>displayLyrics('Your search option is unavailable'));
}

//using async await
// const searchButton = async() => {
//     const searchInput = document.getElementById('search-input').value;
//     const url = `https://api.lyrics.ovh/suggest/${searchInput}`
//     const res = await fetch(url);
//     const data = await res.json();
//     displaySongs(data.data);
// }


//using async await with error message
// const searchButton = async() => {
//     const searchInput = document.getElementById('search-input').value;
//     const url = `https://api.lyrics.ovh/suggest/${searchInput}`
//     try{
//         const res = await fetch(url);
//         const data = await res.json();
//         displaySongs(data.data);
//     }
//     catch (error){
//         displayLyrics('Your search option is unavailable')
//     }
// }


// display part
const displaySongs = songs => {
    const songContainer = document.getElementById('song-container');
    songContainer.innerHTML = '';
    document.getElementById('song-lyrics').innerHTML = '';
    songs.forEach(song => {
        console.log(song)
        const songDiv = document.createElement('div');
        songDiv.className = 'single-result row align-items-center my-3 p-3'
        songDiv.innerHTML = `
            <div class="col-md-9">
              <h3 class="lyrics-name">${song.title}</h3>
              <p class="author lead">Album by <span>${song.artist.name}</span></p>
            </div>
            <audio controls>
              <source src="${song.preview}" type="audio/ogg">
            </audio>

            <div>
              <img src="${song.artist.picture}".jpg">
            </div>

            <div class="col-md-3 text-md-right text-center">
              <button onclick ="getLyrics('${song.artist.name}', '${song.title}')" class="btn btn-success">Get Lyrics</button>
           </div>
        `;
        songContainer.appendChild(songDiv);
    });
}
// using then
// const getLyrics = (artist, title) => {
//     const url = `https://api.lyrics.ovh/v1/${artist}/${title}`
//     fetch(url)
//         .then(res => res.json())
//         .then(data => displayLyrics(data.lyrics))
// }

//using async await
// const getLyrics =async (artist, title) => {
//     const url = `https://api.lyrics.ovh/v1/${artist}/${title}`
//     const res = await fetch(url);
//     const data =await res.json();
//     displayLyrics(data.lyrics);
// }


//using async await with error message [some problems here with error message , have to understand and sort out]
const getLyrics =async (artist, title) => {
    const url = `https://api.lyrics.ovh/v1/${artist}/${title}`;
    try{
        const res = await fetch(url);
        const data =await res.json();
        displayLyrics(data.lyrics);
    }
    catch (error) {
        errorMessage('sorry something wrong here.')
    }
}

const displayLyrics = lyrics => {
    const lyricsDiv = document.getElementById('song-lyrics');
    lyricsDiv.innerText = lyrics;
}

//get error
const errorMessage = error => {
    const invalidResult = document.getElementById('error-message');
    invalidResult.innerText = error;
}
