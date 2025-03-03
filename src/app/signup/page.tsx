"use client";

import { useEffect, useState } from "react";
import axios from "axios";
import { Toast } from "react-hot-toast/headless";
import { log } from "console";
import toast from "react-hot-toast";
//import { useRouter } from "next/router";
import { useRouter } from "next/navigation";
import Link from "next/link"; // ✅ Correct for App Router

export default function SignUp() {
  const router = useRouter();
  const [user, setUser] = useState({
    email: "",
    password: "",
    username: "",
  });
  const [buttonDisabled, setbuttonDisabled] = useState(false);
  const [loading, setloading] = useState(false);
  const onSignup = async () => {
    try {
      setloading(true);
      const response = await axios.post("/api/users/signup", user);
      console.log("Signup Successfully", response.data);
      router.push("/login");
    } catch (error: any) {
      console.log("signup failed");
      toast.error(error.message);
    }
  };
  useEffect(() => {
    if (
      user.email.length > 0 &&
      user.password.length > 0 &&
      user.username.length > 0
    ) {
      setbuttonDisabled(false);
    } else {
      setbuttonDisabled(true);
    }
  }, [user]);
  return (
    <div
      className="flex flex-col items-center
  justify-center ,im-h-screen py-2"
    >
      <h1>{loading ? "proccessing" : "signup"}</h1>
      <hr />
      <label htmlFor="username">username</label>
      <input
        className="p-2 border border-gray-300 rounded-lg mg-4 focus:outline-none focus: border-gray-600 text-black"
        id="username"
        value={user.username}
        onChange={(e) => setUser({ ...user, username: e.target.value })}
        placeholder="username"
        type="text"
      />{" "}
      <label htmlFor="email">email</label>
      <input
        className="p-2 border border-gray-300 rounded-lg mg-4 focus:outline-none focus: border-gray-600 text-black"
        id="email"
        value={user.email}
        onChange={(e) => setUser({ ...user, email: e.target.value })}
        placeholder="email"
        type="text"
      />{" "}
      <label htmlFor="password">password</label>
      <input
        className="p-2 border border-gray-300 rounded-lg mg-4 focus:outline-none focus: border-gray-600 text-black"
        id="password"
        value={user.password}
        onChange={(e) => setUser({ ...user, password: e.target.value })}
        placeholder="password"
        type="text"
      />
      <hr />
      <button
        onClick={onSignup}
        className="p-2 border border-gray-300 rounded-lg mg-4 focus:outline-none focus: border-gray-600 "
      >
        {buttonDisabled ? "no Signup" : "Signup"}
      </button>
      <hr />
      <Link href="/login">Visit login Page</Link>
    </div>
  );
}
