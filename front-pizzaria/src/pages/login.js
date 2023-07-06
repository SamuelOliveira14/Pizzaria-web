"use client";
import "@/styles/globals.css";
import Image from "next/image";
import loginImage from "../../components/images/login-image.jpg";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";

function Login() {
  const router = useRouter();
  const urlApi = "https://041b-177-99-123-24.ngrok-free.app";
  const [login, setLogin] = useState("");
  const [password, setPassword] = useState("");
  const [canAccess, setCanAccess] = useState([]);
  const [wrongCredentials, setWrongCredentials] = useState(false);
  const handleLogin = (event) => {
    setLogin(event.target.value);
  };
  const handlePassword = (event) => {
    setPassword(event.target.value);
  };
  const postLogin = () => {
    const axios = require("axios");
    let data = JSON.stringify({
      email: login,
      password: password,
    });

    let config = {
      method: "post",
      maxBodyLength: Infinity,
      url: `${urlApi}/login`,
      headers: {
        "Content-Type": "application/json",
        "ngrok-skip-browser-warning": "69420",
      },
      data: data,
    };

    axios
      .request(config)
      .then((response) => {
        setCanAccess(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };
  const handleEnter = () => {
    postLogin();
  };
  const handleRegister = () => {
    router.push(
      {
        pathname: "/register",
        query: {
          myData: JSON.stringify({ urlApi: urlApi, email: login, password: password }),
        },
      },
      "/register"
    );
  };
  useEffect(() => {
    if (canAccess.status === "Logged") {
      router.push(
        {
          pathname: "/menu",
          query: {
            myData: JSON.stringify({ urlApi: urlApi }),
          },
        },
        "/menu"
      );
    } else if (canAccess.error === "Wrong credentials") {
      setWrongCredentials(true);
    } else {
      console.log(canAccess);
    }
  }, [canAccess]);
  return (
    <div className="h-[759px] overflow-hidden">
      <Image
        className="static"
        src={loginImage}
        width={1890}
        height={1080}
        alt="RED"
      />
      <div className="w-1/3 h-full p-24 bg-white absolute top-0 right-0" />
      <div className="w-[450px] px-9 py-12 text-black bg-white absolute top-[22%] right-[20%] rounded-lg shadow-lg text-center">
        <h1 className="text-3xl font-bold mb-7">
          Falta pouco para matar sua fome!
        </h1>
        <p className="text-gray-400 mb-4">Entre com seus dados ou cadastre</p>
        <div
          className={`[&>label]:focus-within:-translate-y-4 [&>label]:focus-within:text-xs [&>label]:focus-within:text-black  mx-2 mb-2 bg-white border-solid border-gray-400 border-[1px] p-2 rounded-[4px] relative flex flex-col ${
            wrongCredentials ? "border-solid border-red-600 border-[1px]" : ""
          } `}
        >
          <input
            className="w-full focus:outline-none"
            onChange={handleLogin}
            type="text"
          />
          <label
            className={`pointer-events-none absolute transition-transform ${
              login ? "-translate-y-4 text-xs text-black" : "text-gray-400"
            } bg-white px-1`}
          >
            Login
          </label>
        </div>
        <div
          className={`[&>label]:focus-within:-translate-y-4 [&>label]:focus-within:text-xs [&>label]:focus-within:text-black  mx-2 bg-white border-solid border-gray-400 border-[1px] p-2 rounded-[4px] relative flex flex-col ${
            wrongCredentials ? "border-solid border-red-600 border-[1px]" : ""
          } `}
        >
          <input
            className="w-full focus:outline-none"
            onChange={handlePassword}
            type="text"
          />
          <label
            className={`pointer-events-none absolute transition-transform ${
              password ? "-translate-y-4 text-xs text-black" : "text-gray-400"
            } bg-white px-1`}
          >
            Senha
          </label>
        </div>
        <button
          className="m-auto text-xs text-red-600 mt-2 bg-white p-1 pointer-events-none"
          hidden={!wrongCredentials}
        >
          Login ou senha errados.
          <br />
          Tente novamente.
        </button>
        <div className="flex flex-row gap-4 mt-2">
          <button
            className="mx-2 w-full text-white bg-red-600 border-solid border-white border-[1px] p-3 rounded-md"
            onClick={handleEnter}
          >
            Entrar
          </button>
          <button
            className="mx-2 w-full text-red-600 bg-white border-solid border-red-600 border-[1px] p-3 rounded-md"
            onClick={handleRegister}
          >
            Registrar
          </button>
        </div>
      </div>
    </div>
  );
}

export default Login;
