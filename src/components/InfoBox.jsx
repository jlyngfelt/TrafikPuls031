import React from 'react';

const InfoBox = () => {
  const priorities = [
    { level: 1, name: 'Mycket allvarlig händelse', color: 'var(--prio-1)' },
    { level: 2, name: 'Stor händelse', color: 'var(--prio-2)' },
    { level: 3, name: 'Störning', color: 'var(--prio-3)' },
    { level: 4, name: 'Information', color: 'var(--prio-4)' },
    { level: 5, name: 'Mindre störning', color: 'var(--prio-5)' }
  ];

  const legendStyle = {
    backgroundColor: '#f9f9f9',
    padding: '20px',
    borderRadius: '8px',
    boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
    marginBottom: '30px',
    fontFamily: 'system-ui, Avenir, Helvetica, Arial, sans-serif'
  };

  const tableStyle = {
    width: '100%',
    borderCollapse: 'collapse',
    marginTop: '10px'
  };

  const thStyle = {
    backgroundColor: '#333',
    color: 'white',
    padding: '12px 15px',
    textAlign: 'left',
    fontSize: '14px',
    fontWeight: '600'
  };

  const tdStyle = {
    padding: '12px 15px',
    borderBottom: '1px solid #ddd',
    verticalAlign: 'middle'
  };

  const colorBoxStyle = (color) => ({
    width: '30px',
    height: '30px',
    backgroundColor: color,
    borderRadius: '4px',
    boxShadow: '0 1px 3px rgba(0,0,0,0.2)',
    display: 'inline-block'
  });

  const levelStyle = {
    fontWeight: '600',
    fontSize: '16px',
    color: '#333'
  };

  const descriptionStyle = {
    color: '#555',
    fontSize: '15px'
  };

  return (
    <div style={legendStyle}>
      <h2 style={{ marginTop: 0, marginBottom: '15px', color: '#333' }}>
        Prioritetsnivåer för trafikhändelser
      </h2>
      <p style={{ color: '#666', marginBottom: '20px' }}>
        Varje trafikhändelse har en prioritetsnivå som indikerar allvarlighetsgraden:
      </p>
      <table style={tableStyle}>
        <thead>
          <tr>
            <th style={thStyle}>Nivå</th>
            <th style={thStyle}>Färg</th>
            <th style={thStyle}>Beskrivning</th>
          </tr>
        </thead>
        <tbody>
          {priorities.map((priority) => (
            <tr key={priority.level}>
              <td style={tdStyle}>
                <span style={levelStyle}>{priority.level}</span>
              </td>
              <td style={tdStyle}>
                <div style={colorBoxStyle(priority.color)} />
              </td>
              <td style={tdStyle}>
                <span style={descriptionStyle}>{priority.name}</span>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default InfoBox;