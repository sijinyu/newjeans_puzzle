import React, { useState } from "react";
import "./App.css";
import { getRandomItem } from "./common/utils";
import Puzzle from "./components/specific/Puzzle";

const backgroundImages = ['/background1.jpg', '/background2.jpg', '/background3.jpg','/background4.jpg'];

const App: React.FC = () => {
  const [backgroundImage,setBackgroundImage] = useState(getRandomItem(backgroundImages));
  
  const handleChangeBackgroundImage = () => {
    while(true) {
      const newBackgroundImage = getRandomItem(backgroundImages)
      if(backgroundImage !== newBackgroundImage)  {
        setBackgroundImage(newBackgroundImage)
        break;
      }
    }
  }

  return (
    <div className="App" style={{  
      backgroundImage: `url(${backgroundImage})`,
      backgroundSize:'contain',
      backgroundColor: `rgba(102, 101, 101, 0.9)`, /* 반투명 배경색 추가 */
      backgroundBlendMode: `lighten`
      }}>
      <h1>NewJeans Puzzle Game</h1>
      <button onClick={handleChangeBackgroundImage}>배경화면 셔플</button>
      <Puzzle />
    </div>
  );
};

export default App;
