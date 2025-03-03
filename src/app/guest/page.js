"use client";

import { useRouter } from "next/navigation";

export default function GuestPage() {
  const router = useRouter();

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-md w-96 text-center">
        <h2 className="text-2xl font-bold text-gray-700">
          Welcome to Our App! 👋
        </h2>
        <p className="text-gray-600 mt-2">
          You are currently browsing as a guest. Feel free to explore or sign in
          for more features.
        </p>

        <div className="mt-6">
          <button
            onClick={() => router.push("/signin")}
            className="w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600 transition duration-200 mb-2"
          >
            Sign In
          </button>
          <button
            onClick={() => router.push("/signup")}
            className="w-full bg-green-500 text-white py-2 rounded-lg hover:bg-green-600 transition duration-200"
          >
            Sign Up
          </button>
        </div>
      </div>
    </div>
  );
}
