import { pizzas } from '../data';
import PizzaItem from '../components/PizzaItem';

export default function Menu() {
 return (
 <div>
    <h2>Наше меню</h2>
    <p>Выберите пиццу и добавьте в корзину!</p>

    <div style={{
            display: 'flex',
            flexWrap: 'wrap',
            justifyContent: 'center',
            gap: '20px'
        }}>
        {pizzas.map((pizza) => (
            <PizzaItem key={pizza.id} pizza={pizza} />
        ))}
    </div>
 </div>
 );
}