import React from 'react';
export default function PizzaItem({ pizza }) {
 return (
 <div className="pizza-item" style={{
 border: '1px solid #ddd',
 borderRadius: '8px',
 padding: '16px',
 margin: '10px',
 width: '250px',
 textAlign: 'center'
 }}>
 <img
 src={pizza.image}
 alt={pizza.name}
 style={{
 width: '100%',
 height: '180px',
 objectFit: 'cover',
 borderRadius: '8px'
 }}
 />
 <h3>{pizza.name}</h3>
 <p>{pizza.description}</p>
 <p style={{ fontWeight: 'bold', color: '#e74c3c' }}>
 {pizza.price} руб.
 </p>
 </div>
 );
} 