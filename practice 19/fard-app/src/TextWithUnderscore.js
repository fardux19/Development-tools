import { useState } from 'react';

function TextWithUnderscore() {
  const [text, setText] = useState('');

  const handleChange = (e) => {
    const value = e.target.value.replace(/ /g, '_');
    setText(value);
  };

  return (
    <div>
      <input type="text" onChange={handleChange} placeholder="Введите текст" />
      <p>{text}</p>
    </div>
  );
}

export default TextWithUnderscore;