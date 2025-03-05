"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export default function ArticlePage() {
  const router = useRouter();
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (!token) {
      router.push("/signin"); // Redirect to sign-in if no token found
    } else {
      setIsAuthenticated(true);
    }
  }, [router]);

  if (!isAuthenticated) {
    return <p>Redirecting to sign-in...</p>;
  }

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold">Welcome to the Article Page</h1>
      <p>You are successfully logged in!</p>
    </div>
  );
}
