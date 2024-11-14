import React from "react";
import { FaRegCopyright } from "react-icons/fa";
import Image from "next/image";
const Footer = () => {
    return (
        <div className="fixed bottom-0 w-full bg-gradient-to-r from-teal-950 via-teal-800 to-teal-400 p-2">
            <div className="flex flex-row space-x-1 justify-center items-center">
                <Image
                    src={"/whitelogo.png"}
                    height={30}
                    width={30}
                    alt="logo"
                ></Image>
                <div className="text-white font-bold">VITALIS</div>
            </div>
            <div className="flex flex-row justify-center items-center  space-x-2">
                <p>Copyright</p> <FaRegCopyright />{" "}
                <p>2024, Cogito Ergo Sum. All rights reserved.</p>
            </div>
        </div>
    );
};

export default Footer;
