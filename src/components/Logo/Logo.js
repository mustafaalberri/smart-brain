import React from "react";
import icon from './icons8.png'
import './Logo.css'
import Tilt from 'react-parallax-tilt';

const Logo = () => {
  return  (
    <div className="logo_container">
      <Tilt
      className="parallax-effect-glare-scale"
      scale={1.1} 
      transitionSpeed={2500}
      perspective={500}
      tiltMaxAngleX={40}
      tiltMaxAngleY={40}
      >
        <img src={icon} alt="Logo.png"></img>
      </Tilt>
    </div>
  );
}

export default Logo;