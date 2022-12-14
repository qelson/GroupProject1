//DOM references
var searchButton = document.getElementById('submit');
var artistInformation = document.getElementById("artist-information");
var eventInformation = document.getElementById("event-information");
var artistImage = document.getElementById('artist-image');
var SavedList = document.getElementById('SavedList');
var saveButton = document.getElementById('Save');
var footer = document.getElementById('footer');

//BOOKMARK ARRAY
const ListArray = [];

//LOCAL STORAGE OBJ
var keyObj = localStorage.getItem('artist-list');

if (keyObj != null) {
  loadBookmarks();
}

//CURRENTLY UNUSED
//var musicVideo = document.getElementById('music-video');

//Event Listeners
searchButton.addEventListener('click', conductSearch)
saveButton.addEventListener('click', listSave)

//CURRENTLY UNUSED
//This needs to be updatable -- or automatic via geolocation
// var latLong = '38.91589793,-77.04028605';

//GET BOOKMARKS
function loadBookmarks () {
  ListArray.push(keyObj);
  const newListArray = ListArray[0].split(',');

  for (let i = 0; i < newListArray.length; i++) {
    var Li = document.createElement("li");
    Li.textContent = newListArray[i];
    SavedList.appendChild(Li);
  }
}

// if (localStorage.getItem('artist-list') != null) {
//   newListArray.push((localStorage.getItem('artist-list')));
//   localStorage.clear('artist-list');
// }



// if (ListArray.length > 0) {
//   localStorage.getItem('artist-list');
// }


//Main AudioDB Search Function
function conductSearch () {
    if (artistInformation.hasChildNodes()) {
      artistInformation.removeChild(artistInformation.lastChild);
    }
    if (eventInformation.hasChildNodes()) {
      for (let i = 0; i < 20; i++) {
        eventInformation.removeChild(eventInformation.lastChild);
      }
    }
    var inputText = document.getElementById('artist').value;
    console.log(inputText)
    let artist = inputText;
    fetch('http://theaudiodb.com/api/v1/json/523532/search.php?s=' + artist)
        .then (function (response) {
            console.log(artist);
            return response.json();
        })
        .then(function(data){
            //console.log(data);
            let event = data.artists[0];
            //var artistId = event.idArtist;
            let artistPic = event.strArtistClearart;
            let artistName = event.strArtist;
            let recordLabel = event.strLabel;
            let artistBio = event.strBiographyEN;
            var artistPollo = document.createElement("p");
            artistPollo.textContent = artistName + "---" + "Record Label: " + recordLabel + "---" + "Biography: " + artistBio;
            artistInformation.appendChild(artistPollo);
            artistImage.src = artistPic;
            console.log(artistName, recordLabel, ' --- ', artistBio);
            //fetchYouTubeVideos(artistId);
    });

    fetch('http://app.ticketmaster.com/discovery/v2/events.json?apikey=UATb9rxr2FbYLjJ1AcWnmdxOlGOpA7j5&keyword=' + artist)
    .then(function (response) {
        return response.json();
      })
      .then(function (data) {
        //console.log(data);
        let event = data._embedded.events;
        for (var i = 0; i < event.length; i++) {
          let eventName = event[i].name;
          let location = event[i].dates.timezone;
          //let eventAddress = event[i]._embedded.venues[0].name + ", " + event[i]._embedded.venues[0].city.name + ", " + event[i]._embedded.venues[0].state.stateCode;
          let eventDate = dayjs(event[i].dates.start.dateTime).format('dddd, MMMM Do YYYY -- h:mmA');
          var eventPollo = document.createElement("p")
          eventPollo.textContent = eventName + " " + location + " " + eventDate;
          eventInformation.appendChild(eventPollo)
          //console.log(eventName, location, eventDate);
          }    
      });

  artistInformation.classList.remove("hide");
  eventInformation.classList.remove("hide");
  artistImage.classList.remove("hide");
  footer.setAttribute('style', 'position: relative');
}

//BOOKMARK FUNCTIONS AND EVENT LISTENERS
function listSave () {
  var inputText = document.getElementById('artist').value;
  ListArray.push(inputText);
  console.log(ListArray);
  var Li = document.createElement("li");
  Li.textContent = inputText;
  SavedList.appendChild(Li);
  localStorage.setItem('artist-list', ListArray);
  //console.log(localStorage.getItem('artist-list'));
}

// localStorage.setItem('artist-list', JSON.stringify(ListArray));
// var strArray = JSON.stringify(ListArray);


SavedList.addEventListener('click', function(event) {
  var element = event.target;

  if (element.matches('li') === true) {
    document.getElementById('artist').value = element.textContent
    conductSearch();
  }
});

// localStorage.setItem("artist-information", JSON.stringify(artistInformation))
// localStorage.setItem("event-information", JSON.stringify(eventInformation))

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
