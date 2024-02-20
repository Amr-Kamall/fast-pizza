import { useState } from 'react';
import { Form, redirect, useActionData, useNavigation } from 'react-router-dom';
import { createOrder } from '../../services/apiRestaurant';
import { useSelector } from 'react-redux';
import Button from '../../ui/Button';
import { clearCart, getCart } from '../cart/cartSlice';
import EmptyCart from '../cart/EmptyCart';
import store from '../../store';
// https://uibakery.io/regex-library/phone-number
const isValidPhone = (str) =>
  /^\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}$/.test(
    str,
  );

function CreateOrder() {
  const username = useSelector((state) => state.user.username);

  const navigation = useNavigation();
  const isSubmitting = navigation.state === 'submitting';
  const formErrors = useActionData();
  // const [withPriority, setWithPriority] = useState(false);
  const cart = useSelector(getCart);
  if (!cart) return <EmptyCart />;

  return (
    <div className="px-4 py-4">
      <h2 className="mb-6 text-xl font-semibold">Ready to order? Let's go!</h2>

      {/* we are doing a post request to do a new order */}
      {/* <Form method="POST" action="/order/new"> */}
      <Form method="POST">
        {' '}
        <div className="mb-7  sm:flex sm:items-center sm:justify-between">
          <label className="mb-2 sm:basis-40 sm:text-[20px]">First Name</label>
          <div className="flex grow">
            <input
              defaultValue={username}
              className="input"
              type="text"
              name="customer"
              required
            />
          </div>
        </div>
        <div className="mb-7 sm:flex sm:items-center sm:justify-between">
          <label className="mb-2 sm:basis-40 sm:text-[19px]">
            phone number
          </label>
          <div className="flex grow flex-col">
            <input className="input" type="tel" name="phone" required />
            {formErrors?.phone && (
              <p className=" mt-2 block rounded-md bg-red-100 p-2 text-xs text-red-700">
                {formErrors.phone}
              </p>
            )}
          </div>
        </div>
        <div className="mb-5 sm:flex sm:items-center sm:justify-between">
          <label className="mb-2 sm:basis-40 sm:text-[20px]">Address</label>
          <div className="flex grow flex-col">
            <input type="text" name="address" required className="input" />
          </div>
        </div>
        <div className="mb-7 flex items-center gap-5">
          <input
            className="h-6 w-6 accent-yellow-400 focus:ring focus:ring-yellow-400 focus:ring-offset-2"
            type="checkbox"
            name="priority"
            id="priority"
            // value={withPriority}
            // onChange={(e) => setWithPriority(e.target.checked)}
          />
          <label className="font-medium" htmlFor="priority">
            Want to yo give your order priority?
          </label>
        </div>
        <div>
          <input type="hidden" name="cart" value={JSON.stringify(cart)} />
          <Button disabled={isSubmitting}>
            {isSubmitting ? 'wait...' : 'Order now'}
          </Button>
        </div>
      </Form>
    </div>
  );
}
//  as soon as we submit the special form here that will then create a request that will basically be =>
//   intercepted by this action function as sooon as it connected by react-router
export async function action({ request }) {
  const formData = await request.formData(); //  formData()  =>  provided by browser
  const data = Object.fromEntries(formData); //convert it to object
  console.log(data); //get the data from the form
  const order = {
    //create a new order object
    ...data,
    cart: JSON.parse(data.cart),
    priority: data.priority === 'on',
  };
  console.log(order);
  const errors = {};
  if (!isValidPhone(order.phone))
    errors.phone =
      'please give us your correct number, we migh need it to contact you';
  if (Object.keys(errors).length > 0) return errors;
  //if everything is ok create a new order and redirect
  const newOrder = await createOrder(order);
  store.dispatch(clearCart());
  return redirect(`/order/${newOrder.id}`); // function by react-router that make a new request
}
//then we need to connect this action to the route
//then whenever there will be a new form submission on this route (path: "/order/new") then this action will be called
//we need to make cart in the form ? => there is a nice way of getting some data into the action without it being a form field => we can do a hidden input anywhere in the form
// the next thing is to connect this URL to action
export default CreateOrder;
