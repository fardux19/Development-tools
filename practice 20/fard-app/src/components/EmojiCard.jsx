import "./EmojiCard.css";

export default function EmojiCard({ emoji, label }) {
  return (
    <div className="emoji-card">
      <div className="emoji">{emoji}</div>
      <p className="label">{label}</p>
    </div>
  );
}