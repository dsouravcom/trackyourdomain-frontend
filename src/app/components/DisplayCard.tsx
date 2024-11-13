import { useRouter } from "next/navigation";
const DisplayCard=(item:any)=>{
    const router = useRouter();
    // console.log("item->>>>>>",item);
    return(
        <div className="w-full p-5 bg-slate-800 rounded sm:w-fit hover:cursor-pointer border-slate-700 border" onClick={()=>router.push(`/${item.item.websiteName}`)}>
            <h1 className="text-slate-100 text-center">{item.item.websiteName}</h1>
        </div>
    );
}
export default DisplayCard;