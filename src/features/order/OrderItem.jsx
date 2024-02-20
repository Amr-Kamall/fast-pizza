import { formatCurrency } from '../../utilities/helpers';

function OrderItem({ item, isLoadingIngredients, ingredients }) {
  const { quantity, name, totalPrice } = item;
  console.log(ingredients);
  console.log(isLoadingIngredients);
  return (
    <li className="py-3">
      <div className="flex items-center justify-between gap-5 text-sm">
        <p>
          <span className="font-bold">{quantity}&times;</span> {name}
        </p>
        <p className="font-bold">{formatCurrency(totalPrice)}</p>
      </div>
      <p className="py-1 text-sm capitalize italic text-stone-500">
        {isLoadingIngredients ? 'loading...' : ingredients?.join(', ')}
      </p>
    </li>
  );
}

export default OrderItem;
