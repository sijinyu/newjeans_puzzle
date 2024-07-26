import { useEffect, useState } from "react";
import useSound from "use-sound";
import { getRandomItem } from "../../../../common/utils";


// 배경 이미지, 퍼즐 이미지, 사운드 파일 목록 정의
const puzzleImages = ['/puzzle1.jpg', '/puzzle2.jpg', '/puzzle3.jpg','/puzzle4.jpg'];
// const soundFiles = ['/sound1.mp3', '/sound2.mp3', '/sound3.mp3'];

  // 무작위로 배경 이미지, 퍼즐 이미지, 사운드 파일 선택


  interface Piece {
    id: number;
    row: number;
    col: number;
  }
  
  
const usePuzzle = () => {
  const [pieces, setPieces] = useState<Piece[]>([]);
  const [isSolved, setIsSolved] = useState(true);
  const [isShuffled, setIsShuffled] = useState(false);
  const [solvedCount, setSolvedCount] = useState(0);
  const [gridSize, setGridSize] = useState(4);
  const [play, { stop }] = useSound('/success.mp3');
  const [puzzleImage, setPuzzleImage] = useState(getRandomItem(puzzleImages));


  // 드래그 중일 때 호출되는 함수
  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
  };

  // 드래그 시작 시 호출되는 함수
  const handleDragStart = (
    e: React.DragEvent<HTMLDivElement>,
    index: number
  ) => {
    if (!isShuffled) {
      
      alert('셔플 준비 갈 미완료')
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



  const handlePuzzleChange = () => {
    while(true) {
      const newPuzzleImage = getRandomItem(puzzleImages)
      if(puzzleImage !== newPuzzleImage)  {
        setPuzzleImage(newPuzzleImage)
        break;
      }
    }
    
  }
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


    // 퍼즐 초기화
    useEffect(() => {
      initializePuzzle();
    }, [gridSize, puzzleImage]);

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

  // 셔플 버튼 클릭 시 호출되는 함수
  const handleShuffleClick = () => {
    setPieces(shuffle([...pieces]));
    setIsSolved(false);
    stop();
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

  
  useEffect(() => {
    initializePuzzle();
  }, [gridSize]);

  useEffect(() => {
    if (isShuffled && pieces.every((piece, idx) => piece.id === idx)) {
      setIsSolved(true);
      setIsShuffled(false);
      setSolvedCount((prev) => prev + 1);
      play();
      alert("성공했습니다!");
    }
  }, [pieces, isShuffled, play]);

  return {
    pieces,
    isSolved,
    isShuffled,
    puzzleImage,
    handleDrop,
    solvedCount,
    handleShuffleClick,
    handleDragOver,
    handleDragStart,
    handlePuzzleChange,
    gridSize,
    decreaseGridSize,
    increaseGridSize,
  };
};

export default usePuzzle;
