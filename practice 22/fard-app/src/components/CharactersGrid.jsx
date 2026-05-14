import CharacterCard from "./CharacterCard";
import "./CharactersGrid.css";

export default function CharactersGrid({ characters }) {
  return (
    <div className="characters-grid">
      {characters.map((char, index) => (
        <CharacterCard key={index} character={char} />
      ))}
    </div>
  );
}