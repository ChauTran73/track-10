import React, {Component} from 'react';
import './App.css';

export class Gallery extends Component {
    constructor(props){
        super(props);
        this.state = {playing: false, audio: null, playingURL: ''}
    }
    playAudio(preview_url){
            let audio = new Audio(preview_url);
            //playing the audio
            if (!this.state.playing){
                audio.play();
                this.setState({playing: true, audio:audio, playingURL: preview_url})
            }
            //when paused, there are two cases: either pausing the current audio or switch  to the other audio
            else{
                //if the current audio 
                if(this.state.playingURL === preview_url){
                    this.state.audio.pause();
                    this.setState({playing:false})
                }else{
                    //if the other audio is played, then stop the current audio then play the other
                    this.state.audio.pause();
                    audio.play();
                    this.setState({playing: true, playingURL: preview_url,audio})
                    
                }
            }
            
        }
        
    render(){
        
    let tracks = [{name:'', preview_url:'', album:{images:{url:''}}}]
    if (this.props.tracks !== null){
        tracks = this.props.tracks;
    }
    return (
        <div className="container">
        <div><strong> Gallery Preview</strong></div><br/>
        <div className="row">
          {tracks.map((track,key) => {
          return(
         <div className="col-lg-4 col-sm-6 " key={key} onClick={() => this.playAudio(track.preview_url)}>
         
                   
                <img className="trackimg" src= {track.album.images[0].url} alt="thumbnail" />
                
                <span className="caption">
                {track.name}
                 <div className="playing-track">
                        {
                       this.state.playingURL===track.preview_url && this.state.playing?
                            <i class="fa fa-lg fa-spotify pulse"></i>:
    
                               <i class="fa fa-lg fa-spotify stop"></i>
                          
                        }
                        
                    </div>
                </span>
             </div>  
            
            
            )
          }
          
         
          )}
          </div>
          
          
          </div>
        )};
};
