import { Link } from 'react-router-dom';

function Button({ children, disabled, to, type, onClick }) {
  if (onClick)
    return (
      <button
        onClick={onClick}
        className=" mt-10 inline-block rounded-full bg-yellow-500 px-2 py-1 text-xs font-semibold uppercase text-stone-800  transition-all duration-200 hover:bg-yellow-300 focus:outline-none focus:ring focus:ring-yellow-300 focus:ring-offset-2 disabled:cursor-not-allowed sm:px-4 sm:py-2 sm:text-sm md:px-4 "
      >
        {children}
      </button>
    );
  if (type === 'small')
    return (
      <button
        disabled={disabled}
        className=" mt-10 inline-block rounded-full bg-yellow-500 px-2 py-1 text-xs font-semibold uppercase text-stone-800  transition-all duration-200 hover:bg-yellow-300 focus:outline-none focus:ring focus:ring-yellow-300 focus:ring-offset-2 disabled:cursor-not-allowed sm:px-4 sm:py-2 sm:text-sm md:px-4 "
      >
        {children}
      </button>
    );
  if (type === 'secondary')
    return (
      <button
        disabled={disabled}
        className=" inline-block rounded-full border-2 border-stone-300  px-4 py-3 text-xs font-semibold uppercase text-stone-500 transition-all duration-200 hover:bg-stone-300   hover:text-stone-700 focus:outline-none focus:ring focus:ring-stone-300 focus:ring-offset-2 disabled:cursor-not-allowed  sm:px-8  sm:py-4 sm:text-sm  "
      >
        {children}
      </button>
    );

  const className =
    ' mt-5 text-sm inline-block rounded-full bg-yellow-500 px-4 py-3 font-semibold uppercase text-stone-800 transition-all duration-200 hover:bg-yellow-300 focus:outline-none focus:ring focus:ring-yellow-300 focus:ring-offset-2 disabled:cursor-not-allowed sm:px-6 sm:py-4 ';
  if (to)
    return (
      <Link className={className} to={to}>
        {children}
      </Link>
    );

  return (
    <button disabled={disabled} className={className}>
      {children}
    </button>
  );
}

export default Button;
