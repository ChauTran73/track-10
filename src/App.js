import React, { Component } from 'react';
import './App.css';
import {FormControl, FormGroup, InputGroup, Glyphicon} from 'react-bootstrap/lib';
import fetch from 'isomorphic-fetch'; 
import {Profile} from './profile';
import {Gallery} from './gallery';

class App extends Component {
  constructor(props){
    super(props);
     this.state ={searchValue: '', artist: null, tracks:[]}
       
     };
  
  
  //a search method to fetch data from Spotify API
  search(){
     //console.log(this.state.searchValue);
    const BASE_URL = 'https://api.spotify.com/v1/search?'
    let FETCH_URL = `${BASE_URL}q=${this.state.searchValue}&type=artist&limit=1`
    const accessToken = 'BQCWF0ydWhL8qUD0k9JIc3HDOYzO_wu9pXZ3XV1jvUARLkBsd1cBDfZfo9AC4BER1YgxviI82F2YO9l3sjuVHyP360JVQNiTZYMOYUQiMm8ipoB_t9NjIl6l7s8qfScHywUocx5n4heXHarJsDXU5dolS7HBnA&refresh_token=AQCyBYonBcPr_YpxyZEC-xjq3w2ib8si4NOh2rLRGYDtBl6D0WDa36QWoXOb1b_QfwEQXL8iUfcTOwevuP7QKY875WKHcfMw5Ellzn9mt9pQjFDN1qEi10lQt5z3J1fXlV8'
    const ALBUM_URL =  'https://api.spotify.com/v1/artists/'
    
    var myOptions = {
      method: 'GET',
      headers:  {
        'Authorization': 'Bearer ' + accessToken
     },
      mode: 'cors',
      cache: 'default'
    };
    
   fetch(FETCH_URL, myOptions)
   .then(results => results.json())
   .then(json => 
     {
       const artist = json.artists.items[0];
       console.log(artist)
       this.setState({artist});
      FETCH_URL = `${ALBUM_URL}${artist.id}/top-tracks?country=US&VN&UK`;
      fetch(FETCH_URL,myOptions)
      .then(results => results.json())
      .then(json=> {
        const tracks = json.tracks;
        console.log(tracks)
        this.setState({tracks});
      });
     });
  }
   
     
  render() {
   
    return (
      <div className="App container-fluid">
     
        <h1 className="header"><Glyphicon glyph="music"/> Track 10 <Glyphicon glyph="music"/></h1>
        <p> Track 10 allows you to search for an artist and get their top 10 track previews</p>
        <FormGroup>
          <InputGroup>
          
            <FormControl className="searchBar" type="text"
            value={this.state.searchValue}
            placeholder="Make some noises! Search for an artist here"
            onChange= {event => {this.setState({searchValue: event.target.value})}}
            onKeyPress = {event => {if (event.key === 'Enter') this.search()}}
            />
          
          <InputGroup.Addon onClick={()=> this.search()}><Glyphicon glyph="search"/></InputGroup.Addon>
          </InputGroup>
        </FormGroup>
        
        <Profile artist={this.state.artist} />
        <Gallery tracks={this.state.tracks}/>
        
      </div>
    );
  }
}

export default App;
