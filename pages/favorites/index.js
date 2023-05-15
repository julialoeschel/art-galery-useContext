import ArtPieces from "../../components/ArtPieces";
import { PiecesContext, ArtpieceInfoContext } from "../_app.js";
import { useContext } from "react";

export default function FavoritesPage({ onArtPiecesInfo }) {
  const pieces = useContext(PiecesContext);
  const { artPiecesInfo } = useContext(ArtpieceInfoContext);

  const favorites = pieces.filter((piece) =>
    artPiecesInfo.find(
      (artPiece) => artPiece.slug === piece.slug && artPiece.isFavorite
    )
  );

  return (
    <ArtPieces
      pieces={favorites}
      onArtPiecesInfo={onArtPiecesInfo}
      artPiecesInfo={artPiecesInfo}
    />
  );
}
