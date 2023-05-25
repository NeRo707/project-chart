import { Button } from "antd";
import Link from "next/link";
import React, { useState } from "react";

const Navbar = () => {
  return (
    <div className="flex justify-around items-center sticky text-center z-10 w-full h-16 bg-white border border-b-2 border-b-blue-500">
      <Link href={"/"}>
        <img
          src="https://static.vecteezy.com/system/resources/previews/003/731/316/original/web-icon-line-on-white-background-image-for-web-presentation-logo-icon-symbol-free-vector.jpg"
          alt="logoimg"
          className="object-contain w-14 max-w-2 cursor-pointer block"
        />
      </Link>

      <Link href={"/chart"}>
        <Button type="default" className="ant-btn-lg" onClick={() => {}}>
          Chart
        </Button>
      </Link>
    </div>
  );
};

export default Navbar;
