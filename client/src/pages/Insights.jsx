import React, { useState } from 'react';
import city from '../assets/city.png';
import Cookies from 'js-cookie';
import axios from 'axios';
import { useLoaderData } from 'react-router-dom';
import { useDashboardContext } from './DashboardLayout';

export const loader = async () => {
  const data = Cookies.get('userData');
  const userData = data ? JSON.parse(data) : null;
  const city = userData?.city;

  
  try {
    const response = await axios.get(
      `${import.meta.env.VITE_SERVER_URL}/v1/issues/city/${city}`,
      { withCredentials: true }
    );
    return response.data;
  } catch (error) {
    console.error('Error loading issues:', error);
    return null;
  }
};

const Stats = () => {
  const { user } = useDashboardContext();
  const data = useLoaderData();
  const [selectedOption, setSelectedOption] = useState(null);
  console.log(selectedOption);
  if (!data) {
    return (
      <h1 className="text-center text-3xl font-semibold">
        Congrats! Your city is issue-free.
      </h1>
    );
  }

  const { pending, resolved, ongoing } = data;

  return (
    <div className="px-8 py-16">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {[
          { label: 'Pending', count: pending, color: 'text-red-600' },
          { label: 'Resolved', count: resolved, color: 'text-green-600' },
          { label: 'Ongoing', count: ongoing, color: 'text-yellow-600' },
        ].map(({ label, count, color }, idx) => (
          <div
            key={idx}
            className="relative bg-white shadow-lg rounded-lg overflow-hidden p-6 cursor-pointer"
            onClick={() => setSelectedOption(label)}
          >
            <div
              style={{
                backgroundImage: `url(${city})`,
                backgroundSize: 'cover',
                opacity: '0.3',
              }}
              className="absolute inset-0"
            />
            <div className="relative z-10 flex flex-col items-center">
              <p className={`text-3xl font-bold ${color}`}>{label}</p>
              <p className="text-7xl font-bold">{count}</p>
            </div>
          </div>
        ))}
      </div>
      <div className="grid gap-8 mt-10">
        <h1 className="text-lg font-medium px-2 ">Issues in {user?.city} :</h1>
        {data.data
          .filter((issue) => issue.status == selectedOption)
          .map((issue) => {
            return (
              <div key={issue._id} className="grid shadow-lg p-4 gap-4">
                <p className="font-bold text-end">{issue.status} </p>
                <p className="font-bold tracking-wider text-red-700">
                  {issue.problem.charAt(0).toUpperCase() +
                    issue.problem.slice(1)}
                </p>

                <p>{issue.description}</p>
                <a
                  href=""
                  className="border max-w-fit px-4 py-2 bg-custom-darkBlue rounded-md text-white text-xs"
                >
                  Show on Map
                </a>
              </div>
            );
          })}
      </div>
    </div>
  );
};

export default Stats;
