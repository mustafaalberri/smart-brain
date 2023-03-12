import React from "react";
import './Navbar.css'

const Navbar = ({onRouteChange, isSignedIn}) => {
  return (isSignedIn?(
      <nav>
        <ul className="list">
          <li onClick = {() => onRouteChange('signin')}> Sign Out </li>
        </ul>
      </nav>
    ):(
      <nav>
        <ul className="list">
          <li onClick = {() => onRouteChange('signin')}> Sign In </li>
          <li onClick = {() => onRouteChange('register')}> Register </li>
        </ul>
      </nav>
    )
  );
}
  
export default Navbar;