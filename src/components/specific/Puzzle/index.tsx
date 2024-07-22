import React, { useState } from "react";
import usePuzzle from "./hooks/usePuzzle";
import PieceComponent from "./components/PieceComonent";
import Button from "../../unit/Button";
import "./Puzzle.css";

const imageSrc = "/newjeans.jpeg"; // 퍼즐 이미지 경로

const Puzzle: React.FC = () => {
  const [gridSize, setGridSize] = useState(4);
  const {
    pieces,
    isSolved,
    isShuffled,
    solvedCount,
    setPieces,
    handleShuffleClick,
    isValidMove,
  } = usePuzzle(gridSize);

  // 드래그 시작 시 호출되는 함수
  const handleDragStart = (
    e: React.DragEvent<HTMLDivElement>,
    index: number
  ) => {
    if (!isShuffled) {
      e.preventDefault();
      return;
    }
    e.dataTransfer.setData("text/plain", index.toString());
  };

  // 드롭 시 호출되는 함수
  const handleDrop = (e: React.DragEvent<HTMLDivElement>, index: number) => {
    if (!isShuffled) {
      e.preventDefault();
      return;
    }
    const draggedIndex = parseInt(e.dataTransfer.getData("text/plain"));
    if (!isValidMove(draggedIndex, index)) {
      e.preventDefault();
      return;
    }
    const newPieces = [...pieces];
    [newPieces[draggedIndex], newPieces[index]] = [
      newPieces[index],
      newPieces[draggedIndex],
    ];
    setPieces(newPieces);
  };

  // 드래그 중일 때 호출되는 함수
  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
  };

  // 그리드 크기 증가 함수
  const increaseGridSize = () => {
    if (gridSize < 7) {
      setGridSize(gridSize + 1);
    }
  };

  // 그리드 크기 감소 함수
  const decreaseGridSize = () => {
    if (gridSize > 2) {
      setGridSize(gridSize - 1);
    }
  };

  const puzzleGridStyles = {
    gridTemplateColumns: `repeat(${gridSize}, 100px)`,
    gridTemplateRows: `repeat(${gridSize}, 100px)`,
  };

  return (
    <div className="puzzle-container">
      <div className="controls">
        <Button onClick={decreaseGridSize}>-</Button>
        <span>
          {gridSize} x {gridSize}
        </span>
        <Button onClick={increaseGridSize}>+</Button>
      </div>
      <Button onClick={handleShuffleClick} disabled={isShuffled}>
        셔플
      </Button>
      <p className="highlight">
        상하좌우로만 움직일 수 있어용 성공하면 <strong>노래가 나옵니다!</strong>
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
            imageSrc={imageSrc}
          />
        ))}
      </div>
    </div>
  );
};

export default Puzzle;
