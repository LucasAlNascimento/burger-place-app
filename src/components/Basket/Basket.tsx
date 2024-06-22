import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../../redux/Store';
import { removeItem, clearBasket } from '../../redux/slice/Basket';
import { MenuItem } from '../../interfaces/Menu';

export default function Cart() {

  const dispatch = useDispatch();
  const { items } = useSelector((state: RootState) => state.basket);

  const handleRemoveItem = (itemId: number) => {
    dispatch(removeItem(itemId));
  };

  const handleClearBasket = () => {
    dispatch(clearBasket());
  };

  if (items.length === 0) {
    return <div>Your cart is empty</div>;
  }

  return (
    <div className='flex bg-slate-500'>
      <h2>Basket</h2>
      <ul>
        {items.map((item: MenuItem) => (
          <li key={item.id}>
            <h3>{item.name}</h3>
            <p>Price: ${item.price}</p>
            <button onClick={() => handleRemoveItem(item.id)}>Remove</button>
          </li>
        ))}
      </ul>
      <button onClick={handleClearBasket}>Clear Basket</button>
    </div>
  );
}
