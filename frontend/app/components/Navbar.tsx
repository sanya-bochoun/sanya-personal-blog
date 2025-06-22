import React from 'react';
import Image from 'next/image';

const Navbar = () => {
  return (
    <nav className="fixed top-0 left-0 w-[375px] h-[48px] flex justify-between items-center px-6 py-3 border-b border-[#DAD6D1]">
      <Image
        src="/logo.svg"
        alt="Logo"
        width={24}
        height={24}
        className="object-contain"
      />
      <Image
        src="/assets/menu-berger.png"
        alt="Menu"
        width={24}
        height={24}
        className="object-contain cursor-pointer"
      />
    </nav>
  );
};

export default Navbar; 