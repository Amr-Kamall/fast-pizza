// Test ID: IIDSAT
import { useFetcher, useLoaderData } from 'react-router-dom';
import {
  calcMinutesLeft,
  formatCurrency,
  formatDate,
} from '../../utilities/helpers';
import { getOrder } from '../../services/apiRestaurant';
import OrderItem from './OrderItem';
import { useEffect } from 'react';

// const API_URL = 'https://react-fast-pizza-api.onrender.com/api';

function Order() {
  const order = useLoaderData();
  // console.log(order);
  // Everyone can search for all orders, so for privacy reasons we're gonna gonna exclude names or address, these are only for the restaurant staff

  const fetcher = useFetcher();

  useEffect(
    function () {
      if (!fetcher.data && fetcher.state === 'idle') {
        fetcher.load('/menu');
      }
    },
    [fetcher],
  );

  const {
    id,
    status,
    priority,
    priorityPrice,
    orderPrice,
    estimatedDelivery,
    cart,
  } = order;
  const deliveryIn = calcMinutesLeft(estimatedDelivery);

  return (
    <div className=" space-y-8 px-4 py-6">
      <div className="items:center flex flex-wrap justify-between gap-5">
        <h2 className="text-xl font-semibold">order #{id} Status</h2>
        <div className="space-x-2">
          {priority && (
            <span className="rounded-full bg-red-500 px-4 py-1 text-sm font-semibold uppercase text-red-100">
              Priority
            </span>
          )}
          <span className="rounded-full bg-green-500 px-4 py-1 text-sm font-semibold uppercase text-green-100">
            {status} order
          </span>
        </div>
      </div>

      <div className="items:center flex flex-wrap justify-between gap-5 bg-stone-200 px-6 py-5">
        <p className="text-sm text-stone-500">
          {deliveryIn >= 0
            ? `Only ${calcMinutesLeft(estimatedDelivery)} minutes left 😃`
            : 'Order should have arrived'}
        </p>
        <p>(Estimated delivery: {formatDate(estimatedDelivery)})</p>
      </div>

      <ul className="divide-y divide-stone-200 border-b border-t ">
        {cart.map((item) => (
          <OrderItem
            isLoadingIngredients={fetcher.state === 'loading'}
            item={item}
            key={item.pizzaId}
            ingredients={
              fetcher?.data?.find((el) => el.id === item.pizzaId).ingredients
            }
          />
        ))}
      </ul>

      <div className="space-y-2 bg-stone-200 px-6 py-5">
        <p className="text-sm font-medium">
          Price pizza: {formatCurrency(orderPrice)}
        </p>
        {priority && (
          <p className="text-sm font-medium">
            Price priority: {formatCurrency(priorityPrice)}
          </p>
        )}
        <p className=" font-bold">
          To pay on delivery: {formatCurrency(orderPrice + priorityPrice)}
        </p>
      </div>
    </div>
  );
}

// export async function loader({ params }) {
//   const orderId = params.orderId;
//   const res = await fetch(`${API_URL}/order/${orderId}`);
//   const data = await res.json();
//   return data;
// }

export async function loader({ params }) {
  const userId = params.orderId;
  const order = getOrder(userId);
  return order;
}

export default Order;
