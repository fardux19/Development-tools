import Header from "./components/Header";
import Filters from "./components/Filters";
import CharactersGrid from "./components/CharactersGrid";
import { charactersList } from "./data/charactersData";
import "./App.css";

function App() {
  return (
    <div className="app">
      <div className="container">
        <Header />
        <Filters />
        <CharactersGrid characters={charactersList} />
      </div>
    </div>
  );
}

export default App;