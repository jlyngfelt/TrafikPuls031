import React, { useState } from 'react';

const RefreshButton = ({ onRefresh }) => {
  const [isRefreshing, setIsRefreshing] = useState(false);

  const handleRefresh = async () => {
    if (isRefreshing) return;
    
    setIsRefreshing(true);
    
    try {
      await onRefresh();
    } catch (error) {
      console.error("Error refreshing data:", error);
    } finally {
      setIsRefreshing(false);
    }
  };

  const buttonStyle = {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '8px',
    backgroundColor: '#9db092',
    color: '#000000',
    padding: '10px 16px',
    borderRadius: '6px',
    border: 'none',
    fontWeight: '500',
    cursor: 'pointer',
    transition: 'all 0.2s ease',
    boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
    marginBottom: '0',
  };

  const hoverStyle = {
    backgroundColor: '#b8ccad', 
    transform: 'translateY(-2px)',
    boxShadow: '0 4px 8px rgba(0,0,0,0.15)',
  };

  const refreshIconStyle = {
    display: 'inline-block',
    width: '18px',
    height: '18px',
    animation: isRefreshing ? 'spin 1s linear infinite' : 'none'
  };

  return (
    <button
      style={buttonStyle}
      onClick={handleRefresh}
      onMouseOver={(e) => {
        Object.assign(e.currentTarget.style, hoverStyle);
      }}
      onMouseOut={(e) => {
        e.currentTarget.style.backgroundColor = buttonStyle.backgroundColor;
        e.currentTarget.style.transform = 'none';
        e.currentTarget.style.boxShadow = buttonStyle.boxShadow;
      }}
      disabled={isRefreshing}
    >
      <svg
        style={refreshIconStyle}
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M23 4v6h-6"></path>
        <path d="M1 20v-6h6"></path>
        <path d="M3.51 9a9 9 0 0 1 14.85-3.36L23 10M1 14l4.64 4.36A9 9 0 0 0 20.49 15"></path>
      </svg>
      {isRefreshing ? 'Uppdaterar...' : 'Uppdatera trafikdata'}
    </button>
  );
};

export default RefreshButton;