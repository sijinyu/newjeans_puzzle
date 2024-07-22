export interface Piece {
  id: number;
  row: number;
  col: number;
}

export interface PieceComponentProps {
  piece: Piece;
  index: number;
  gridSize: number;
  handleDragStart: (e: React.DragEvent<HTMLDivElement>, index: number) => void;
  handleDrop: (e: React.DragEvent<HTMLDivElement>, index: number) => void;
  handleDragOver: (e: React.DragEvent<HTMLDivElement>) => void;
  isShuffled: boolean;
  imageSrc : string;
}