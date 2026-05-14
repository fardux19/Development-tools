import "./CharacterCard.css";

export default function CharacterCard({ character }) {
  return (
    <div className="character-card">
      <h3 className="character-name">{character.name}</h3>
      <p className="character-actor">Actor: {character.actor}</p>
      <div className="character-details">
        <span className={`badge gender-${character.gender}`}>
          Gender: {character.gender}
        </span>
        <span className="badge house">
          House: {character.house}
        </span>
        <span className="badge wand">
          Wand core: {character.wandCore}
        </span>
        <span className={`badge alive-${character.alive}`}>
          Alive: {character.alive}
        </span>
      </div>
    </div>
  );
}