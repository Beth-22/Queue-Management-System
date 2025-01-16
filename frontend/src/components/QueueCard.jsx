import React from 'react';
import PropTypes from 'prop-types';

const QueueCard = ({ service, status, user }) => {
    const statusClasses = {
        waiting: 'bg-yellow-500 text-yellow-100',
        completed: 'bg-green-500 text-green-100',
        cancelled: 'bg-red-500 text-red-100',
    };

    return (
        <div className="border rounded-lg p-4 shadow-lg bg-white">
            <h3 className="text-lg font-bold text-gray-800">{service}</h3>
            <p className={`inline-block px-3 py-1 mt-2 text-sm rounded-full ${statusClasses[status]}`}>
                {status}
            </p>
            <p className="mt-4 text-sm text-gray-600">User: {user}</p>
        </div>
    );
};

QueueCard.propTypes = {
    service: PropTypes.string.isRequired,
    status: PropTypes.oneOf(['waiting', 'completed', 'cancelled']).isRequired,
    user: PropTypes.string.isRequired,
};

export default QueueCard;
