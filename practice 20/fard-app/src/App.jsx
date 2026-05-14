import Header from "./components/Header";
import Placeholder from "./components/Placeholder";
import EmojiGrid from "./components/EmojiGrid";
import { emojiList } from "./data/emojiData";
import "./App.css";

function App() {
  return (
    <div className="app">
      <div className="container">
        <Header />
        <Placeholder />
        <EmojiGrid emojis={emojiList} />
      </div>
    </div>
  );
}

export default App;