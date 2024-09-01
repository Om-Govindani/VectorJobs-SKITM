import React, { useState } from 'react';
import axiosInstance from '../../utils/axiosInstance';

const RatingForm = ({ applicantId, jobId, onClose }) => {
  const [completionTimeRating, setCompletionTimeRating] = useState(null);
  const [overallRating, setOverallRating] = useState(null);
  const [error, setError] = useState('');

  // const handleSubmit = (e) => {
  //   e.preventDefault();

  //   // Validation logic
  //   if (completionTimeRating === null || overallRating === null) {
  //     setError('Please provide ratings for both Completion Time and Overall Experience.');
  //     return;
  //   }

  //   // If valid, proceed with submission
  //   alert(`Completion Time: ${completionTimeRating}, Overall Rating: ${overallRating}`);
  //   setError(''); // Clear error message
  //   // You can handle further form submission logic here
  // };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (completionTimeRating === null || overallRating === null) {
      setError('Please provide ratings for both Completion Time and Overall Experience.');
      return;
    }

    try {
      const response = await axiosInstance.post('/freelancer/rate', {
        applicantId,
        jobId,
        completionTimeRating,
        overallRating,
      });

      if (response.status === 200) {
        alert('Rating submitted successfully');
        onClose(); // Close the form after submission
      }
    } catch (error) {
      console.error('Error submitting rating:', error);
      setError('Failed to submit rating.');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col items-center p-4 space-y-6">
      <div className="flex flex-col items-center">
        <h2 className="text-lg font-medium mb-4 text-black">Rate Completion Time</h2>
        <div className="flex space-x-2 mb-4">
          {[1, 2, 3, 4, 5].map((rate) => (
            <button
              key={rate}
              type="button"
              onClick={() => setCompletionTimeRating(rate)}
              className={`text-3xl ${
                completionTimeRating >= rate ? 'text-yellow-500' : 'text-gray-400'
              } hover:text-yellow-500 focus:outline-none`}
            >
              ★
            </button>
          ))}
        </div>
      </div>

      <div className="flex flex-col items-center">
        <h2 className="text-lg font-medium mb-4 text-black">Rate Overall Experience</h2>
        <div className="flex space-x-2 mb-4">
          {[1, 2, 3, 4, 5].map((rate) => (
            <button
              key={rate}
              type="button"
              onClick={() => setOverallRating(rate)}
              className={`text-3xl ${
                overallRating >= rate ? 'text-yellow-500' : 'text-gray-400'
              } hover:text-yellow-500 focus:outline-none`}
            >
              ★
            </button>
          ))}
        </div>
      </div>

      {/* Error Message */}
      {error && <p className="text-red-500">{error}</p>}

      <button
        type="submit"
        className="px-4 py-2 rounded-lg bg-blue-500 text-white hover:bg-blue-600 focus:outline-none"
      >
        Submit Ratings
      </button>
    </form>
  );
};

export default RatingForm;