import React from "react";
import Button from "../../unit/Button";
import "./Puzzle.css";
import PieceComponent from "./components/PieceComonent";
import usePuzzle from "./hooks/usePuzzle";


const Puzzle: React.FC = () => {
  const {
    gridSize,
    pieces,
    isSolved,
    isShuffled,
    solvedCount,
    puzzleImage,
    handleShuffleClick,
    handleDragOver,
    handleDragStart,
    handleDrop,
    handlePuzzleChange,
    decreaseGridSize,
    increaseGridSize,
    
  } = usePuzzle();
  


  const puzzleGridStyles = {
    gridTemplateColumns: `repeat(${gridSize}, 100px)`,
    gridTemplateRows: `repeat(${gridSize}, 100px)`,
  };

  return (
    <div className="puzzle-container">
      <button onClick={handlePuzzleChange}>다른 그림 퍼즐 맞추기</button>
      <div className="controls">
        <Button onClick={decreaseGridSize}>-</Button>
        <span style={{color:'InfoBackground'}}>
          {gridSize} x {gridSize}
        </span>
        <Button onClick={increaseGridSize}>+</Button>
      </div>
      <Button onClick={handleShuffleClick} disabled={isShuffled}>
        셔플
      </Button>
      <p className="highlight">
        상하좌우 1칸씩 움직일 수 있어용 성공하면 <strong>노래가 나옵니다!</strong>
      </p>
      {isSolved && solvedCount > 0 && <span>퍼즐 통과 횟수 {solvedCount}</span>}
      <div className="puzzle-grid" style={puzzleGridStyles}>
        {pieces.map((piece, index) => (
          <PieceComponent
            key={piece.id}
            piece={piece}
            index={index}
            gridSize={gridSize}
            handleDragStart={handleDragStart}
            handleDrop={handleDrop}
            handleDragOver={handleDragOver}
            isShuffled={isShuffled}
            imageSrc={puzzleImage}
          />
        ))}
      </div>
    </div>
  );
};

export default Puzzle;
