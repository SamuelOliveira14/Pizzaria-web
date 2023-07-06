"use client";
import Link from "next/link";

function Login() {
  return (
    <main>
      <Link className="m-auto p-4 font-bold bg-red-600 rounded-md absolute top-1/2 right-1/2" href={'/login'}> Começar projeto </Link>
    </main>
  );
}

export default Login;
