'use client';

import { useSession } from 'next-auth/react';
import { useEffect, useState } from 'react';
import Breadcrumb from '@/components/Breadcrumbs/breadcrumb';
import { redirect } from 'next/navigation';

type AccountType = {
  id: number;
  status?: string;
  accountTitle?: string;
  license?: string;
  extra1Label?: string;
  extra2Label?: string;
  extra3Label?: string;
  users: [];
  boards: [];
};

export default function AccountClient() {
  const { data: session, status } = useSession();

  const [account, setAccount] = useState<AccountType | null>(null);
  const [countdown, setCountdown] = useState(3);
  const [error, setError] = useState('');

  // Form state
  const [extraLabel1, setExtraLabel1] = useState('');
  const [extraLabel2, setExtraLabel2] = useState('');
  const [extraLabel3, setExtraLabel3] = useState('');
  const [updateMsg, setUpdateMsg] = useState('');

  useEffect(() => {
    const fetchAccount = async () => {
      try {
        const res = await fetch('/api/getAccount');
        if (!res.ok) throw new Error('Failed to fetch account');
        const data = await res.json();
        setAccount(data);

        // Pre-fill inputs with current values
        setExtraLabel1(data.extraLabel1 || '');
        setExtraLabel2(data.extraLabel2 || '');
        setExtraLabel3(data.extraLabel3 || '');
      } catch (err: any) {
        setError(err.message);
      }
    };

    fetchAccount();
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setCountdown((prev) => prev - 1);
    }, 1000);

    if (countdown <= 1) clearInterval(interval);
    return () => clearInterval(interval);
  }, [countdown]);

  useEffect(() => {
    if (account) {
      if (account.extra1Label?.trim()) setExtraLabel1(account.extra1Label);
      if (account.extra2Label?.trim()) setExtraLabel2(account.extra2Label);
      if (account.extra3Label?.trim()) setExtraLabel3(account.extra3Label);
    }
  }, [account]);


  const handleUpdateLabels = async () => {
    if (!account?.id) {
      setUpdateMsg('Account not loaded.');
      return;
    }

    const payload: any = { accountId: account?.id };
    if (extraLabel1.trim()) payload.extraLabel1 = extraLabel1.trim();
    if (extraLabel2.trim()) payload.extraLabel2 = extraLabel2.trim();
    if (extraLabel3.trim()) payload.extraLabel3 = extraLabel3.trim();

    if (Object.keys(payload).length === 1) {
      setUpdateMsg('Please fill at least one field.');
      return;
    }

    try {
      const res = await fetch('/api/account/updateLabels', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      const data = await res.json();

      if (res.ok) {
        setUpdateMsg('Account labels updated successfully!');
        setAccount((prev) => ({ ...prev!, ...payload }));
      } else {
        setUpdateMsg(data.error || data.message || 'Update failed.');
      }
    } catch (err) {
      setUpdateMsg('An unexpected error occurred.');
    }
  };

  if (status === 'loading') {
    return <p>Loading...</p>;
  }

  if (!session) {
    return (
      <p className="text-black">
        You need to be signed in to view this page. You will be redirected in {countdown} second
        {countdown !== 1 ? 's' : ''}
      </p>
    );
  }

  const userLevel = (() => {
    switch (session.user.level) {
      case 3:
        return 'Super User (Full Access)';
      case 2:
        return 'Admin (Standard Access)';
      case 1:
        return 'User (Limited Access)';
      default:
        return "No User Level - Please Contact You're Admin";
    }
  })();

  const primUser =
    session.user.primaryUser === 1
      ? `You're Signed In As PRIMARY USER For ${account?.accountTitle}`
      : '';

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
            onClick={() => redirect('/boards')}
            className="uppercase transition-all ease-in-out duration-[1s] h-10 rounded-sm bg-[#6078ff] px-4 py-1 mb-6 text-l font-semibold text-white shadow-xs hover:bg-indigo-500 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
          >
            Boards
          </button>
          <button
            type="button"
            onClick={() => redirect('/calendar')}
            className="uppercase transition-all ease-in-out duration-[1s] h-10 rounded-sm bg-[#6078ff] px-4 py-1 mb-6 text-l font-semibold text-white shadow-xs hover:bg-indigo-500 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
          >
            Manage Calendar
          </button>
          <button
            type="button"
            onClick={() => redirect('/workforce')}
            className="uppercase transition-all ease-in-out duration-[1s] h-10 rounded-sm bg-[#6078ff] px-4 py-1 mb-6 text-l font-semibold text-white shadow-xs hover:bg-indigo-500 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
          >
            Manage Workforce (Users)
          </button>
        </div>

        <div className="main-right !items-start">
          <div className="text-black bg-[var(--accountBox)] shadow-[3px_3px_2px_RGBA(102,102,102,1)] rounded-[20] p-4 w-full m-4">
            <h2>Account</h2>
            <p className="text-2xl font-semibold pb-4">{account?.accountTitle}</p>

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
          <div className="border-l-4 border-l-[var(--orangeBorder)] pl-4 pr-20 w-full shrink-0">
            <form onSubmit={(e) => e.preventDefault()}>
              <label htmlFor="extraLabel1" className="block">
                Extra 1 Label
              </label>
              <input
                id="extraLabel1"
                name="extraLabel1"
                type="text"
                value={extraLabel1}
                onChange={(e) => setExtraLabel1(e.target.value)}
                placeholder="Extra 1 (Change In Account)"
                className="block shrink-0 w-full border-1 border-gray-400 p-2 my-2 rounded-xl bg-[var(--accountBox)] shadow-[3px_3px_2px_RGBA(102,102,102,1)]"
              />

              <label htmlFor="extraLabel2" className="block">
                Extra 2 Label
              </label>
              <input
                id="extraLabel2"
                name="extraLabel2"
                type="text"
                value={extraLabel2}
                onChange={(e) => setExtraLabel2(e.target.value)}
                placeholder="Extra 2 (Change In Account)"
                className="block shrink-0 w-full border-1 border-gray-400 p-2 my-2 rounded-xl bg-[var(--accountBox)] shadow-[3px_3px_2px_RGBA(102,102,102,1)]"
              />

              <label htmlFor="extraLabel3" className="block">
                Extra 3 Label
              </label>
              <input
                id="extraLabel3"
                name="extraLabel3"
                type="text"
                value={extraLabel3}
                onChange={(e) => setExtraLabel3(e.target.value)}
                placeholder="Extra 3 (Change In Account)"
                className="block shrink-0 w-full border-1 border-gray-400 p-2 my-2 rounded-xl bg-[var(--accountBox)] shadow-[3px_3px_2px_RGBA(102,102,102,1)]"
              />

              <button
                type="button"
                onClick={handleUpdateLabels}
                className="uppercase transition-all ease-in-out duration-[1s] h-10 rounded-sm bg-[#6078ff] px-4 my-4 text-l font-semibold text-white shadow-xs hover:bg-indigo-500 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
              >
                Update Labels
              </button>

              {updateMsg && (
                <p className="text-sm mt-2 text-black bg-[var(--accountBox)] rounded-xl p-2 shadow">
                  {updateMsg}
                </p>
              )}
            </form>
          </div>
        </div>

        <div className="main-right !items-start !justify-start !flex-col">
          <h2 className="text-4xl py-4">Admin Log</h2>
          <p>ADMIN COMPONENT GOES HERE</p>
        </div>
      </div>
    </div>
  );
}
