import { Link } from 'react-router';

export default function Navigation() {
 return (
    <nav style={{ marginBottom: '20px' }}>
        <Link to="/" style={{ marginRight: '10px' }}>Главная</Link>
        <Link to="/menu" style={{ marginRight: '10px' }}>Меню</Link>
        <Link to="/order">Заказ</Link>
    </nav>
 );
}