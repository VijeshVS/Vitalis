import React from 'react'
import Image from 'next/image'
const Navbar = () => {
  return (
    <div className='flex flex-row shadow-xl shadow-black justify-between bg-white'>
      <div className='flex flex-row justify-center items-center p-2 ml-6 text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-teal-600'>
        <Image src={'/logo.png'} height={50} width={50} alt='logo'></Image>
        VITALIS
    </div>
    </div>
  )
}

export default Navbar
