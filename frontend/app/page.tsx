"use client";

import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";

export default function Home() {
  const router = useRouter();

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-100 space-y-6">
      <h1 className="text-4xl font-bold text-gray-800 text-center">
        Manage your tasks efficiently
      </h1>
      <div className="flex space-x-4">
        <Button onClick={() => router.push("/login")}>Login</Button>
        <Button onClick={() => router.push("/register")}>Register</Button>
      </div>
    </div>
  );
}
