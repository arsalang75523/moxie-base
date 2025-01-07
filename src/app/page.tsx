'use client';

import { useRouter } from 'next/navigation';

export default function Page() {
  const router = useRouter();

  const handleGoToEarnings = () => {
    router.push('/earnings');
  };

  return (
    <div className="flex-center">
      <h2>Welcome to Moxie Dashboard</h2>
      <p>Track your earnings and share them with others.</p>
      <div className="flex gap-4">
        <button onClick={handleGoToEarnings}>View Earnings</button>
        <button onClick={() => alert('Share functionality coming soon!')}>Share</button>
      </div>
    </div>
  );
}

