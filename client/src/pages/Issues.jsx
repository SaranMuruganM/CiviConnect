import React, { useState } from 'react';
import { useLoaderData } from 'react-router-dom';
import axios from 'axios';

export const loader = async () => {
  try {
    const response = await axios.get(
      `${import.meta.env.VITE_SERVER_URL}/v1/issues/`,
      {
        withCredentials: true,
      }
    );
    return response.data; // Return the actual data
  } catch (error) {
    console.log('Error fetching issues:', error);
    return null;
  }
};

const Issues = () => {
  const data = useLoaderData();
  const issues = data?.data || []; // Handle null data scenario
  const [filter, setFilter] = useState('All'); // Filter state, default to 'All'
  const [filteredIssues, setFilteredIssues] = useState(issues); // Store the filtered issues
  const [updateClick, setUpdateClick] = useState(null); // Store the ID of the issue being updated
  const [updatedDescription, setUpdatedDescription] = useState(''); // Store updated description
  const [updatedStatus, setUpdatedStatus] = useState('pending'); // Default status selection

  if (!filteredIssues.length) {
    return (
      <div className="text-center mt-10 font-bold tracking-wider text-2xl">
        You haven't created any issues
      </div>
    ); // Provide feedback when there are no issues
  }

  // Filter issues based on selected status
  const filteredData = filteredIssues.filter((issue) => {
    if (filter === 'All') return true; // Show all issues if 'All' is selected
    return issue.status === filter;
  });

  const handleDelete = async (id) => {
    try {
      await axios.delete(
        `${import.meta.env.VITE_SERVER_URL}/v1/issues/${id}`,
        {
          withCredentials: true,
        }
      );

      // Remove the deleted issue from the filteredIssues state
      setFilteredIssues((prevIssues) =>
        prevIssues.filter((issue) => issue._id !== id)
      );

      console.log('Issue deleted successfully');
    } catch (error) {
      console.log('Error deleting issue:', error);
    }
  };

  const handleUpdate = async (id) => {
    try {
      // Prepare data to send. Only include description if it was updated.
      const dataToUpdate = {
        status: updatedStatus, // Always update status
      };

      if (updatedDescription.trim() !== '') {
        dataToUpdate.description = updatedDescription; // Include description only if provided
      }

      await axios.patch(
        `${import.meta.env.VITE_SERVER_URL}/v1/issues/${id}`,
        dataToUpdate,
        {
          withCredentials: true,
        }
      );

      // Update the issue locally after successful update
      setFilteredIssues((prevIssues) =>
        prevIssues.map((issue) =>
          issue._id === id
            ? {
                ...issue,
                description: updatedDescription || issue.description, // Keep old description if not updated
                status: updatedStatus,
              }
            : issue
        )
      );

      console.log('Issue updated successfully');
      setUpdateClick(null); // Reset the update form after success
    } catch (error) {
      console.log('Error updating issue:', error);
    }
  };

  return (
    <div className="grid py-4 px-8 gap-10">
      <div className="flex gap-4 mx-auto">
        <button
          className={`px-4 py-2 border rounded-lg max-w-fit ${
            filter === 'All' ? 'bg-custom-darkBlue text-custom-sandals' : ''
          }`}
          onClick={() => setFilter('All')}
        >
          All
        </button>
        <button
          className={`px-4 py-2 border rounded-lg max-w-fit ${
            filter === 'pending' ? 'bg-custom-darkBlue text-custom-sandals' : ''
          }`}
          onClick={() => setFilter('pending')}
        >
          Pending
        </button>
        <button
          className={`px-4 py-2 border rounded-lg max-w-fit ${
            filter === 'resolved'
              ? 'bg-custom-darkBlue text-custom-sandals'
              : ''
          }`}
          onClick={() => setFilter('resolved')}
        >
          Resolved
        </button>
        <button
          className={`px-4 py-2 border rounded-lg max-w-fit ${
            filter === 'ongoing' ? 'bg-custom-darkBlue text-custom-sandals' : ''
          }`}
          onClick={() => setFilter('ongoing')}
        >
          Ongoing
        </button>
      </div>

      {/* Render the filtered issues */}
      {filteredData.map((issue) => (
        <div
          key={issue._id}
          className="border p-4 rounded shadow-md w-[80%] mx-auto grid gap-6"
        >
          <div className="flex justify-between">
            <h1 className="text-lg font-bold text-custom-blue">
              {issue.problem.charAt(0).toUpperCase() + issue.problem.slice(1)}
            </h1>
            <h1 className="font-bold ">
              {issue.status.charAt(0).toUpperCase() + issue.status.slice(1)}
            </h1>
          </div>
          <p>{issue.description}</p>
          <div className="flex gap-8">
            <button
              className="border px-4 py-2 rounded-md bg-custom-darkBlue text-custom-lightGreen"
              onClick={() => handleDelete(issue._id)}
            >
              Delete
            </button>
            <button
              className="border px-4 py-2 rounded-md bg-custom-darkBlue text-custom-lightGreen"
              onClick={() => setUpdateClick(issue._id)}
            >
              Update
            </button>
          </div>

          {/* Display update form when updateClick matches the issue ID */}
          {updateClick === issue._id && (
            <form
              onSubmit={(e) => {
                e.preventDefault();
                handleUpdate(issue._id);
              }}
              className="grid gap-4 mt-4"
            >
              <textarea
                value={updatedDescription}
                onChange={(e) => setUpdatedDescription(e.target.value)}
                placeholder="Update description (optional)"
                className="border p-2 w-full"
              ></textarea>

              <select
                value={updatedStatus}
                onChange={(e) => setUpdatedStatus(e.target.value)}
                className="border p-2 w-full"
              >
                <option value="pending">Pending</option>
                <option value="resolved">Resolved</option>
                <option value="ongoing">Ongoing</option>
              </select>

              <button
                type="submit"
                className="border px-4 py-2 rounded-md bg-custom-darkBlue text-custom-lightGreen"
              >
                Submit
              </button>
            </form>
          )}
        </div>
      ))}
    </div>
  );
};

export default Issues;
