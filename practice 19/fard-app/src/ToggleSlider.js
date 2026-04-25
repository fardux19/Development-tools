import { useState } from 'react';

function ToggleSlider() {
  const [isOn, setIsOn] = useState(false);

  return (
    <div>
      <input 
        type="range" 
        min="0" 
        max="1" 
        step="1"
        value={isOn ? 1 : 0}
        onChange={(e) => setIsOn(e.target.value === '1')}
      />
      <p>Состояние: {isOn ? 'Включено' : 'Выключено'}</p>
    </div>
  );
}

export default ToggleSlider;