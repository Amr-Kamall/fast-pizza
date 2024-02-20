import { useDispatch } from 'react-redux';
import { decreaseItemQuantity, increaseItemQuantity } from './cartSlice';

function UpdateItemQuantity({ pizzaId, currentQuantity }) {
  const dispatch = useDispatch();
  return (
    <div className="flex gap-1 md:gap-2">
      <button
        onClick={() => dispatch(increaseItemQuantity(pizzaId))}
        className=" mt-10 inline-block rounded-full bg-yellow-500 px-2 py-1 text-xs font-semibold uppercase text-stone-800  transition-all duration-200 hover:bg-yellow-300 focus:outline-none focus:ring focus:ring-yellow-300 focus:ring-offset-2 disabled:cursor-not-allowed sm:px-4 sm:py-2 sm:text-sm md:px-4 "
      >
        +
      </button>
      <span className="mt-11 font-bold">{currentQuantity}</span>
      <button
        onClick={() => dispatch(decreaseItemQuantity(pizzaId))}
        className=" mt-10 inline-block rounded-full bg-yellow-500 px-2 py-1 text-xs font-semibold uppercase text-stone-800  transition-all duration-200 hover:bg-yellow-300 focus:outline-none focus:ring focus:ring-yellow-300 focus:ring-offset-2 disabled:cursor-not-allowed sm:px-4 sm:py-2 sm:text-sm md:px-4 "
      >
        -
      </button>
    </div>
  );
}

export default UpdateItemQuantity;
