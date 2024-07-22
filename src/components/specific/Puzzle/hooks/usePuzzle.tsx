import { useEffect, useState } from "react";
import useSound from "use-sound";
import { Piece } from "../type";

const soundSrc = "/success.mp3"; // 성공 시 재생할 음악 경로

const usePuzzle = (gridSize: number) => {
  const [pieces, setPieces] = useState<Piece[]>([]);
  const [isSolved, setIsSolved] = useState(true);
  const [isShuffled, setIsShuffled] = useState(false);
  const [solvedCount, setSolvedCount] = useState(0);
  const [play, { stop }] = useSound(soundSrc);

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
    solvedCount,
    setPieces,
    handleShuffleClick,
    isValidMove,
  };
};

export default usePuzzle;
