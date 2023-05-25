import ArtPieces from "../../components/ArtPieces";
import { ArtPiecesContext, ArtPiecesInfoContext } from "../_app.js";
import { useContext } from "react";

export default function FavoritesPage({ onArtPiecesInfo }) {
  const pieces = useContext(ArtPiecesContext);
  const artPiecesInfo = useContext(ArtPiecesInfoContext);

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
