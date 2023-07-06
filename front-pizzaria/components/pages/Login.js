"use client";
import Image from "next/image";
import loginImage from "../../components/images/login-image.jpg";
import { useState } from "react";

function Login() {
  return (
    <div className="h-[648px] overflow-hidden">
      <Image
        className="static"
        src={loginImage}
        width={1890}
        height={1080}
        alt="RED"
      />
      <div className="w-1/3 h-full p-24 bg-white absolute top-0 right-0"/>
      <div className="w-[450px] h-[400px] px-9 py-12 text-black bg-white absolute top-[22%] right-[20%] rounded-lg shadow-lg text-center">
        <h1 className="text-3xl font-bold mb-7">
          Falta pouco para matar sua fome!
        </h1>
        <p className="text-gray-400 mb-4">Entre com seus dados ou cadastre</p>
        <div className="mx-2 mb-2 bg-white border-solid border-gray-400 border-[1px] p-2 rounded-md">
          <input className="w-full" placeholder="Login" />
        </div>
        <div className="mx-2 mb-4 bg-white border-solid border-gray-400 border-[1px] p-2 rounded-md">
          <input className="w-full" placeholder="Senha" />
        </div>
        <div className="flex flex-row gap-4">
          <div className="mx-2 w-full text-white bg-red-600 border-solid border-white border-[1px] p-3 rounded-md">
            <p>Entrar</p>
          </div>
          <div className="mx-2 w-full text-red-600 bg-white border-solid border-red-600 border-[1px] p-3 rounded-md">
            <p>Registrar</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;
