import { useState } from 'react';

function ColorChanger() {
  const [bgColor, setBgColor] = useState('white');

  return (
    <div style={{
      padding: '20px',
      backgroundColor: bgColor,
      border: '1px solid #ccc'
    }}>
      <h2>Цвет фона: {bgColor}</h2>
      <button onClick={() => setBgColor('red')}>Красный</button>
      <button onClick={() => setBgColor('blue')}>Синий</button>
    </div>
  );
}

export default ColorChanger;