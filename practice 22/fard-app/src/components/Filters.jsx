import "./Filters.css";

export default function Filters() {
  return (
    <div className="filters">
      <div className="filter-group">
        <label>Name</label>
        <input type="text" placeholder="Hermione" />
      </div>
      <div className="filter-group">
        <label>School</label>
        <select>
          <option>Choose one</option>
          <option>Hogwarts</option>
          <option>Beauxbatons</option>
          <option>Durmstrang</option>
        </select>
      </div>
      <div className="filter-group">
        <label>DA</label>
        <select>
          <option>Choose one</option>
          <option>Yes</option>
          <option>No</option>
        </select>
      </div>
    </div>
  );
}