import React, { useState, useMemo, useCallback, useEffect } from 'react';
import { VirtualizedList } from '../VirtualizedList/VirtualizedList';
import StatusBadge from './StatusBadge';
import { generateUsers, User } from './UserData';
import './UserList.css';
import PerformanceMonitor from './PerformanceMonitor';

// Loading component
const LoadingSpinner = () => (
  <div className="loading-container">
    <div className="spinner"></div>
    <p>Loading users...</p>
  </div>
);

// Error component
const ErrorMessage = ({ message, onRetry }: { message: string; onRetry: () => void }) => (
  <div className="error-container">
    <div className="error-icon">⚠️</div>
    <h3>Oops! Something went wrong</h3>
    <p>{message}</p>
    <button onClick={onRetry} className="retry-button">
      Try Again
    </button>
  </div>
);

// No results component
const NoResults = ({ searchTerm }: { searchTerm: string }) => (
  <div className="no-results">
    <div className="no-results-icon">🔍</div>
    <h3>No users found</h3>
    <p>No results for "{searchTerm}". Try a different search term.</p>
  </div>
);

const UserList = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

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
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Unknown error occurred');
    } finally {
      setLoading(false);
    }
  }, []);

  // Load users on component mount
  useEffect(() => {
    loadUsers();
  }, [loadUsers]);

  // Filter users based on search
  const filteredUsers = useMemo(() => {
    if (!searchTerm) return users;
    const term = searchTerm.toLowerCase();
    return users.filter(user =>
      user.name.toLowerCase().includes(term) ||
      user.email.toLowerCase().includes(term) ||
      user.role.toLowerCase().includes(term)
    );
  }, [users, searchTerm]);

  // Render individual user item
  const renderItem = useCallback((user: User) => (
    <div className="user-item">
      <img 
        src={user.avatar} 
        alt={user.name} 
        className="user-avatar"
        onError={(e) => {
          // Handle broken images
          const target = e.target as HTMLImageElement;
          target.src = `https://ui-avatars.com/api/?name=${encodeURIComponent(user.name)}&background=random`;
        }}
      />
      <div className="user-details">
        <div className="user-header">
          <span className="user-name">{user.name}</span>
          <StatusBadge status={user.status} />
        </div>
        <div className="user-email">{user.email}</div>
        <div className="user-role">{user.role}</div>
      </div>
      <div className="user-id">ID: {user.id}</div>
    </div>
  ), []);

  // Show loading state
  if (loading) {
    return (
      <div className="user-list">
        <div className="header-section">
          <h1 className="main-title">Virtualized User List</h1>
          <p className="subtitle">
            Scroll smoothly through <strong>1,00,000</strong> users. The virtualization ensures optimal<br />
            performance even with large datasets.
          </p>
        </div>
        <LoadingSpinner />
      </div>
    );
  }

  // Show error state
  if (error) {
    return (
      <div className="user-list">
        <div className="header-section">
          <h1 className="main-title">Virtualized User List</h1>
          <p className="subtitle">
            Scroll smoothly through <strong>1,00,000</strong> users. The virtualization ensures optimal<br />
            performance even with large datasets.
          </p>
        </div>
        <ErrorMessage message={error} onRetry={loadUsers} />
      </div>
    );
  }

  return (
    <div className="user-list">
      <div className="header-section">
        <h1 className="main-title">Virtualized User List</h1>
        <p className="subtitle">
          Scroll smoothly through <strong>{users.length.toLocaleString()}</strong> users. The virtualization ensures optimal<br />
          performance even with large datasets.
        </p>
      </div>

      <div className="search-section">
        <input
          type="text"
          placeholder="Search users by name, email, or role..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="search-input"
        />
        {searchTerm && (
          <div className="search-info">
            Found {filteredUsers.length.toLocaleString()} result{filteredUsers.length !== 1 ? 's' : ''}
          </div>
        )}
      </div>

      {filteredUsers.length === 0 ? (
        <NoResults searchTerm={searchTerm} />
      ) : (
        <div className="virtualized-container">
          <div className="list-header">
            User ({filteredUsers.length.toLocaleString()})
          </div>
          <VirtualizedList
            items={filteredUsers}
            itemHeight={80}
            height={400}
            renderItem={renderItem}
          />
          <PerformanceMonitor 
            totalItems={users.length} 
            visibleItems={Math.ceil(400 / 80)} // height / itemHeight
          />
        </div>
      )}

      <p className="footer-text">
        Built with a custom virtualized list component for optimal performance with large datasets.
      </p>
    </div>
  );
};

export default UserList;