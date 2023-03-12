import React from "react";
import "./FaceDetection.css";

const FaceDetection = ({ imgLink, detectionBox, faceloading, errorDetecting }) => {
  return (
    <div id='face__detection' className="fd_container">
      {
        errorDetecting?(
          <p className="error__detecting"
          >Ooops, something happened. Please make sure you entered a valid URL, or, try a different image.</p>
        ):(
          <div className="img__container">
            {
              faceloading?(
                  <h2 style={{position: "absolute", color: "white", fontSize: '1.2rem'}}>Generating Output...</h2>
                ):(
                  detectionBox.map(item => (
                      <div
                        key={`#${item.id}`}
                        id="detection__box"
                        style={{
                          opacity: item.opacity,
                          top: item.topRow,
                          right: item.rightCol,
                          left: item.leftCol,
                          bottom: item.bottomRow,
                        }}
                      ></div>
                    )
                  )
                )
            }
            <img id="img__input" src={imgLink} alt="" />
          </div>
        )
      }
    </div>
  );
};

export default FaceDetection;
