import EmojiCard from "./EmojiCard";
import "./EmojiGrid.css";

export default function EmojiGrid({ emojis }) {
  return (
    <div className="emoji-grid">
      {emojis.map((item, index) => (
        <EmojiCard key={index} emoji={item.emoji} label={item.label} />
      ))}
    </div>
  );
}