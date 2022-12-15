//DOM references
var searchButton = document.getElementById('submit');

//CURRENTLY UNUSED
//var musicVideo = document.getElementById('music-video');

//Event Listener
searchButton.addEventListener('click', conductSearch)

//This needs to be updatable -- or automatic via geolocation
var latLong = '38.91589793,-77.04028605';

//Main AudioDB Search Function
function conductSearch () {
    var inputText = document.getElementById('artist').value;
    console.log(inputText)
    let artist = inputText;
    fetch('http://theaudiodb.com/api/v1/json/523532/search.php?s=' + artist)
        .then (function (response) {
            console.log(artist);
            return response.json();
        })
        .then(function(data){
            console.log(data);
            let event = data.artists[0];
            //var artistId = event.idArtist;
            let artistName = event.strArtist;
            let recordLabel = event.strLabel;
            let artistBio = event.strBiographyEN;

            console.log(artistName, recordLabel, ' --- ', artistBio);
            //fetchYouTubeVideos(artistId);
    });

    fetch('http://app.ticketmaster.com/discovery/v2/suggest.json?apikey=UATb9rxr2FbYLjJ1AcWnmdxOlGOpA7j5&geoPoint=' + latLong)
    .then(function (response) {
        return response.json();
      })
      .then(function (data) {
        console.log(data);
        let event = data._embedded.events;
        for (var i = 0; i < 5; i++) {
          let eventName = event[i].name;
          let eventAddress = event[i]._embedded.venues[0].name + ", " + event[i]._embedded.venues[0].city.name + ", " + event[i]._embedded.venues[0].state.stateCode;
          let eventDate = dayjs(event[i].dates.start.dateTime).format('h:mmA');

          console.log(eventName, eventAddress, eventDate);
        }
      });

}


//Unused Music Video Function --- YouTube Doesn't Allow Embedded Music Videos

// function fetchYouTubeVideos(artistId) {
//     fetch('https://theaudiodb.com/api/v1/json/523532/mvid.php?i=' + artistId)
//     .then (function (response) {
//         console.log(artistId);
//         return response.json();
//     })
//     .then(function(data){
//         console.log(data);
//         let event = data.mvids[0];
//         let ytLink = event.strMusicVid;
//         console.log(ytLink);
//         musicVideo.src = ytLink;
        
//     });
// }
