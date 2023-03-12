import FaceDetection from "./../components/FaceDetection/FaceDetection";
import React, { Component } from "react";
import "./App.css";
import ImageLinkForm from "./../components/ImageLinkForm/ImageLinkForm";
import Rank from "./../components/Rank/Rank";
import Logo from "./../components/Logo/Logo";
import Navbar from "./../components/Navbar/Navbar";
import SignIn from "./../components/SignIn/SignIn";
import Register from "./../components/Register/Register";
import ParticlesBg from "particles-bg";

class App extends Component {
  constructor() {
    super();
    this.state = {
      userInput: "",
      imageURL: "",
      box: [{}],
      route: 'signin',
      isSignedIn: false,
      faceloading: false,
      user: {
        id: '',
        name: '',
        email: '',
        entries: 0,
        dateJoined: '',
      },
      errorDetecting: false,
    };
  }

  onInputChange = evt => this.setState({ userInput: evt.target.value });

  onRouteChange = route => {
    this.setState({
      route: route,
      isSignedIn: route === 'home'? true: false,
      imageURL: "",
      box: [{}],
      faceloading: false,
      userInput: "",
      errorDetecting: false,
    });
  }

  loadUser = newUser => {
    this.setState({
      user:{
        id: newUser.id,
        name: newUser.name,
        email: newUser.email,
        entries: newUser.entries,
        dateJoined: newUser.joined,
      }
    });
  }

  updateRank = async () => {
    const tempUser = this.state.user;
    tempUser.entries++;
    this.loadUser(tempUser);

    const response = await fetch('http://localhost:8080/image', {
      method: 'PUT', 
      credentials: 'same-origin',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
          id: this.state.user.id
      }), 
    });
    try{
      const data = await response.json();
      return data === `${this.state.user.entries}`?data:'error';
    }catch(err){
      console.log('error: ', err);
    }
  }

  calculateBoxPosition = (obj) => {
    const boxes = obj.map(item => {
      return { id: item.id, bbox: item.region_info.bounding_box };
    });
    const height = Number(document.getElementById("img__input").height);
    const width = Number(document.getElementById("img__input").width);
    const positions = boxes.map(item => {
      return {
        id: item.id,
        opacity: "1",
        leftCol: item.bbox.left_col * width,
        topRow: item.bbox.top_row * height,
        rightCol: width - item.bbox.right_col * width,
        bottomRow: height - item.bbox.bottom_row * height,
      };
    });
    this.setState({ box: positions, faceloading:false });
    document.getElementById('img__input').style.opacity = 1;
  }

  onDetectButton = () => {
    if(!this.state.errorDetecting) document.getElementById('img__input').style.opacity = 0;
    this.setState({ imageURL: this.state.userInput, errorDetecting:false, faceloading:true })
    
    fetch('http://localhost:8080/detect', {
      method: 'POST', 
      credentials: 'same-origin',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        imageURL: this.state.userInput
      }), 
    })
      .then(response => response.json())
      .then(result => {
        this.calculateBoxPosition(result.outputs[0].data.regions);
        this.updateRank();
      })
      .catch(error => {
        this.setState({errorDetecting: true, faceloading: false});
        // console.log('error: ', error);
      });
  }

  render() {
    const { box, imageURL, route, isSignedIn, faceloading, user, errorDetecting } = this.state;
    return (
      <>
        <ParticlesBg num={100} type="cobweb" bg={true} />
        <Navbar 
          isSignedIn = {isSignedIn}
          onRouteChange = {this.onRouteChange} />
        <Logo />
        {
          route === 'home'?(
            <>
              <Rank 
                userEntries = {user.entries} 
                userName = {user.name} />
              <ImageLinkForm
                detectButton = {this.onDetectButton}
                inputChange = {this.onInputChange} />
              <FaceDetection 
                imgLink = {imageURL} 
                detectionBox = {box}
                faceloading = {faceloading}
                errorDetecting = {errorDetecting} />
            </>
          ):(route === 'register'?(
                <Register 
                  onRouteChange = {this.onRouteChange}
                  loadUser = {this.loadUser} />
              ):(
                <SignIn 
                  onRouteChange = {this.onRouteChange} 
                  loadUser = {this.loadUser} />
                )
            )
        }
      </>
    );
  }
}

export default App;