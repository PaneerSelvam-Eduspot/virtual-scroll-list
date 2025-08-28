import React from 'react';
import { User } from './UserData';
import './StatusBadge.css'; // Import CSS for StatusBadge

const StatusBadge = ({ status }: { status: User['status'] }) => {
  return (
    <span className={`status-badge ${status}`}>
      {status.charAt(0).toUpperCase() + status.slice(1)}
    </span>
  );
};

export default StatusBadge;