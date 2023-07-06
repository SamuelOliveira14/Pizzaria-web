"use client";
import "@/styles/globals.css";
import Image from "next/image";
import backgroundImage from "../../public/Ending.PNG";
import { useRouter } from "next/router";

function NFE() {
  const router = useRouter();
  const handleHome = () => {
    router.push("/login");
  };
  const handleMenu = () => {
    router.push("/menu");
  };
  return (
    <div className="h-[759px] overflow-hidden">
      <Image
        className="static"
        src={backgroundImage}
        width={1890}
        height={1080}
        alt="RED"
      />
      <div className="w-1/3 h-full p-24 bg-white absolute top-0 right-0" />
      <div className="w-[450px] px-9 py-12 text-black bg-white absolute top-[22%] right-[20%] rounded-lg shadow-lg text-center">
        <h1 className="text-3xl font-bold mb-7">
          Pedido registrado!
        </h1>
        <p className="text-gray-400 mb-4">Em breve um de nossos entregadores irá chegar até seu endereço para entregar um pedido mais que especial!</p>
        <div className="flex flex-row gap-4 mt-2">
          <button
            className="mx-2 w-full text-white bg-red-600 border-solid border-white border-[1px] p-3 rounded-md"
            onClick={handleHome}
          >
            Home
          </button>
          <button
            className="mx-2 w-full text-red-600 bg-white border-solid border-red-600 border-[1px] p-3 rounded-md"
            onClick={handleMenu}
          >
            Menu
          </button>
        </div>
      </div>
    </div>
  );
}

export default NFE;
