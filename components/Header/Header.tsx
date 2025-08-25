import { Search, Package, User, Heart, ShoppingCart } from 'lucide-react';
import Link from 'next/link';

const navItems = [
  {
    icon: User,
    href: '/me/my',
    label: 'Профиль',
  },
  {
    icon: Package,
    href: '/my/orderlist',
    label: 'Заказы',
  },
  {
    icon: Heart,
    href: 'my/favorites',
    label: 'Избранное',
  },
  {
    icon: ShoppingCart,
    href: '/cart',
    label: 'Корзина',
  },
];
{/*sm:>=640  md:>=768  lg:>=1024 */}
const Header = () => {
  return (
    <header className="h-20 pt-2  w-full mx-auto lg:max-w-[1720px] to-blue-200 rounded-b-lg">
      <div className="flex gap-x-5 justify-center w-[90%] mx-auto items-center">
        <Link
          target=''
          href="/"
          className="text-blue-700 text-sm md:text-2xl lg:text-4xl cursor-pointer transition-colors hover:text-blue-500 font-bold"
        >
          MAX - E
        </Link>
        <button
          className="px-6 py-2 cursor-pointer hover:bg-blue-500 lg:text-xl font-semibold flex items-center justify-center transition duration-100 rounded-lg bg-blue-600 text-white"
          type="button"
        >
          Каталог
        </button>
        <div className="flex w-[720px] flex items-center rounded-lg bg-blue-600 overflow-hidden h-[47px]">
          <input
            type="search"
            className="bg-white rounded-lg focus:outline-none focus:pr-2  text-[20px] ml-[2px] pl-4 text-gray-500 w-[700px] m-[2px] h-[44px]"
            placeholder="Искать на max-e"
          ></input>
          <button
            type="button"
            className="w-18 flex align-center justify-center items-center cursor-pointer hover:bg-blue-500 h-[90%] transition duration-100 rounded-lg"
          >
            <Search className="text-white" strokeWidth={3} />
          </button>
        </div>

        <div className="flex cursor-pointer gap-x-4">
          {navItems.map(({ href, icon: Icon, label }) => (
            <div
              key={href}
              className={` ${Icon !== User ? 'hidden' : ''} lg:block lg:text-sm flex text-gray-600 group flex-col items-center`}
            >
              <Link className="flex flex-col items-center transition duration-200 group-hover:text-blue-700" href={href}>
                <Icon />
                <button className="group-hover:text-blue-700"></button>
                {label}
              </Link>
            </div>
          ))}
        </div>
      </div>
    </header>
  );
};

export default Header;