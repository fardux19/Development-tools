import { useState } from 'react';

function UserStatus() {
  const [status, setStatus] = useState('Онлайн');

  const toggleStatus = () => {
    setStatus(status === 'Онлайн' ? 'Офлайн' : 'Онлайн');
  };

  return (
    <div>
      <p>Пользователь: <strong>Анна</strong> — статус: {status}</p>
      <button onClick={toggleStatus}>
        Переключить статус
      </button>
    </div>
  );
}

export default UserStatus;