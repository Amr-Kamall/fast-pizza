import { Outlet, useNavigation } from 'react-router-dom';
import CartOverview from '../features/cart/CartOverview';
import Header from './Header';
import Loader from './Loader';

function AppLayOut() {
  const navigation = useNavigation();
  const isLoading = navigation.state === 'loading';
  return (
    <div className=" grid h-screen grid-rows-[auto_1fr_auto]">
      {isLoading && <Loader />}
      <Header />
      <main className="">
        <Outlet />
      </main>
      <CartOverview />
    </div>
  );
}

export default AppLayOut;
