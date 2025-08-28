import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState, useMemo, useCallback, useEffect } from 'react';
import { VirtualizedList } from '../VirtualizedList/VirtualizedList';
import StatusBadge from './StatusBadge';
import { generateUsers } from './UserData';
import './UserList.css';
import PerformanceMonitor from './PerformanceMonitor';
// Loading component
const LoadingSpinner = () => (_jsxs("div", { className: "loading-container", children: [_jsx("div", { className: "spinner" }), _jsx("p", { children: "Loading users..." })] }));
// Error component
const ErrorMessage = ({ message, onRetry }) => (_jsxs("div", { className: "error-container", children: [_jsx("div", { className: "error-icon", children: "\u26A0\uFE0F" }), _jsx("h3", { children: "Oops! Something went wrong" }), _jsx("p", { children: message }), _jsx("button", { onClick: onRetry, className: "retry-button", children: "Try Again" })] }));
// No results component
const NoResults = ({ searchTerm }) => (_jsxs("div", { className: "no-results", children: [_jsx("div", { className: "no-results-icon", children: "\uD83D\uDD0D" }), _jsx("h3", { children: "No users found" }), _jsxs("p", { children: ["No results for \"", searchTerm, "\". Try a different search term."] })] }));
const UserList = () => {
    const [searchTerm, setSearchTerm] = useState('');
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    // Simulate data loading (like from an API)
    const loadUsers = useCallback(async () => {
        try {
            setLoading(true);
            setError(null);
            // Simulate API delay
            await new Promise(resolve => setTimeout(resolve, 1500));
            // Simulate potential error (5% chance)
            if (Math.random() < 0.05) {
                throw new Error('Failed to load users from server');
            }
            const userData = generateUsers(100000);
            setUsers(userData);
        }
        catch (err) {
            setError(err instanceof Error ? err.message : 'Unknown error occurred');
        }
        finally {
            setLoading(false);
        }
    }, []);
    // Load users on component mount
    useEffect(() => {
        loadUsers();
    }, [loadUsers]);
    // Filter users based on search
    const filteredUsers = useMemo(() => {
        if (!searchTerm)
            return users;
        const term = searchTerm.toLowerCase();
        return users.filter(user => user.name.toLowerCase().includes(term) ||
            user.email.toLowerCase().includes(term) ||
            user.role.toLowerCase().includes(term));
    }, [users, searchTerm]);
    // Render individual user item
    const renderItem = useCallback((user) => (_jsxs("div", { className: "user-item", children: [_jsx("img", { src: user.avatar, alt: user.name, className: "user-avatar", onError: (e) => {
                    // Handle broken images
                    const target = e.target;
                    target.src = `https://ui-avatars.com/api/?name=${encodeURIComponent(user.name)}&background=random`;
                } }), _jsxs("div", { className: "user-details", children: [_jsxs("div", { className: "user-header", children: [_jsx("span", { className: "user-name", children: user.name }), _jsx(StatusBadge, { status: user.status })] }), _jsx("div", { className: "user-email", children: user.email }), _jsx("div", { className: "user-role", children: user.role })] }), _jsxs("div", { className: "user-id", children: ["ID: ", user.id] })] })), []);
    // Show loading state
    if (loading) {
        return (_jsxs("div", { className: "user-list", children: [_jsxs("div", { className: "header-section", children: [_jsx("h1", { className: "main-title", children: "Virtualized User List" }), _jsxs("p", { className: "subtitle", children: ["Scroll smoothly through ", _jsx("strong", { children: "1,00,000" }), " users. The virtualization ensures optimal", _jsx("br", {}), "performance even with large datasets."] })] }), _jsx(LoadingSpinner, {})] }));
    }
    // Show error state
    if (error) {
        return (_jsxs("div", { className: "user-list", children: [_jsxs("div", { className: "header-section", children: [_jsx("h1", { className: "main-title", children: "Virtualized User List" }), _jsxs("p", { className: "subtitle", children: ["Scroll smoothly through ", _jsx("strong", { children: "1,00,000" }), " users. The virtualization ensures optimal", _jsx("br", {}), "performance even with large datasets."] })] }), _jsx(ErrorMessage, { message: error, onRetry: loadUsers })] }));
    }
    return (_jsxs("div", { className: "user-list", children: [_jsxs("div", { className: "header-section", children: [_jsx("h1", { className: "main-title", children: "Virtualized User List" }), _jsxs("p", { className: "subtitle", children: ["Scroll smoothly through ", _jsx("strong", { children: users.length.toLocaleString() }), " users. The virtualization ensures optimal", _jsx("br", {}), "performance even with large datasets."] })] }), _jsxs("div", { className: "search-section", children: [_jsx("input", { type: "text", placeholder: "Search users by name, email, or role...", value: searchTerm, onChange: (e) => setSearchTerm(e.target.value), className: "search-input" }), searchTerm && (_jsxs("div", { className: "search-info", children: ["Found ", filteredUsers.length.toLocaleString(), " result", filteredUsers.length !== 1 ? 's' : ''] }))] }), filteredUsers.length === 0 ? (_jsx(NoResults, { searchTerm: searchTerm })) : (_jsxs("div", { className: "virtualized-container", children: [_jsxs("div", { className: "list-header", children: ["User (", filteredUsers.length.toLocaleString(), ")"] }), _jsx(VirtualizedList, { items: filteredUsers, itemHeight: 80, height: 400, renderItem: renderItem }), _jsx(PerformanceMonitor, { totalItems: users.length, visibleItems: Math.ceil(400 / 80) })] })), _jsx("p", { className: "footer-text", children: "Built with a custom virtualized list component for optimal performance with large datasets." })] }));
};
export default UserList;
