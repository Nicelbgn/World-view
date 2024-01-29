import React from "react";
import Link from 'next/link'


const Navbar = () => {
  return (
    <nav>
      <Link href="/">Home</Link>
      <input type="text" placeholder="Search by name" />
    </nav>
  );
};
export default Navbar