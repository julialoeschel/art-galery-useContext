import ArtPieces from "../../components/ArtPieces";
import { useContext } from "react";
import { ArtPiecesContext, ArtPiecesInfoContext } from "../_app";

export default function ArtPiecesPage({ onArtPiecesInfo }) {
  const pieces = useContext(ArtPiecesContext);
  const { artPiecesInfo } = useContext(ArtPiecesInfoContext);

  return (
    <ArtPieces
      pieces={pieces}
      onArtPiecesInfo={onArtPiecesInfo}
      artPiecesInfo={artPiecesInfo}
    />
  );
}
