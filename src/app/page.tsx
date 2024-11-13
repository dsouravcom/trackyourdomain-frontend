'use client'
import Image from "next/image";
import Navbar from "./components/Navbar";
import { IoSearch } from "react-icons/io5";
import { useState, useEffect } from "react";
import data from "./components/Data";
import DisplayCard from "./components/DisplayCard";
import { IoMdAdd } from "react-icons/io";
const Home = () => {

  const [selected, setSelected] = useState(false);
  const [search,setSearch] = useState("");

  useEffect(() => {
    // console.log(data[1].websiteName);
  }, []);


  const handleChange=(e:any)=>{
      setSearch(e);
      console.log(search);
  }

  return (
    <div className="px-5 m-auto">
      <Navbar />

      <div className="bg-[#222838] p-4 h-fit   sm:w-[550px]  md:w-[550px] w-full rounded-md border border-slate-600 shadow-xl m-auto p-2">
        <h4 className="text-slate-300 font-sans">Add your domain</h4>
        <div className={`flex items-center bg-[#111827] rounded mt-4 border border-slate-700 ${selected ? "shadow-[0_0_2px_#fff,inset_0_0_2px_#fff,0_0_5px_#1e325f,0_0_15px_#08f,0_0_30px_#1e325f]" : ""}`}>
          <input type="text" className="rounded p-2 text-slate-100 w-full focus:outline-0 bg-[#111827]" onFocus={() => setSelected(true)} onBlur={() => setSelected(false)} />
          <IoMdAdd  className="text-slate-100 m-1 p-1 items-center rounded text-4xl bg-[#222838] hover:cursor-pointer hover:text-[#111827] transition hover:border" />

        </div>
      </div>

      <div className="flex flex-col sm:flex-row items-center justify-between mt-10 px-10 m-auto">
        <h2 className="text-white mt-5 text-2xl px-4 font-semibold ">Your domains</h2>
        



        <div className={`flex items-center w-[90%] bg-[#111827] rounded mt-4 border border-slate-700 sm:w-96`}>
          <input placeholder="Search your domain" type="text" className="rounded p-2 text-slate-100 w-full focus:outline-0 bg-[#111827]" onChange={(e)=>handleChange(e.target.value)} value={search} />
          <IoSearch className="text-slate-100 m-1 p-1 items-center rounded text-4xl bg-[#222838] hover:cursor-pointer hover:text-[#111827] transition hover:border" />

        </div>





        
      </div>
      <div className="flex justify-center p-5 mt-5  md:mx-2 gap-5 flex-wrap">
        {data && data.map((item, index) =>


          <DisplayCard item={item} key={index} />

        )
        }
      </div>


    </div>
  );
}
export default Home;