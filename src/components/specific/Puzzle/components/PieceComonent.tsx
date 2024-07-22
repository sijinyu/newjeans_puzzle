import { PieceComponentProps } from "../type";

const PieceComponent: React.FC<PieceComponentProps> = ({
  piece,
  index,
  gridSize,
  handleDragStart,
  handleDrop,
  handleDragOver,
  isShuffled,
  imageSrc,
}) => {
  const pieceSize = 100;
  const pieceStyle = {
    width: `${pieceSize}px`,
    height: `${pieceSize}px`,
    backgroundImage: `url(${imageSrc})`,
    backgroundSize: `${gridSize * pieceSize}px ${gridSize * pieceSize}px`,
    backgroundPosition: `${-piece.col * pieceSize}px ${
      -piece.row * pieceSize
    }px`,
  };

  return (
    <div
      className="puzzle-piece"
      style={pieceStyle}
      draggable={isShuffled}
      onDragStart={(e) => handleDragStart(e, index)}
      onDrop={(e) => handleDrop(e, index)}
      onDragOver={handleDragOver}
    />
  );
};

export default PieceComponent;
