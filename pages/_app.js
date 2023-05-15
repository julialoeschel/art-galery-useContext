import GlobalStyle from "../styles";
import useSWR from "swr";
import Layout from "../components/Layout.js";
import useLocalStorageState from "use-local-storage-state";
import { createContext } from "react";
import ArtpiecesInfoProvider from "@/Contexts/ArtpiecesInfoProvider";

const fetcher = async (...args) => {
  const response = await fetch(...args);
  if (!response.ok) {
    throw new Error(`Request with ${JSON.stringify(args)} failed.`);
  }
  return await response.json();
};

export const PiecesContext = createContext(null);
//export const ArtpieceInfoContext = createContext(null);

export default function App({ Component, pageProps }) {
  const { data, isLoading, error } = useSWR(
    "https://example-apis.vercel.app/api/art",
    fetcher
  );
  const [artPiecesInfo, setArtPiecesInfo] = useLocalStorageState(
    "art-pieces-info",
    { defaultValue: [] }
  );

  function toggleFavorite(slug) {
    console.log("yes");
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
  }

  function addComment(slug, newComment) {
    setArtPiecesInfo((prev) => {
      const artPiece = prev.find((piece) => piece.slug === slug);
      if (artPiece) {
        return prev.map((pieceInfo) => {
          if (pieceInfo.slug === slug) {
            return pieceInfo.comments
              ? { ...pieceInfo, comments: [...pieceInfo.comments, newComment] }
              : { ...pieceInfo, comments: [newComment] };
          } else {
            return pieceInfo;
          }
        });
      } else {
        return [...prev, { slug, isFavorite: false, comments: [newComment] }];
      }
    });
  }

  return (
    <Layout>
      <GlobalStyle />
      <PiecesContextProvider>
        <PiecesInfoContextProvider>
          <Component {...pageProps} />
        </PiecesInfoContextProvider>
      </PiecesContextProvider>
    </Layout>
  );
}
