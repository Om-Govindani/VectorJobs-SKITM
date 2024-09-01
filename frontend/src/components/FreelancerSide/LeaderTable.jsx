import React, { useState, useEffect } from "react";
import RatingForm from "./RatingForm";

const LeaderTable = ({ selectedFilter, selectedOption, onDropdownChange }) => {
  const [sortedData, setSortedData] = useState([]);
  const [button, setButton] = useState(false);

  // Sample data for the table with updated skills
  const tableData = [
    // Your data here
    { id: 1, name: "John Doe", skills: "Frontend Developer", rating: 4.5, ranking: 3, completionRating: 4.2 },
    { id: 2, name: "Jane Smith", skills: "Python Developer", rating: 4.7, ranking: 1, completionRating: 4.8 },
    { id: 3, name: "Alice Johnson", skills: "Java Developer", rating: 4.6, ranking: 2, completionRating: 4.6 },
    { id: 4, name: "Michael Brown", skills: "Backend Developer", rating: 4.4, ranking: 5, completionRating: 4.0 },
    { id: 5, name: "Emily Davis", skills: "Fullstack Developer", rating: 4.8, ranking: 4, completionRating: 4.7 },
    { id: 6, name: "David Wilson", skills: "App Developer", rating: 4.3, ranking: 7, completionRating: 4.1 },
    { id: 7, name: "Sophia Martinez", skills: "Graphic Designer", rating: 4.5, ranking: 6, completionRating: 4.3 },
    { id: 8, name: "James Anderson", skills: "UI/UX Designer", rating: 4.6, ranking: 8, completionRating: 4.5 },
    { id: 9, name: "Isabella Thomas", skills: "Content Writer", rating: 4.7, ranking: 9, completionRating: 4.9 },
    { id: 10, name: "William Jackson", skills: "Social Media Manager", rating: 4.4, ranking: 10, completionRating: 4.2 },
    { id: 11, name: "Mia White", skills: "Project Manager", rating: 4.9, ranking: 11, completionRating: 4.8 },
    { id: 12, name: "Benjamin Harris", skills: "Software Developer", rating: 4.3, ranking: 12, completionRating: 4.1 },
    { id: 13, name: "Charlotte Lee", skills: "Frontend Developer", rating: 4.8, ranking: 13, completionRating: 4.7 },
    { id: 14, name: "Alexander King", skills: "Backend Developer", rating: 4.5, ranking: 14, completionRating: 4.4 },
    { id: 15, name: "Amelia Wright", skills: "Fullstack Developer", rating: 4.7, ranking: 15, completionRating: 4.6 },
  ];

  useEffect(() => {
    let filteredData = [...tableData];
    
    // Apply skill filter based on selected options
    if (selectedOption.length > 0) {
      filteredData = filteredData.filter((item) => selectedOption.includes(item.skills));
    }

    // Apply dropdown filter
    switch (selectedFilter) {
      case 'average-rating':
        filteredData.sort((a, b) => b.rating - a.rating);
        break;
      case 'average-ranking':
        filteredData.sort((a, b) => a.ranking - b.ranking);
        break;
      case 'average-completion-time':
        filteredData.sort((a, b) => b.completionRating - a.completionRating);
        break;
      default:
        break;
    }

    setSortedData(filteredData);
  }, [selectedFilter, selectedOption]);

  const handleButtonClick = () => {
    setButton(!button);
  };

  return (
    <div className="h-full p-6 max-w-6xl mx-auto bg-white rounded-lg shadow-lg">
      <div className="mb-6 flex justify-center space-x-6">
        <select
          value={selectedFilter}
          onChange={onDropdownChange}
          className="px-5 py-2.5 text-sm font-medium rounded-lg border border-gray-300 bg-gray-200 text-gray-800 transition hover:bg-gray-300 focus:ring-2 focus:ring-blue-400"
        >
          <option value="" disabled>Select Filter</option>
          <option value="average-rating">Average Rating</option>
          <option value="average-ranking">Average Ranking</option>
          <option value="average-completion-time">Average Completion Time</option>
        </select>
        
        <button
          onClick={handleButtonClick}
          className={`px-5 py-2.5 text-sm font-medium rounded-lg transition ${
            button ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-800'
          } hover:bg-blue-700 focus:ring-2 focus:ring-blue-400`}
        >
          {button ? 'Hide Rating Form' : 'Show Rating Form'}
        </button>
      </div>

      {button && <RatingForm />}
      <div className="overflow-auto h-[380px] mt-4"> {/* Adjust height as needed */}
        <table className="w-full table-auto border-collapse text-black bg-white border border-gray-300">
          <thead>
            <tr className="bg-blue-100">
              <th className="px-6 py-3 border-b-2 border-blue-200 text-left text-sm font-semibold text-blue-800">S.No.</th>
              <th className="px-6 py-3 border-b-2 border-blue-200 text-left text-sm font-semibold text-blue-800">Full Name</th>
              <th className="px-6 py-3 border-b-2 border-blue-200 text-left text-sm font-semibold text-blue-800">Skills</th>
              <th className="px-6 py-3 border-b-2 border-blue-200 text-left text-sm font-semibold text-blue-800">Rating</th>
              <th className="px-6 py-3 border-b-2 border-blue-200 text-center text-sm font-semibold text-blue-800">Action</th>
            </tr>
          </thead>
          <tbody>
            {sortedData.map((item) => (
              <tr key={item.id} className="bg-white text-black hover:bg-blue-50 transition">
                <td className="px-6 py-4 border-b border-blue-100 text-sm">{item.id}</td>
                <td className="px-6 py-4 border-b border-blue-100 text-sm">{item.name}</td>
                <td className="px-6 py-4 border-b border-blue-100 text-sm">{item.skills}</td>
                <td className="px-6 py-4 border-b border-blue-100 text-sm">{item.rating}</td>
                <td className="px-6 py-4 border-b border-blue-100 text-center text-sm">
                  <button
                    onClick={() => alert(`Applied for user with ID: ${item.id}`)}
                    className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition"
                  >
                    Apply
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default LeaderTable;