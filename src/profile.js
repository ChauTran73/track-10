import React,{Component} from 'react';
import './App.css';

export class Profile extends Component {
    render(){
        let artist = {name:'', followers:{total:''}, popularity:'', genres:[], images: [{url:''}]};
        if (this.props.artist !== null){
            artist = this.props.artist;
        }
        return (
            <div className="profile">
                <div>Artist: {artist.name}</div>
                <div>Total Followers: {artist.followers.total}</div>
                <div>Popularity: {artist.popularity}</div>
                <div> Genres: {artist.genres.map((genre,i) => {return <div>{genre}</div>})} </div>
              
              <img className="profile_pic" src={artist.images[0].url} alt={artist.name}/>
                
            </div>
            )
    }
}

