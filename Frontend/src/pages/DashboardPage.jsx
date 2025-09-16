import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { getMyComplaints } from '../services/api';
import ReportCard from '../components/ReportCard'; // We will create this next

export default function DashboardPage() {
  const [complaints, setComplaints] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchComplaints = async () => {
      try {
        const response = await getMyComplaints();
        setComplaints(response.data);
      } catch (err) {
        setError('Failed to fetch your reports. Please try again later.');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchComplaints();
  }, []); // Empty dependency array means this runs once on mount

  if (loading) {
    return <div className="text-center mt-10">Loading your reports...</div>;
  }

  if (error) {
    return <div className="text-center mt-10 text-red-500">{error}</div>;
  }

  return (
    <div className="container mx-auto mt-8">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">My Reports</h1>
        <Link
          to="/report/new"
          className="bg-blue-600 text-white px-5 py-2 rounded-md font-semibold hover:bg-blue-700"
        >
          + File a New Report
        </Link>
      </div>

      {complaints.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {complaints.map((complaint) => (
            <ReportCard key={complaint.id} complaint={complaint} />
          ))}
        </div>
      ) : (
        <div className="text-center py-10 bg-gray-50 rounded-lg">
          <p className="text-gray-600">You haven't filed any reports yet.</p>
        </div>
      )}
    </div>
  );
}