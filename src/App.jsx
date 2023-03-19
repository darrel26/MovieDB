import "./App.css";
import { useState } from "react";
import Hero from "./components/HeroSection/Hero";
import NavBar from "./components/NavBar";

function App() {
  const [activeMovie, setActiveMovie] = useState(0);

  return (
    <div className="bg-container">
      <NavBar />
      <Hero active={activeMovie} setActive={setActiveMovie} />
    </div>
  );
}

export default App;
