"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export default function ArticlePage() {
  const router = useRouter();
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate authentication check (Replace with real auth logic)
    const user = localStorage.getItem("user"); // Example: Using localStorage

    if (user) {
      setIsAuthenticated(true);
    } else {
      router.push("/signin"); // Redirect to Sign In page if not authenticated
    }

    setLoading(false);
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        Loading...
      </div>
    );
  }

  if (!isAuthenticated) {
    return null; // Prevents flash of content before redirect
  }

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-md w-96 text-center">
        <h2 className="text-2xl font-bold text-gray-700">Private Article 📰</h2>
        <p className="text-gray-600 mt-2">
          This article is private and only accessible to logged-in users.
        </p>

        <button
          onClick={() => {
            localStorage.removeItem("user"); // Example: Logging out
            router.push("/signin");
          }}
          className="mt-4 w-full bg-red-500 text-white py-2 rounded-lg hover:bg-red-600 transition duration-200"
        >
          Logout
        </button>
      </div>
    </div>
  );
}
