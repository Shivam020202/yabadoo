// Updated src/pages/Dashboard.jsx
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  getSubmissions,
  deleteSubmission,
  logout,
  getQueueStatus,
  resetQueue,
} from "../services/api";

const Dashboard = () => {
  const [submissions, setSubmissions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedSubmission, setSelectedSubmission] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [queueStatus, setQueueStatus] = useState(null);
  const [isResettingQueue, setIsResettingQueue] = useState(false);
  const [showResetModal, setShowResetModal] = useState(false);
  const navigate = useNavigate();

  const fetchSubmissions = async () => {
    try {
      setLoading(true);
      const token = localStorage.getItem("authToken");
      const data = await getSubmissions(token);
      setSubmissions(data);
      setError(null);
    } catch (error) {
      console.error("Error fetching submissions:", error);
      setError("Failed to load submissions. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const fetchQueueStatus = async () => {
    try {
      const status = await getQueueStatus();
      setQueueStatus(status);
    } catch (error) {
      console.error("Error fetching queue status:", error);
    }
  };

  useEffect(() => {
    fetchSubmissions();
    fetchQueueStatus();
  }, []);

  const handleLogout = () => {
    logout();
    // Force a full app reload to clear all state
    window.location.href = "/";
  };

  const handleDeleteClick = (submission) => {
    setSelectedSubmission(submission);
    setIsModalOpen(true);
  };

  const handleDeleteConfirm = async () => {
    try {
      setLoading(true);
      const token = localStorage.getItem("authToken");
      await deleteSubmission(selectedSubmission._id, token);
      setSubmissions(
        submissions.filter((item) => item._id !== selectedSubmission._id)
      );
      setIsModalOpen(false);
      setSelectedSubmission(null);
    } catch (error) {
      console.error("Error deleting submission:", error);
      setError("Failed to delete submission. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleResetQueue = async () => {
    try {
      setIsResettingQueue(true);
      const token = localStorage.getItem("authToken");
      await resetQueue(token);

      // Refresh queue status and submissions
      await fetchQueueStatus();
      await fetchSubmissions();

      setShowResetModal(false);
      setError(null);
    } catch (error) {
      console.error("Error resetting queue:", error);
      setError("Failed to reset queue. Please try again.");
    } finally {
      setIsResettingQueue(false);
    }
  };

  const formatDate = (dateString) => {
    const options = {
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  const formatTime = (minutes) => {
    if (minutes === 0) return "No wait time";
    const hours = Math.floor(minutes / 60);
    const mins = minutes % 60;
    if (hours === 0) return `${mins} minutes`;
    if (mins === 0) return `${hours} hour${hours > 1 ? "s" : ""}`;
    return `${hours} hour${hours > 1 ? "s" : ""} and ${mins} minutes`;
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <nav className="bg-aussie-purple text-white p-4 shadow-md">
        <div className="container mx-auto flex justify-between items-center">
          <div className="text-3xl font-bold rainbow-text">Yabadoo Admin</div>
          <div className="flex gap-4">
            <a
              href="/"
              className="bg-amber-600 text-white px-4 py-2 rounded-lg hover:bg-green-600 transition"
            >
              Back to Home
            </a>
            <button
              onClick={handleLogout}
              className="bg-red-700 text-aussie-purple px-4 py-2 rounded-lg hover:bg-gray-100 transition"
            >
              Logout
            </button>
          </div>
        </div>
      </nav>

      <main className="container mx-auto py-8 px-4">
        {/* Queue Status Section */}
        <div className="mb-8 bg-white p-6 rounded-lg shadow-md">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-2xl font-bold text-aussie-purple">
              Queue Status
            </h2>
            <button
              onClick={() => setShowResetModal(true)}
              disabled={isResettingQueue}
              className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 transition disabled:opacity-50"
            >
              {isResettingQueue ? "Resetting..." : "Reset Queue"}
            </button>
          </div>

          {queueStatus ? (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="bg-blue-50 p-4 rounded-lg">
                <h3 className="font-semibold text-blue-800">
                  Current Position
                </h3>
                <p className="text-2xl font-bold text-blue-600">
                  #{queueStatus.currentPosition}
                </p>
              </div>
              <div className="bg-green-50 p-4 rounded-lg">
                <h3 className="font-semibold text-green-800">Queue Status</h3>
                <p className="text-lg font-semibold text-green-600">
                  {queueStatus.isActive ? "Active" : "Inactive"}
                </p>
              </div>
              <div className="bg-purple-50 p-4 rounded-lg">
                <h3 className="font-semibold text-purple-800">
                  Last Submission
                </h3>
                <p className="text-sm text-purple-600">
                  {queueStatus.lastSubmissionTime
                    ? formatDate(queueStatus.lastSubmissionTime)
                    : "No submissions yet"}
                </p>
              </div>
            </div>
          ) : (
            <p className="text-gray-500">Loading queue status...</p>
          )}
        </div>

        <h1 className="text-4xl font-bold mb-8 text-center">
          Form Submissions
        </h1>

        {error && (
          <div className="mb-8 p-4 bg-red-100 text-red-700 rounded-lg text-center">
            {error}
          </div>
        )}

        {loading ? (
          <div className="flex justify-center my-12">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-aussie-purple"></div>
          </div>
        ) : submissions.length === 0 ? (
          <div className="text-center p-8 bg-white rounded-lg shadow-md">
            <p className="text-xl text-gray-600">No submissions yet.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-6">
            {submissions.map((submission) => (
              <div
                key={submission._id}
                className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition"
              >
                <div className="flex justify-between items-start mb-4">
                  <div className="flex items-center gap-4">
                    <h2 className="text-2xl font-bold text-aussie-purple">
                      {submission.name}
                    </h2>
                    <div className="flex items-center gap-2">
                      <span className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm font-semibold">
                        Queue #{submission.queuePosition}
                      </span>
                      <span
                        className={`px-3 py-1 rounded-full text-sm font-semibold ${
                          submission.waitTimeMinutes === 0
                            ? "bg-green-100 text-green-800"
                            : "bg-orange-100 text-orange-800"
                        }`}
                      >
                        {formatTime(submission.waitTimeMinutes)}
                      </span>
                    </div>
                  </div>
                  <button
                    onClick={() => handleDeleteClick(submission)}
                    className="text-red-500 hover:text-red-700"
                  >
                    <i className="fas fa-trash"></i>
                  </button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                  <div>
                    <p className="text-gray-500">Email:</p>
                    <p className="font-semibold">{submission.email}</p>
                  </div>
                  <div>
                    <p className="text-gray-500">Phone:</p>
                    <p className="font-semibold">
                      {submission.phone || "Not provided"}
                    </p>
                  </div>
                  <div>
                    <p className="text-gray-500">Event Date:</p>
                    <p className="font-semibold">
                      {submission.eventDate
                        ? formatDate(submission.eventDate)
                        : "Not specified"}
                    </p>
                  </div>
                  <div>
                    <p className="text-gray-500">Event Type:</p>
                    <p className="font-semibold">
                      {submission.eventType ? (
                        <span
                          className={`px-3 py-1 rounded-full text-white ${
                            submission.eventType === "birthday"
                              ? "bg-aussie-gold"
                              : submission.eventType === "corporate"
                              ? "bg-aussie-blue"
                              : submission.eventType === "festival"
                              ? "bg-aussie-purple"
                              : submission.eventType === "school"
                              ? "bg-aussie-green"
                              : "bg-aussie-red"
                          }`}
                        >
                          {submission.eventType.charAt(0).toUpperCase() +
                            submission.eventType.slice(1)}
                        </span>
                      ) : (
                        "Not specified"
                      )}
                    </p>
                  </div>
                </div>

                <div className="mb-4">
                  <p className="text-gray-500">Message:</p>
                  <p className="p-3 bg-gray-50 rounded-lg">
                    {submission.message}
                  </p>
                </div>

                <div className="text-right text-gray-500 text-sm">
                  Submitted on {formatDate(submission.createdAt)}
                </div>
              </div>
            ))}
          </div>
        )}
      </main>

      {/* Delete Confirmation Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center z-50">
          <div
            className="absolute inset-0 bg-black opacity-50"
            onClick={() => setIsModalOpen(false)}
          ></div>
          <div className="bg-white p-8 rounded-lg shadow-xl z-10 max-w-md w-full">
            <h3 className="text-2xl font-bold mb-4">Confirm Deletion</h3>
            <p className="mb-6">
              Are you sure you want to delete this submission from{" "}
              {selectedSubmission?.name}? This action cannot be undone.
            </p>
            <div className="flex justify-end space-x-4">
              <button
                className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-100 transition"
                onClick={() => setIsModalOpen(false)}
              >
                Cancel
              </button>
              <button
                className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition"
                onClick={handleDeleteConfirm}
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Reset Queue Confirmation Modal */}
      {showResetModal && (
        <div className="fixed inset-0 flex items-center justify-center z-50">
          <div
            className="absolute inset-0 bg-black opacity-50"
            onClick={() => setShowResetModal(false)}
          ></div>
          <div className="bg-white p-8 rounded-lg shadow-xl z-10 max-w-md w-full">
            <h3 className="text-2xl font-bold mb-4 text-red-600">
              Reset Queue
            </h3>
            <p className="mb-6">
              Are you sure you want to reset the queue? This will:
            </p>
            <ul className="list-disc list-inside mb-6 text-gray-600">
              <li>Set the queue position back to 0</li>
              <li>Allow the next user to submit immediately</li>
              <li>Clear the current queue waiting times</li>
            </ul>
            <p className="mb-6 text-sm text-gray-500">
              This action cannot be undone and will affect all future
              submissions.
            </p>
            <div className="flex justify-end space-x-4">
              <button
                className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-100 transition"
                onClick={() => setShowResetModal(false)}
              >
                Cancel
              </button>
              <button
                className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition"
                onClick={handleResetQueue}
                disabled={isResettingQueue}
              >
                {isResettingQueue ? "Resetting..." : "Reset Queue"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Dashboard;
