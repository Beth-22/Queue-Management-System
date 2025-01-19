/* eslint-disable react/prop-types */
import React from "react";

const QueueCard = ({ queue, userRole, onJoin, onComplete, onDelete }) => {
  return (
    <div className="p-4 bg-white shadow rounded-lg border">
      <h3 className="text-lg font-bold">{queue.name}</h3>
      <p className="text-sm text-gray-600">Service: {queue.service}</p>
      <p className="text-sm text-gray-500">Status: {queue.status}</p>
      <p className="text-sm text-gray-500">
        Participants: {queue.participants.length} / 60
      </p>

      <div className="mt-4 flex space-x-2">
        {/* Customer Actions */}
        {userRole === "customer" && queue.status === "waiting" && (
          <>
            {queue.participants.length < 60 ? (
              <button
                onClick={() => onJoin(queue._id)}
                className="bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600"
              >
                Join Queue
              </button>
            ) : (
              <span className="text-red-500 text-sm">Queue is full</span>
            )}

            <button
              onClick={() => onComplete(queue._id)}
              className="bg-green-500 text-white px-3 py-1 rounded hover:bg-green-600"
            >
              Mark Complete
            </button>
          </>
        )}

        {/* Admin Actions */}
        {userRole === "admin" && (
          <button
            onClick={() => onDelete(queue._id)}
            className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
          >
            Delete Queue
          </button>
        )}
      </div>
    </div>
  );
};

export default QueueCard;
