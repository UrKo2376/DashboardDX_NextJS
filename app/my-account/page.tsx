'use client';

import { useSession } from "next-auth/react";

export default function Account() {
  const { data: session, status } = useSession();

  if (status === "loading") {
    return <p>Loading...</p>;
  }

  if (!session) {
    return <p>You need to be signed in to view this page.</p>;
  }

  return (
    <div className="home-container">
      <div className="main-left">
        <h1 className="text-4xl text-black">Welcome {session.user?.name || session.user?.username}</h1>
      </div>
      <div className="main-right">
        <p className="text-black">Account details go here</p>
      </div>
    </div>
  );
}
