import React from 'react';
import city from '../assets/city.png';
import Cookies from 'js-cookie';
import axios from 'axios';
import { useLoaderData } from 'react-router-dom';

export const loader = async () => {
  const data = Cookies.get('userData');
  const userData = data ? JSON.parse(data) : null;
  const city = userData?.city;

  try {
    const response = await axios.get(
      `http://localhost:5100/v1/issues/city/${city}`,
      {
        withCredentials: true,
      }
    );
    return response.data;
  } catch (error) {
    console.error('Error loading issues:', error);
    return null;
  }
};

const Stats = () => {
  const data = useLoaderData();

  if (!data) {
    return (
      <h1 className="text-center text-3xl">
        Congrats! Your city is issue-free.
      </h1>
    );
  }

  // Destructure the data object
  const { pending, resolved, ongoing } = data;

  return (
    <div className="px-20 py-10">
      <div className="grid lg:grid-flow-col text-center gap-8">
        {/* Pending Issues */}
        <div className="relative h-[200px] flex items-center justify-center border shadow-md p-4">
          <div
            style={{
              backgroundImage: `url(${city})`,
              backgroundSize: 'cover',
              backgroundRepeat: 'no-repeat',
              backgroundPosition: 'center',
              opacity: '0.5',
            }}
            className="absolute inset-0"
          />
          <div className="relative z-10 text-red-600">
            <p className="text-2xl">Pending</p>
            <p className="text-6xl">{pending}</p>
          </div>
        </div>

        {/* Resolved Issues */}
        <div className="relative h-[200px] flex items-center justify-center border shadow-md p-4">
          <div
            style={{
              backgroundImage: `url(${city})`,
              backgroundSize: 'cover',
              backgroundRepeat: 'no-repeat',
              backgroundPosition: 'center',
              opacity: '0.5',
            }}
            className="absolute inset-0"
          />
          <div className="relative z-10 text-green-600">
            <p className="text-2xl">Resolved</p>
            <p className="text-6xl">{resolved}</p>
          </div>
        </div>

        {/* Ongoing Issues */}
        <div className="relative h-[200px] flex items-center justify-center border shadow-md p-4">
          <div
            style={{
              backgroundImage: `url(${city})`,
              backgroundSize: 'cover',
              backgroundRepeat: 'no-repeat',
              backgroundPosition: 'center',
              opacity: '0.5',
            }}
            className="absolute inset-0"
          />
          <div className="relative z-10 text-yellow-600">
            <p className="text-2xl">On Going</p>
            <p className="text-6xl">{ongoing}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Stats;
