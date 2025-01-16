import React from 'react';
import PropTypes from 'prop-types';

const NotificationBanner = ({ message, type = 'info' }) => {
    const typeClasses = {
        info: 'bg-blue-500 text-blue-100',
        success: 'bg-green-500 text-green-100',
        error: 'bg-red-500 text-red-100',
    };

    return (
        <div className={`w-full p-4 rounded-lg shadow-md ${typeClasses[type]} mb-4`}>
            <p className="text-center text-sm font-medium">{message}</p>
        </div>
    );
};

NotificationBanner.propTypes = {
    message: PropTypes.string.isRequired,
    type: PropTypes.oneOf(['info', 'success', 'error']),
};

export default NotificationBanner;
