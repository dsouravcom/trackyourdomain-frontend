import Image from "next/image";
const Navbar=()=>{
    return(
        <div className="flex justify-center w-full">
            <Image
                src="/images/logo.png"
                alt=""
                // layout="responsive"
                className="m-auto"
                height={400}
                width={400}
            />
        </div>
    );
}
export default Navbar;