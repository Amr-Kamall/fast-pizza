import { useLoaderData } from 'react-router-dom';
// import { getMenu } from "../../services/apiRestaurant";
import MenuItem from './MenuItem';

const API_URL = 'https://react-fast-pizza-api.onrender.com/api';

function Menu() {
  const menu = useLoaderData();
  return (
    <ul className="divide-y divide-stone-200 px-2">
      {menu.map((menu) => (
        <MenuItem pizza={menu} key={menu.id} />
      ))}
    </ul>
  );
}

export async function getLoader() {
  const res = await fetch(`${API_URL}/menu`);
  const { data } = await res.json();
  return data;
}

// export async function loader() {
//   const menu = await getMenu();
//   return menu;
// }

export default Menu;
