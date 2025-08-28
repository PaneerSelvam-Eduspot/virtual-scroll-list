import { jsx as _jsx } from "react/jsx-runtime";
import './StatusBadge.css'; // Import CSS for StatusBadge
const StatusBadge = ({ status }) => {
    return (_jsx("span", { className: `status-badge ${status}`, children: status.charAt(0).toUpperCase() + status.slice(1) }));
};
export default StatusBadge;
