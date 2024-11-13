'use client'; // Ensure this is a client-side component

import { useParams } from 'next/navigation';
import Navbar from '../components/Navbar';
import data from '../components/Data';
import { useEffect, useState } from 'react';
import { TbWorldWww } from "react-icons/tb";
import { MdOutlineSecurity } from "react-icons/md";

interface DomainDetails {
  websiteName: string;
  websitePreview: string;
  creationDate: string;
  updationDate: string;
  expirationDate: string;
  purchasedFrom: string;
  managedBy: {
    provider: string;
    sslStatus: string;
    sslProvider: string;
    sslIssuedOn: string;
    sslExpiresOn: string;
  };
}

const Page = () => {
  // Access the dynamic slug from the URL
  const { slug } = useParams();
  const [domain, setDomain] = useState<DomainDetails | null>(null);

  useEffect(() => {
    const foundItem = data.find((item) => item.websiteName === slug);
    if (foundItem) {
      console.log(foundItem);
      setDomain(foundItem);
    }
  }, []);

  return (
    <div className='m-auto px-5 pb-10'>
      <Navbar />
      <div className='container rounded-md w-full sm:w-[70vw] m-auto border border-slate-500'>
        <h1 className='text-slate-50 rounded-t-md p-2 text-2xl bg-slate-700 border-slate-700 text-center font-semibold '>{slug}</h1>
        
        <div className='mt-1 py-2 px-4 bg-slate-800'>
          <h2 className='text-slate-50 text-xl flex items-center gap-2 p-2 border-b'>
            <TbWorldWww className='text-slate-50 font-extralight mt-0.5' />
            Domain Information
          </h2>

          <table className='text-slate-200 w-full sm:w-[50%] py-2 mt-2 text-left'>
            <tbody>
              <tr className=' border-slate-700'>
                <td className='py-1 pr-4 font-semibold'>Domain:</td>
                <td className='py-1 text-left w-[50%]'>{slug}</td>
              </tr>
              <tr className=' border-slate-700'>
                <td className='py-1 pr-4 font-semibold'>Creation Date:</td>
                <td className='py-1 text-left w-[50%]'>{domain?.creationDate}</td>
              </tr>
              <tr className=' border-slate-700'>
                <td className='py-1 pr-4 font-semibold'>Updation Date:</td>
                <td className='py-1 text-left w-[50%]'>{domain?.updationDate}</td>
              </tr>
              <tr className=' border-slate-700'>
                <td className='py-1 pr-4 font-semibold'>Expiration Date:</td>
                <td className='py-1 text-left w-[50%]'>{domain?.expirationDate}</td>
              </tr>
              <tr className=' border-slate-700'>
                <td className='py-1 pr-4 font-semibold'>Purchased From:</td>
                <td className='py-1 text-left w-[50%]'>{domain?.purchasedFrom}</td>
              </tr>
            </tbody>
          </table>
        </div>

        <div className='mt-1 py-2 px-4 bg-slate-800'>
          <h2 className='text-slate-50 text-xl flex items-center gap-2 p-2 border-b'>
            <MdOutlineSecurity className='text-slate-50 font-extralight mt-0.5' />
            SSL Information
          </h2>

          <table className='text-slate-200 w-full sm:w-[50%] py-2 mt-2 text-left'>
            <tbody>
              <tr className=' border-slate-700'>
                <td className='py-1 pr-4 font-semibold'>Provider:</td>
                <td className='py-1 text-left w-[50%]'>{domain?.managedBy.provider}</td>
              </tr>
              <tr className=' border-slate-700'>
                <td className='py-1 pr-4 font-semibold'>SSL Status:</td>
                <td className='py-1 text-left w-[50%]'>{domain?.managedBy.sslStatus}</td>
              </tr>
              <tr className=' border-slate-700'>
                <td className='py-1 pr-4 font-semibold'>SSL Provider:</td>
                <td className='py-1 text-left w-[50%]'>{domain?.managedBy.sslProvider}</td>
              </tr>
              <tr className=' border-slate-700'>
                <td className='py-1 pr-4 font-semibold'>SSL Issue Date:</td>
                <td className='py-1 text-left w-[50%]'>{domain?.managedBy.sslIssuedOn}</td>
              </tr>
              <tr className=' border-slate-700'>
                <td className='py-1 pr-4 font-semibold'>SSL Expiration Date:</td>
                <td className='py-1 text-left w-[50%]'>{domain?.managedBy.sslExpiresOn}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Page;
