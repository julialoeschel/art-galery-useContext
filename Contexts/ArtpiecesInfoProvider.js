import { createContext } from "react";
import useLocalStorageState from "use-local-storage-state";
import { useCallback, useMemo } from "react";

export const ArtPiecesInfoContext = createContext(null);
export const ArtPiecesInfoApiContext = createContext(null);

export const PiecesInfoContextProvider = ({ children }) => {
  const [artPiecesInfo, setArtPiecesInfo] = useLocalStorageState(
    "art-pieces-info",
    { defaultValue: [] }
  );

  const toggleFavorite = useCallback((slug) => {
    setArtPiecesInfo((prev) => {
      const artPiece = prev.find((piece) => piece.slug === slug);
      if (artPiece) {
        return prev.map((pieceInfo) =>
          pieceInfo.slug === slug
            ? { ...pieceInfo, isFavorite: !pieceInfo.isFavorite }
            : pieceInfo
        );
      } else {
        return [...prev, { slug, isFavorite: true }];
      }
    });
  }, []);

  const addComment = useCallback(
    (slug, newComment) =>
      setArtPiecesInfo((prev) => {
        const artPiece = prev.find((piece) => piece.slug === slug);
        if (artPiece) {
          return prev.map((pieceInfo) => {
            if (pieceInfo.slug === slug) {
              return pieceInfo.comments
                ? {
                    ...pieceInfo,
                    comments: [...pieceInfo.comments, newComment],
                  }
                : { ...pieceInfo, comments: [newComment] };
            } else {
              return pieceInfo;
            }
          });
        } else {
          return [...prev, { slug, isFavorite: false, comments: [newComment] }];
        }
      }),
    []
  );

  const apiContext = useMemo(
    () => ({
      addComment,
      toggleFavorite,
    }),
    [addComment, toggleFavorite]
  );

  return (
    <ArtPiecesInfoContext.Provider value={artPiecesInfo}>
      <ArtPiecesInfoApiContext.Provider value={apiContext}>
        {children}
      </ArtPiecesInfoApiContext.Provider>
    </ArtPiecesInfoContext.Provider>
  );
};
