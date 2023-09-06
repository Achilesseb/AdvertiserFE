export const NavigationBar = () => {
  return (
    <nav className="w-full grid grid-cols-4 items-center bg-primary-50 p-3 text-white">
      <a href="/" className="p-2 mr-4 inline-flex items-center no-underline">
        <svg
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
          className="h-8 w-8 mr-2"
          fill="white"
        >
          <path d="M12.001 4.8c-3.2 0-5.2 1.6-6 4.8 1.2-1.6 2.6-2.2 4.2-1.8.913.228 1.565.89 2.288 1.624C13.666 10.618 15.027 12 18.001 12c3.2 0 5.2-1.6 6-4.8-1.2 1.6-2.6 2.2-4.2 1.8-.913-.228-1.565-.89-2.288-1.624C16.337 6.182 14.976 4.8 12.001 4.8zm-6 7.2c-3.2 0-5.2 1.6-6 4.8 1.2-1.6 2.6-2.2 4.2-1.8.913.228 1.565.89 2.288 1.624 1.177 1.194 2.538 2.576 5.512 2.576 3.2 0 5.2-1.6 6-4.8-1.2 1.6-2.6 2.2-4.2 1.8-.913-.228-1.565-.89-2.288-1.624C10.337 13.382 8.976 12 6.001 12z" />
        </svg>
        <span className="text-xl text-white font-bold uppercase tracking-wide">
          Advertiser
        </span>
      </a>

      <div
        className="top-navbar w-full lg:inline-flex lg:flex-grow lg:w-auto col-start-3 col-end-5 "
        id="navigation"
      >
        <ul className="lg:inline-flex lg:flex-row lg:ml-auto lg:w-auto flex w-full h-full m-0 lg:items-center lg:h-auto justify-evenly ">
          <li>
            <a
              href="#"
              className="lg:inline-flex lg:w-auto w-full px-3 py-2 rounded text-white text-xl items-center justify-center hover:bg-gray-900 hover:text-white no-underline"
            >
              <span>Home</span>
            </a>
          </li>
          <li>
            <a
              href="#"
              className="lg:inline-flex lg:w-auto w-full px-3 py-2 rounded text-white text-xl items-center justify-center hover:bg-gray-900 hover:text-white no-underline"
            >
              <span>About</span>
            </a>
          </li>
          <li>
            <a
              href="/drivers"
              className="lg:inline-flex lg:w-auto w-full px-3 py-2 rounded text-white text-xl items-center justify-center hover:bg-gray-900 hover:text-white no-underline"
            >
              <span>Drivers</span>
            </a>
          </li>
          <li>
            <a
              href="/devices"
              className="lg:inline-flex lg:w-auto w-full px-3 py-2 rounded text-white text-xl items-center justify-center hover:bg-gray-900 hover:text-white no-underline"
            >
              <span>Devices</span>
            </a>
          </li>
          <li>
            <a
              href="#"
              className="lg:inline-flex lg:w-auto w-full px-3 py-2 rounded text-white text-xl items-center justify-center hover:bg-gray-900 hover:text-white no-underline"
            >
              <span>Products</span>
            </a>
          </li>
          <li>
            <a
              href="#"
              className="lg:inline-flex lg:w-auto w-full px-3 py-2 rounded text-white text-xl items-center justify-center hover:bg-gray-900 hover:text-white no-underline"
            >
              <span>Contact Us</span>
            </a>
          </li>
        </ul>
      </div>
    </nav>
  );
};
