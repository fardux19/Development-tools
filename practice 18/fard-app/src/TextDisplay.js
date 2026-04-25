import { useState } from 'react';

function TextDisplay() {
  const [text, setText] = useState('');

  const handleChange = (event) => {
    setText(event.target.value);
  };

  return (
    <div>
      <input
        type="text"
        placeholder="Введите текст"
        value={text}
        onChange={handleChange}
      />
      <p>Вы ввели: {text}</p>
    </div>
  );
}

export default TextDisplay;