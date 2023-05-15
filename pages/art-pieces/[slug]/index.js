import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import ArtPiecesDetails from "../../../components/ArtPiecesDetails";
import { ArtpieceInfoContext, PiecesContext } from "@/pages/_app";
import { useContext } from "react";

export default function ArtPieceDetailsPage({ addComment }) {
  const [selectedArtPiece, setSelectedArtPiece] = useState(null);
  const router = useRouter();
  const { slug } = router.query;
  const { artPiecesInfo, toggleFavorite } = useContext(ArtpieceInfoContext);
  const pieces = useContext(PiecesContext);

  useEffect(() => {
    setSelectedArtPiece(pieces.find((piece) => piece.slug === slug));
  }, [setSelectedArtPiece, pieces, slug]);

  // redirect to 404, in case the piece couldn't be found within 3 seconds
  useEffect(() => {
    let timeoutId;
    if (!selectedArtPiece) {
      timeoutId = setTimeout(() => router.push("/404"), 3000);
    }

    return () => clearTimeout(timeoutId);
  }, [selectedArtPiece, router]);

  const selectedArtPieceComments = artPiecesInfo.find(
    (piece) => piece.slug === selectedArtPiece?.slug
  )?.comments;

  if (!selectedArtPiece) {
    return null;
  }

  return (
    <ArtPiecesDetails
      onBack={() => router.back()}
      image={selectedArtPiece.imageSource}
      title={selectedArtPiece.name}
      artist={selectedArtPiece.artist}
      year={selectedArtPiece.year}
      genre={selectedArtPiece.genre}
      isFavorite={
        artPiecesInfo.find((piece) => piece.slug === selectedArtPiece.slug)
          ?.isFavorite
      }
      onToggleFavorite={() => toggleFavorite(selectedArtPiece.slug)}
      colors={selectedArtPiece.colors}
      comments={selectedArtPieceComments}
      addComment={(newComment) => addComment(selectedArtPiece.slug, newComment)}
    />
  );
}
