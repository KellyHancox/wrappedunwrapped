import React, { Component } from 'react';
import Cd from './blankCd.jpg';
import './App.css';
import Spotify from './spotify-web-api';
import  database  from "./dbHooks";
import { BrowserRouter , Route } from "react-router-dom";
import TopTenPage from './components/TopTenPage.jsx';
import Users from './components/Users.jsx';
import Comparisons from './components/Comparisons.jsx';
import Footnote from './components/Footnote.jsx';
import WelcomePage from './components/Welcomepage.jsx';

const dotenv = require('dotenv');
const spotifyWebApi = new Spotify();

class App extends Component {
  constructor() {
    super();
    const params = this.getHashParams();
    this.state = {
      loggedIn: params.access_token ? true : false,
      topTenArtists: {
        artistNames: [],
        artistImages: [],
        artistNameImageDivs: []
      },
      topFiftyArtists: {
        artistNames: [],
        artistImages: [],
        justNames: []
      },
      topTenTracks: {
        trackNames: [],
        trackImages: [],
        trackNameImageDivs: []
      },
      topFiftyTracks: {
        trackNames: [],
        trackImages: [],
        justTracks: []
      },
      genreMap: new Map(),
      genreArray: [],
      genreTitles: [],
      users: {
        userPictures: [],
        userNames: [],
        userTracks: [],
        userAlbums: [],
        userGenres: []
      },
      comparisonVisible: false,
      genreComparisonDivs: [],
      albumComparisonDivs: [],
      trackComparisonDivs: []
    }
    if (params.access_token) {
      spotifyWebApi.setAccessToken(params.access_token)
      this.getUsersTopArtists()
      this.getUsersTopTracks()
      this.getMembers()
    }
  }

  getHashParams() {
    var hashParams = {};
    var e, r = /([^&;=]+)=?([^&;]*)/g,
        q = window.location.hash.substring(1);
    // eslint-disable-next-line
    while ( e = r.exec(q)) {
       hashParams[e[1]] = decodeURIComponent(e[2]);
    }
    return hashParams;
  }

  afterSave = (response) => {
    var postData = {
      uid: response.id,
      picture: response.images[0].url,
      topFiftyArtists: this.state.topFiftyArtists.justNames,
      topFiftyTracks: this.state.topFiftyTracks.justTracks,
      topGenres: this.state.genreTitles,
      displayName:  response.display_name
    }
    var userId = response.id

    alert("Your information has been saved in the database")
  
    return database.ref("users/" + userId).set(postData)
  }

  saveInformation = () => {
    spotifyWebApi.getMe().then((response) =>
      this.afterSave(response)
    );
  }

  refreshDivs(){
    this.setState({genreComparisonDivs: [], albumComparisonDivs: [], trackComparisonDivs: []})
  }

  getComparisonDivs(genreComparison, albumComparison, trackComparison){
    this.refreshDivs()

    var genres = Object.values(genreComparison)
    var genreDivs = []
    var albums = Object.values(albumComparison)
    var albumDivs = []
    var tracks = Object.values(trackComparison)
    var trackDivs = []

    for(var genre in genres){
      genreDivs.push(<div className="nameImageHolder" key={genre.name}><img className="artistArt" src={Cd} alt="genreArt"/><div className="artistName genreName">{genres[genre].name}</div></div>);
    }
    this.setState({genreComparisonDivs: genreDivs})
    
    for (var album in albums){
      albumDivs.push(<div className="nameImageHolder" key={album.name}><img className="artistArt" src={Cd} alt="genreArt"/><div className="artistName genreName">{albums[album].name}</div></div>)
    }
    this.setState({albumComparisonDivs: albumDivs})

    for (var track in tracks){
      trackDivs.push(<div className="nameImageHolder" key={track.name}><img className="artistArt" src={Cd} alt="genreArt"/><div className="artistName genreName">{tracks[track].name}</div></div>)
    }
    this.setState({trackComparisonDivs: trackDivs})

    this.setState({comparisonVisible: true})
  }

  compareUsers = (event) => {
    var position = event.target.id

    var genreArray1 = this.state.users.userGenres[position]
    var trackArray1 = this.state.users.userTracks[position]
    var albumArray1 = this.state.users.userAlbums[position]

    var genreArray2 = this.state.genreTitles;
    var trackArray2 = this.state.topFiftyTracks.justTracks;
    var albumArray2 = this.state.topFiftyArtists.justNames;

    var genreComparison = []
    var trackComparison = []
    var albumComparison = []

    //compare genres
    for(var i = 0; i < genreArray1.length; i++){
      for(var j = 0; j < genreArray2.length; j++){
        if(genreArray1[i] === genreArray2[j]){
          var genreObject = {name: genreArray1[i], score: i+j}
          genreComparison.push(genreObject)
        }
      }
    }

    //compare albums
    for(var k = 0; k < albumArray1.length; k++){
      for(var l = 0; l < albumArray2.length; l++){
        if(albumArray1[k] === albumArray2[l]){
          var albumObject = {name: albumArray1[k], score: k+l}
          albumComparison.push(albumObject)
        }
      }
    }

    //compare tracks
    for(var m = 0; m < trackArray1.length; m++){
      for(var n = 0; n < trackArray2.length; n++){
        if(trackArray1[m] === trackArray2[n]){
          var trackObject = {name: trackArray1[m], score: m+n}
          trackComparison.push(trackObject)
        }
      }
    }

    //sort them by importance
    genreComparison.sort((a, b) => a.score - b.score);
    albumComparison.sort((a, b) => a.score - b.score);
    trackComparison.sort((a, b) => a.score - b.score);

    this.getComparisonDivs(genreComparison, albumComparison, trackComparison)
  }
 

  getMembers(){
    let currentComponent = this;
    const rootRef = database.ref().child('users');

    rootRef.on('value', snap => { 
      var userPictureArray = []
      var userNameArray = []
      var userTrackArray = []
      var userAlbumArray = []
      var userGenreArray = []

      Object.values(snap.val()).forEach((value) =>
        (userPictureArray.push(value.picture),
        userNameArray.push(value.displayName),
        userTrackArray.push(value.topFiftyTracks),
        userAlbumArray.push(value.topFiftyArtists),
        userGenreArray.push(value.topGenres))
      );

      currentComponent.setState({
        users: {
          userPictures: userPictureArray,
          userNames: userNameArray,
          userTracks: userTrackArray,
          userAlbums: userAlbumArray,
          userGenres: userGenreArray
        }
      });
        
    });
  }

  getUsersTopArtists() {
    spotifyWebApi.getMyTopFiftyArtists().then((response) => {

      this.setState({
        topTenArtists: {
          artistNames: response.items.map((item) => 
          <div className="artistName">{item.name}</div>),
          artistImages: response.items.map((item) => 
          <img className="artistArt" src={item.images[0].url} alt="artistArt"/>),
          artistNameImageDivs: response.items.map((item) => 
          <div className="nameImageHolder" id={item.name}><img className="artistArt" src={item.images[0].url} alt="artistArt"/><div className="artistName">{item.name}</div></div>)
        },
        topFiftyArtists: {
          artistNames: response.items.map((item) => <span>{item.name}</span>),
          artistImages: response.items.map((item) => <img className="artistArt" src={item.images[0].url} alt="artistArt"/>),
          justNames: response.items.map((item) => item.name)
        }
      })

      //put all genres in map from artists
      for(var i = 0; i < 50; i++) {
        this.compileGenres(response.items[i].genres)
      }
      this.getUsersTopGenres()

    })
  }

  compileGenres(array) {
    for (var i = 0; i < array.length; i++) {
      if(this.state.genreMap.has(JSON.stringify([array[i]]))){
        var genreCount = this.state.genreMap.get(JSON.stringify([array[i]]))+1;
        this.state.genreMap.set(JSON.stringify([array[i]]), genreCount);
      } else {
        this.state.genreMap.set(JSON.stringify([array[i]]), 1);
      }
    }
  }

  getUsersTopGenres() {
    // sort by value
    var mapSort = new Map([...this.state.genreMap.entries()].sort((a, b) => b[1] - a[1]));

    var counter = 0;

    for (let key of mapSort.keys()) {
      key = key.replace('["', '')
      key = key.replace('"]', '')
      if(counter < 10){
        this.state.genreArray.push(
          <div className="nameImageHolder" key={key} id={key}><img className="artistArt" src={Cd} alt="genreArt"/><div className="artistName genreName">{key}</div></div>);
      } if(counter < mapSort.keys().length || counter < 50){
        this.state.genreTitles.push(key)
      } else {
        return;
      }
      counter++; 
    }
  }

  getUsersTopTracks() {
    spotifyWebApi.getMyTopFiftyTracks().then((response) => {
      this.setState({
        topTenTracks: {
          trackNames: response.items.map((item) => <div className="artistName">{item.name}</div>),
          trackImages: response.items.map((item) => <img className="artistArt" src={item.album.images[0].url} alt="trackArt"/>),
          trackNameImageDivs: response.items.map((item) => <div className="nameImageHolder" id={item.name}><img className="artistArt" src={item.album.images[0].url} alt="trackArt"/><div className="artistName">{item.name}</div></div>)
        },
        topFiftyTracks: {
          trackNames: response.items.map((item) => <span>{item.name}</span>),
          trackImages: response.items.map((item) => <img className="artistArt" src={item.album.images[0].url} alt="trackArt"/>),
          justTracks: response.items.map((item) => item.name)
        }
      })
    })
  }



render() {
  const loggedIn = this.state.loggedIn;

  return (
    <div className="App">

<BrowserRouter>

    {loggedIn ? <Route path="/" exact render={(props) => <div>
                <TopTenPage
                artistNameImageDivs={this.state.topTenArtists.artistNameImageDivs}
                trackNameImageDivs={this.state.topTenTracks.trackNameImageDivs}
                genreArray={this.state.genreArray}/> 
                <Users compareUsers={this.compareUsers} 
                userPictures={this.state.users.userPictures} 
                userNames={this.state.users.userNames}/>
                <Footnote saveInformation={this.saveInformation}/> 
                </div>} /> : 
                <Route path="/" render={(props) => <WelcomePage />}/> }


    <Route path="/comparisons" render={(props) => <Comparisons artistComparisonDivs={this.state.albumComparisonDivs}
                trackComparisonDivs={this.state.trackComparisonDivs}
                genreComparisonDivs={this.state.genreComparisonDivs} 
                isVisible={this.state.comparisonVisible}/>} />
    </BrowserRouter>  
    

    </div>
  );
}
}


export default App;
