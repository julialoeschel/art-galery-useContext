import { createContext } from "react";
import useSWR from "swr";

const fetcher = async (...args) => {
  const response = await fetch(...args);
  if (!response.ok) {
    throw new Error(`Request with ${JSON.stringify(args)} failed.`);
  }
  return await response.json();
};
export const ArtPiecesContext = createContext();

const PiecesContextProvider = ({ children }) => {
  const { data, isLoading, error } = useSWR(
    "https://example-apis.vercel.app/api/art",
    fetcher
  );

  return (
    <ArtPiecesContext.Provider value={isLoading || error ? [] : data}>
      {children}
    </ArtPiecesContext.Provider>
  );
};
