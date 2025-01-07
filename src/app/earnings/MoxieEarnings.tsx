'use client';

import React, { useState } from 'react';
import { gql } from 'graphql-request';
import client from '../utils/apiClient'; // Update this path to the correct path where apiClient is located
// If the path is incorrect, update it to the correct path where apiClient is located

const GET_MOXIE_EARNINGS = gql`
  query GetMoxieEarnings($entityId: String!) {
    BaseMoxieEarningStatsV2(
      input: {
        filter: { entityType: { _eq: USER }, entityId: { _eq: $entityId } }
        timeframe: WEEKLY
        blockchain: ALL
      }
    ) {
      BaseMoxieEarningStatV2 {
        allEarningsAmount
        allEarningsAmountInWei
        avgDailyEarnings
        entityId
        entityType
        timeframe
      }
    }
  }
`;

export default function MoxieEarnings() {
  const [entityId, setEntityId] = useState('');
  const [earnings, setEarnings] = useState<any | null>(null); // تایپ مناسب
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null); // تایپ خطا

  const fetchEarnings = async () => {
    if (!entityId.trim()) {
      alert('Please enter a valid entity ID');
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const variables = { entityId };
      const data = await client.request<{ BaseMoxieEarningStatsV2: { BaseMoxieEarningStatV2: any[] } }>(GET_MOXIE_EARNINGS, variables);
      setEarnings(data.BaseMoxieEarningStatsV2.BaseMoxieEarningStatV2[0]);
    } catch (err) {
      setError(err as Error); // استفاده از تایپ مناسب
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <input
        type="text"
        placeholder="Enter Entity ID (e.g., M63)"
        value={entityId}
        onChange={(e) => setEntityId(e.target.value)}
      />
      <button onClick={fetchEarnings}>Fetch Earnings</button>

      {loading && <p>Loading...</p>}
      {error && <p>Error: {(error as Error).message}</p>}

      {earnings && (
        <div>
          <h2>Earnings Data</h2>
          <ul>
            <li>All Earnings Amount: {earnings.allEarningsAmount}</li>
            <li>All Earnings Amount (in Wei): {earnings.allEarningsAmountInWei}</li>
            <li>Average Daily Earnings: {earnings.avgDailyEarnings}</li>
            <li>Entity ID: {earnings.entityId}</li>
            <li>Entity Type: {earnings.entityType}</li>
            <li>Timeframe: {earnings.timeframe}</li>
          </ul>
        </div>
      )}
    </div>
  );
}


