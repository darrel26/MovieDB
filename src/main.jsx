import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./index.css";
import { QueryClient, QueryClientProvider } from "react-query";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import MovieDetails from "./components/MovieDetails";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: Infinity,
      cacheTime: 1000 * 60 * 10,
    },
  },
});

ReactDOM.createRoot(document.getElementById("root")).render(
  <QueryClientProvider client={queryClient}>
    <React.StrictMode>
      <Router>
        <Routes>
          <Route path="/" element={<App />} />
          <Route path="/movies" element={<App />} />
          <Route path="/tv-shows" element={<App />} />
          <Route path="/movies/:id" element={<MovieDetails />} />
          <Route path="/tv-shows/:id" element={<MovieDetails />} />
        </Routes>
      </Router>
    </React.StrictMode>
  </QueryClientProvider>
);
