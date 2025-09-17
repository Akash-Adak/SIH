import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { getComplaintById } from '../services/api';

// Helper to format the status text
const formatStatus = (status) => status.replace('_', ' ');

// Timeline Item Component
const TimelineItem = ({ status, date, isLast }) => {
  const formattedDate = new Date(date).toLocaleString('en-IN', {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
    hour: 'numeric',
    minute: '2-digit',
  });
  return (
    <div className="relative">
      {!isLast && <div className="absolute top-5 left-[10px] w-0.5 h-full bg-blue-200"></div>}
      <div className="flex items-center">
        <div className="w-5 h-5 bg-blue-500 rounded-full z-10"></div>
        <div className="ml-4">
          <h4 className="font-semibold">{formatStatus(status)}</h4>
          <p className="text-sm text-gray-500">{formattedDate}</p>
        </div>
      </div>
    </div>
  );
};

export default function ReportDetailsPage() {
  const { id } = useParams(); // Gets the ':id' from the URL
  const [complaint, setComplaint] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchComplaintDetails = async () => {
      // --- IMPORTANT ---
      // Once your backend has the GET /complaints/{id} endpoint,
      // you can uncomment the code below and remove the placeholder.
      
      /* --- UNCOMMENT THIS BLOCK ---
      try {
        const response = await getComplaintById(id);
        setComplaint(response.data);
      } catch (err) {
        setError('Could not fetch report details. It might not exist or you may not have permission to view it.');
        console.error(err);
      } finally {
        setLoading(false);
      }
      */

      // --- PLACEHOLDER DATA (Remove once backend is ready) ---
      console.warn("Using placeholder data. Please update with real API call.");
      setTimeout(() => {
        setComplaint({
          id: id,
          title: "Mock: UPI Scam Call Received",
          description: "This is a detailed mock description. I received a call from +911234567890 claiming to be from my bank. They asked for an OTP to reverse a failed transaction but I did not share it. The call was suspicious and I believe it was a phishing attempt.",
          category: "CYBER_CRIME",
          status: "IN_PROGRESS",
          createdAt: "2025-09-15T10:00:00Z",
          updatedAt: "2025-09-16T14:30:00Z",
          // A real response should include a status history timeline
          statusHistory: [
            { status: 'FILED', date: '2025-09-15T10:00:00Z' },
            { status: 'IN_PROGRESS', date: '2025-09-16T14:30:00Z' },
          ],
        });
        setLoading(false);
      }, 1000); // Simulate network delay
      // --- END OF PLACEHOLDER ---

    };

    fetchComplaintDetails();
  }, [id]); // Re-run effect if the ID in the URL changes

  if (loading) return <div className="text-center mt-10">Loading Report #{id}...</div>;
  if (error) return <div className="text-center mt-10 text-red-500">{error}</div>;
  if (!complaint) return <div className="text-center mt-10">Report not found.</div>;

  return (
    <div className="max-w-4xl mx-auto mt-8 p-8 bg-white rounded-lg shadow-md">
      <div className="border-b pb-4 mb-6">
        <p className="text-sm text-gray-500">Report ID #{complaint.id}</p>
        <h1 className="text-3xl font-bold text-gray-800">{complaint.title}</h1>
        <p className="text-md text-gray-600">Category: {formatStatus(complaint.category)}</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <div className="md:col-span-2">
          <h3 className="text-xl font-semibold mb-2">Full Description</h3>
          <p className="text-gray-700 leading-relaxed whitespace-pre-wrap">{complaint.description}</p>
        </div>
        
        <div>
          <h3 className="text-xl font-semibold mb-2">Status Timeline</h3>
          <div className="space-y-4">
            {complaint.statusHistory?.map((item, index) => (
              <TimelineItem 
                key={index} 
                status={item.status} 
                date={item.date} 
                isLast={index === complaint.statusHistory.length - 1} 
              />
            )) || <p>No status history available.</p>}
          </div>
        </div>
      </div>
    </div>
  );
}