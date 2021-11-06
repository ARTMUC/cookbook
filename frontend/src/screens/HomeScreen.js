import "./HomeScreen.css";
import video from "./photos/video.mp4";
import { useState } from "react";

function HomeScreen() {
  return (

    <div className='container__player'>
    <video autoPlay loop muted className="container__player-video">
        <source src={video} type="video/mp4" />
      </video>

      <div className="container__player-text">
        <div className="container__player-title">Join our community</div>
        <div className="container__player-subtitle">A new Experience is Waiting For You.
        Sense the shiver runs down your spine.
        Feel the chilliness of your body.
        And be ready for some fun.</div>
        <button className='container__player-button'>Join now</button>
      

</div>
    </div>
    

  );
}

export default HomeScreen;
