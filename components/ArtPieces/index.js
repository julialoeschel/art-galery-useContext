import ArtPiecePreview from "../ArtPiecePreview";
import styled from "styled-components";
import { ArtPiecesInfoContext } from "../../pages/_app";
import { useContext } from "react";

const List = styled.ul`
  list-style: none;
  padding-left: 0;
  margin: 0;
  display: flex;
  flex-wrap: wrap;
  gap: 1rem;
  justify-content: center;

  li {
    width: 30rem;
    min-width: 10rem;
    height: 30rem;
  }
`;

export default function ArtPieces({ pieces }) {
  const { artPiecesInfo, toggleFavorite } = useContext(ArtPiecesInfoContext);

  return (
    <List>
      {pieces?.map((piece) => (
        <li key={piece.slug}>
          <ArtPiecePreview
            title={piece.name}
            image={piece.imageSource}
            artist={piece.artist}
            slug={piece.slug}
            isFavorite={
              artPiecesInfo?.find((artPiece) => artPiece.slug === piece.slug)
                ?.isFavorite
            }
            onToggleFavorite={() => toggleFavorite(piece.slug)}
          />
        </li>
      ))}
    </List>
  );
}
