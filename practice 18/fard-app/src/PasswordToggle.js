import { useState } from 'react';

function PasswordToggle() {
  const [showPassword, setShowPassword] = useState(false);
  const [password, setPassword] = useState('');

  const toggleVisibility = () => {
    setShowPassword(!showPassword);
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  return (
    <div>
      <input
        type={showPassword ? 'text' : 'password'}
        placeholder="Введите пароль"
        value={password}
        onChange={handlePasswordChange}
      />
      <button onClick={toggleVisibility}>
        {showPassword ? 'Скрыть пароль' : 'Показать пароль'}
      </button>
    </div>
  );
}

export default PasswordToggle;