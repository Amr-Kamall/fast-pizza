import LinkButton from '../../ui/LinkButton';
import CartItem from './CartItem';
import { useDispatch, useSelector } from 'react-redux';
import Button from '../../ui/Button';
import { clearCart, getCart, getTotalCartQuantity } from './cartSlice';
import EmptyCart from './EmptyCart';

// const fakeCart = [
//   {
//     pizzaId: 12,
//     name: 'Mediterranean',
//     quantity: 2,
//     unitPrice: 16,
//     totalPrice: 32,
//   },
//   {
//     pizzaId: 6,
//     name: 'Vegetale',
//     quantity: 1,
//     unitPrice: 13,
//     totalPrice: 13,
//   },
//   {
//     pizzaId: 11,
//     name: 'Spinach and Mushroom',
//     quantity: 1,
//     unitPrice: 15,
//     totalPrice: 15,
//   },
// ];

function Cart() {
  const totalCartQuantity = useSelector(getTotalCartQuantity);
  const dispatch = useDispatch();
  function handleClearAll() {
    dispatch(clearCart());
  }

  const username = useSelector((state) => state.user.username);

  const shoppingCart = useSelector(getCart);

  if (!totalCartQuantity) return <EmptyCart />;
  return (
    <div className="px-4 py-3">
      <LinkButton to="/menu">&larr; Back to menu</LinkButton>

      <h2 className="mt-7 text-xl font-semibold">Your cart, {username}</h2>

      <ul className="mt-4">
        {shoppingCart.map((item) => (
          <CartItem item={item} key={item.pizzaId} />
        ))}
      </ul>

      <div className="space-x-3">
        <Button to="/order/new">Order pizzas</Button>
        <Button type="secondary" onClick={handleClearAll}>
          Clear cart
        </Button>
      </div>
    </div>
  );
}

export default Cart;
