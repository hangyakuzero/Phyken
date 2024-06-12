"use client";
import React from 'react';
import Image from 'next/image';

export default function Navbar() {
  return (
    <div className="navbar fixed top-0 bg-base-100 bg-green-400 h-16"> {/* Set a fixed height for the navbar */}
      <div className="flex-1 flex items-center"> {/* Center align items vertically */}
        <div className="h-full flex items-center"> {/* Flex container for vertical alignment */}
          <Image  src="/phyk.png" width={80} height={80} alt="test"/> {/* Adjust the width and height */}
        </div>
        <a className="btn btn-ghost text-3xl " href="/" style={{ marginLeft: '-24px' }}>PHYKEN</a> {/* Decreased margin-left */}
      </div>
      <div className="flex-none">
        <ul className="menu menu-horizontal px-1">
          <li><a href="/mint">Mint</a></li>
          <li><a href="https://phyken.network/">Know More</a></li>
         
        </ul>
      </div>
    </div>
  );
}
