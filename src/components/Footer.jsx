import React from "react";

const Footer = () => {
  return (
    <footer className="mt-auto w-full max-w-[85rem] py-10 px-4 sm:px-6 lg:px-8 mx-auto border-t-2">
      <div className="text-center">
        <div>
          <a
            className="flex-none text-xl font-semibold text-black dark:text-white"
            href="#"
            aria-label="Brand"
          >
            New Ganesh Kirana Store
          </a>
        </div>

        <div className="mt-3">
          <p className="text-gray-500 dark:text-neutral-500">
            North Mandiri Near Devi Asthan
          </p>
          <p className="text-gray-500 dark:text-neutral-500">Patna</p>
          <p className="text-gray-500 dark:text-neutral-500">Pin-800001</p>
          <p className="text-gray-500 dark:text-neutral-500">
            Contact No. : 8986056550
          </p>
          <p className="text-gray-500 dark:text-neutral-500">
            Email: sitakumari605577@gmil.com
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
