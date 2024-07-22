import React from "react";
import "./App.css";
import Puzzle from "./components/specific/Puzzle";

const App: React.FC = () => {
  return (
    <div className="App">
      <h1>NewJeans Puzzle Game</h1>
      <Puzzle />
    </div>
  );
};

export default App;
