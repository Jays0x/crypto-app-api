'use client'
import { useEffect, useState } from "react";

export default function Home() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  const url = 'https://api.coincap.io/v2/assets';
  const options = { method: 'GET' };

  // Fetch data from API
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(url, options);
        
        if (!response.ok) {
          console.log('Error fetching data');
          setLoading(false);
          return;
        }

        const result = await response.json();
        setData(result.data); // Set 'data' to the 'data' array within the response
        setLoading(false);

      } catch (error) {
        console.log("Fetch error:", error);
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) {
    <div>
        LOADING...
    </div>
  }

  return (
    <div className="overflow-x-auto mb-10">
      <table className="w-full m-auto  bg-white">
        <thead>
          <tr className="text-left text-[14px]">
            <th className="px-24 py-4 border-b">#</th>
            <th className="px-4 py-4 border-b">Name</th>
            <th className="px-4 py-4 border-b">Symbol</th>
            <th className="px-4 py-4 border-b">Price (USD)</th>
            <th className="px-4 py-4 border-b">24H</th>
            <th className="px-4 py-4 border-b">Volume (24H)</th>
            <th className="px-4 py-4 border-b">Market Cap (USD)</th>
          </tr>
        </thead>
        <tbody className="">
          {data.slice(0, 20).map((asset) => (
            <tr key={asset.id} className="text-left text-[14px] hover:bg-[#f5f5f5] py-4 pl-10 m-auto border-b-2">
              <td className="px-24 py-4">{asset.rank}</td>
              <td className="px-4 py-4">{asset.name}</td>
              <td className="px-4 py-4">{asset.symbol}</td>
              <td className="px-4 py-4">${Number(asset.priceUsd).toFixed(2)}</td>
              <td className={`${ asset.changePercent24Hr < 0 ? 'text-red-600' : 'text-green-500' } px-4 py-4`}>{Number(asset.changePercent24Hr).toFixed(2)}</td>
              <td className="px-4 py-4">${Number(asset.volumeUsd24Hr).toFixed(2)}</td>
              <td className="px-4 py-4">${Number(asset.marketCapUsd).toFixed(2)}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
