// app/account/AccountClient.tsx
"use client";

import { Prisma } from "@prisma/client";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import Breadcrumb from "@/components/Breadcrumbs/breadcrumb";
import { redirect } from "next/navigation";

type AccountType = {
  id: number;
  status?: string;
  accountTitle?: string;
  license?: string;
  extraLabel1?: string;
  extraLabel2?: string;
  extraLabel3?: string;
  users: [];
  boards: [];
  // Add more fields from your actual `Account` model as needed
};

export default function AccountClient() {
  const { data: session, status } = useSession();

  const [account, setAccount] = useState<AccountType | null>(null);
  const [countdown, setCountdown] = useState(3);

  useEffect(() => {
    const interval = setInterval(() => {
      setCountdown((prev) => prev - 1);
    }, 1000);

    if (countdown <= 1) {
      clearInterval(interval);
    }

    return () => clearInterval(interval);
  }, [countdown]);

  const [error, setError] = useState("");

  useEffect(() => {
    const fetchAccount = async () => {
      try {
        const res = await fetch("/api/getAccount");
        if (!res.ok) {
          throw new Error("Failed to fetch account");
        }
        const data = await res.json();
        setAccount(data);
      } catch (err: any) {
        setError(err.message);
      }
    };

    fetchAccount();
  }, []);

  if (status === "loading") {
    return <p>Loading...</p>;
  }

  if (!session) {
    return (
      <p className="text-black">
        You need to be signed in to view this page. You will be redirected in{" "}
        {countdown} second{countdown !== 1 ? "s" : ""}
      </p>
    );
  }

  let userLevel = "";

  switch (session.user.level) {
    case 3:
      userLevel = "Super User (Full Access)";
      break;
    case 2:
      userLevel = "Admin (Standard Access)";
      break;
    case 1:
      userLevel = "User (Limited Access)";
      break;
    default:
      userLevel = "No User Level - Please Contact You're Admin";
      break;
  }

  let primUser = "";

  if (session.user.primaryUser == 1) {
    primUser = "You're Signed In As PRIMARY USER For " + account?.accountTitle;
  }

  return (
    <div className="flex flex-col flex-grow">
      <div className="home-container">
        <div className="main-left !justify-start">
          <Breadcrumb />
          <h1 className="text-4xl text-black py-4">
            Welcome {session.user?.name || session.user?.username}
          </h1>
          <button
            type="button"
            onClick={() => redirect("/boards")}
            className="uppercase transition-all ease-in-out duration-[1s] h-10 rounded-sm bg-[#6078ff] px-4 py-1 mb-6 text-l font-semibold text-white shadow-xs hover:bg-indigo-500 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
          >
            Boards
          </button>
          <button
            type="button"
            onClick={() => redirect("/calendar")}
            className="uppercase transition-all ease-in-out duration-[1s] h-10 rounded-sm bg-[#6078ff] px-4 py-1 mb-6 text-l font-semibold text-white shadow-xs hover:bg-indigo-500 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
          >
            Manage Calendar
          </button>
          <button
            type="button"
            onClick={() => redirect("/workforce")}
            className="uppercase transition-all ease-in-out duration-[1s] h-10 rounded-sm bg-[#6078ff] px-4 py-1 mb-6 text-l font-semibold text-white shadow-xs hover:bg-indigo-500 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
          >
            Manage Workforce (Users)
          </button>
        </div>
        <div className="main-right !items-start">
          <div className="text-black bg-[var(--accountBox)] shadow-[3px_3px_2px_RGBA(102,102,102,1)] rounded-[20] p-4 w-full m-4">
            <h2>Account</h2>
            <p className="text-2xl font-semibold pb-4">
              {account?.accountTitle}
            </p>
            <h2>License Number</h2>
            <p className="text-3xl font-semibold pb-4">{account?.license}</p>
            <h2>User</h2>
            <p className="text-2xl font-semibold pb-4">
              {session.user?.name || session.user?.username}
            </p>
            <h2>Customer Feedback Link</h2>
            <p className="text-xl font-semibold pb-4">
              https://www.dashboarddx/feedback.php?code={account?.license}
            </p>
            <h2>Access</h2>
            <p className="text-2xl font-semibold pb-4">{userLevel}</p>
            <p>{primUser}</p>
          </div>
        </div>
      </div>
      <div className="home-container justify-center">
        <hr className="w-[90%] max-w-[1545px] h-[2px] border-none bg-[var(--mainBGLight)]" />
      </div>
      <div className="home-container text-black">
        <div className="main-left !justify-start">
          <h2 className="text-4xl py-4">Account Setting</h2>
        </div>
        <div className="main-right !items-start !justify-start">
          <h2 className="text-4xl p-4">Admin Log</h2>
        </div>
      </div>
    </div>
  );
}
