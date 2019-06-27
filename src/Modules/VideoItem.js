import './card.css';
import React from 'react';

const VideoItem = ({ video, onVideoSelect }) => {
    return (
        <div className="" type='button' key={video.id.videoId} >
            <div className='row' style={{ background: "#023646"}}  onClick={() => onVideoSelect(video)} data-toggle="modal" data-target="#exampleModal" >
                <div className="col-sm-6" style={{ marginTop: '0%' }}>
                    <img className='vlist' alt={video.snippet.title} src={video.snippet.thumbnails.medium.url}  height='100%' width='100%' />
                </div>
                <div className='col-sm-6' style={{ background: "#023646" }}>
                    <p className='listTitle' style={{color: '#CBE3EB' }} key={video.snippet.title} >{video.snippet.title}</p>
                </div>
                
            </div>
            <div style={{ marginBottom: '7px' }}>

            </div>
        </div>
    );
};

export default VideoItem;
