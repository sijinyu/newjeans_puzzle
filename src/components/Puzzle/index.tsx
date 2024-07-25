import React, { useEffect, useState } from 'react';
import useSound from 'use-sound';
import PieceComponent from '../specific/Puzzle/components/PieceComonent';
import { Piece } from '../specific/Puzzle/type';
import './Puzzle.css';

const imageSrc = '/public/newjeans.jpeg'; // 퍼즐 이미지 경로
const soundSrc = '/public/success.mp3'; // 성공 시 재생할 음악 경로


const Puzzle: React.FC = () => {
  const [gridSize, setGridSize] = useState(4); // 격자 크기 초기값
  const [solvedCount,setSolvedCount] = useState(0) // 성공 횟수
  const [pieces, setPieces] = useState<Piece[]>([]); // 퍼즐 조각 상태
  const [isSolved, setIsSolved] = useState(true); // 퍼즐이 해결되었는지 여부
  const [isShuffled, setIsShuffled] = useState(false); // 퍼즐이 섞였는지 여부
  const [play, { stop }] = useSound(soundSrc,{volume:50}); // 성공 시 음악 재생 함수


  

  // 퍼즐 초기화 함수
  const initializePuzzle = () => {
    const initialPieces: Piece[] = [];
    for (let i = 0; i < gridSize * gridSize; i++) {
      initialPieces.push({
        id: i,
        row: Math.floor(i / gridSize),
        col: i % gridSize,
      });
    }
    setPieces(initialPieces);
  };


  // 퍼즐 조각 섞기
  const shuffle = (array: Piece[]): Piece[] => {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
  };

  // 드래그 시작 시 호출되는 함수
  const handleDragStart = (e: React.DragEvent<HTMLDivElement>, index: number) => {
    if (!isShuffled) {
      e.preventDefault();
      return;
    }
    e.dataTransfer.setData('text/plain', index.toString());
  };

  // 드롭 시 호출되는 함수
  const handleDrop = (e: React.DragEvent<HTMLDivElement>, index: number) => {
    if (!isShuffled) {
      e.preventDefault();
      return;
    }
    const draggedIndex = parseInt(e.dataTransfer.getData('text/plain'));
    if (!isValidMove(draggedIndex, index)) {
      e.preventDefault();
      return;
    }
    const newPieces = [...pieces];
    [newPieces[draggedIndex], newPieces[index]] = [newPieces[index], newPieces[draggedIndex]];
    setPieces(newPieces);
  };

  // 드래그 중일 때 호출되는 함수
  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
  };


  // 셔플 버튼 클릭 시 호출되는 함수
  const handleShuffleClick = () => {
    setPieces(shuffle([...pieces]));
    setIsSolved(false);
    stop()
    setIsShuffled(true);
  };

  // 상하좌우로만 이동 가능한지 체크하는 함수
  const isValidMove = (draggedIndex: number, targetIndex: number) => {
    const draggedRow = Math.floor(draggedIndex / gridSize);
    const draggedCol = draggedIndex % gridSize;
    const targetRow = Math.floor(targetIndex / gridSize);
    const targetCol = targetIndex % gridSize;

    const isAdjacent =
      (draggedRow === targetRow && Math.abs(draggedCol - targetCol) === 1) ||
      (draggedCol === targetCol && Math.abs(draggedRow - targetRow) === 1);

    return isAdjacent;
  };


    // 그리드 크기 증가 함수
    const increaseGridSize = () => {
      if (gridSize < 7) {
        setGridSize(gridSize + 1);
        setIsShuffled(false);
        setIsSolved(true);
      }
    };
  
    // 그리드 크기 감소 함수
    const decreaseGridSize = () => {
      if (gridSize > 2) {
        setGridSize(gridSize - 1);
        setIsShuffled(false);
        setIsSolved(true);
      }
    };

   // 퍼즐 초기화
   useEffect(() => {
    initializePuzzle();
  }, [gridSize]);

  useEffect(() => {
    if (isShuffled && pieces.every((piece, idx) => piece.id === idx)) {
      setIsSolved(true);
      setIsShuffled(false);
      setSolvedCount((prev) => prev+1)
      alert('성공했습니다!');
      play();
    }
  }, [pieces, isShuffled, play]);

  

  const puzzleGridStyles={ gridTemplateColumns: `repeat(${gridSize}, 100px)`, gridTemplateRows: `repeat(${gridSize}, 100px)` }
  return (
    <div className="puzzle-container" >
      <div className="controls">
        <Button onClick={decreaseGridSize}>-</Button>
        <span>{gridSize} x {gridSize}</span>
        <Button onClick={increaseGridSize}>+</Button>
      </div>
      <Button onClick={handleShuffleClick} disabled={isShuffled}>셔플</Button>
      <p className='highlight'>상하좌우로만 움직일 수 있어용 성공하면 <strong>노래가 나옵니다!</strong></p>
      {isSolved && solvedCount > 0 && <span>퍼즐 통과 횟수{solvedCount}</span>}
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
            isShuffled={isShuffled} imageSrc={imageSrc}          />
        ))}
      </div>
    </div>
  );
};

export default Puzzle;


interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {}
export const Button:React.FC<ButtonProps> = ({onClick, children},...rest) => {
  
    return <button className='btn btn-peach' onClick={onClick} {...rest} >{children}</button>;
}