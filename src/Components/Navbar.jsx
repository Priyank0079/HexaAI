import React from 'react'
import { MdSunny } from "react-icons/md";
import { FaUserInjured } from "react-icons/fa";
import { AiFillSetting } from "react-icons/ai";
import { GiSixEyes } from "react-icons/gi";
const Navbar = () => {
  return (
    <>
      <div className="nav flex  items-center justify-between px-[100px]  h-[90px] border-b-[1px] border-gray-800 ">

 <div className="logo  flex justify-start  "> 
     <span className='pl-0 pt-1 main-logo pr-2'><GiSixEyes /> </span>
    <h1 className='text-[25px]  font-extrabold sp-text' >  HEXA AI  </h1> </div>

<div className="icons flex items-center gap-[15px]">
  <div className="icon ">  <MdSunny/></div>
  <div className="icon "> <FaUserInjured /> 
 </div>
 <div className="icon "> <AiFillSetting />
 </div>
</div>

      </div>

    </>
  )
  
}

export default Navbar
