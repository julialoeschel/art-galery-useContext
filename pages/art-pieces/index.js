import ArtPieces from "../../components/ArtPieces";
import { PiecesContext, ArtpieceInfoContext } from "../_app.js";
import { useContext } from "react";

export default function ArtPiecesPage({ onArtPiecesInfo }) {
  const pieces = useContext(PiecesContext);
  const artPiecesInfo = useContext(ArtpieceInfoContext);

  return (
    <ArtPieces
      pieces={pieces}
      onArtPiecesInfo={onArtPiecesInfo}
      artPiecesInfo={artPiecesInfo}
    />
  );
}
