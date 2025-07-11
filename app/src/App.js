import React, { useState, useEffect } from 'react';

function App() {
  const [mostWanted, setMostWanted] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchMostWanted = async () => {
      try {
        setLoading(true);
        const response = await fetch('api/get_most_wanted');
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        setMostWanted(data.items || []);
      } catch (err) {
        setError(err.message);
        console.error('Error fetching most wanted:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchMostWanted();
  }, []);

  if (loading) {
    return (
      <div style={{ padding: '20px', textAlign: 'center' }}>
        <h1>FBI Most Wanted</h1>
        <div className="loading-spinner"></div>
        <p>Loading...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div style={{ padding: '20px', textAlign: 'center' }}>
        <h1>FBI Most Wanted</h1>
        <p style={{ color: 'red' }}>Error: {error}</p>
        <button onClick={() => window.location.reload()}>Retry</button>
      </div>
    );
  }

  return (
    <div style={{ padding: '20px', maxWidth: '1200px', margin: '0 auto' }}>
      <h1 style={{ textAlign: 'center', marginBottom: '30px' }}>FBI Most Wanted</h1>
      
      {mostWanted.length === 0 ? (
        <p style={{ textAlign: 'center' }}>No most wanted items found.</p>
      ) : (
        <div style={{ 
          display: 'grid', 
          gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', 
          gap: '20px' 
        }}>
          {mostWanted.map((person, index) => (
            <div key={person.uid || index} className="card" style={{
              border: '1px solid #ddd',
              borderRadius: '8px',
              padding: '15px',
              backgroundColor: '#ffffff',
              boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
            }}>
              {person.images && person.images.length > 0 && (
                <img 
                  src={person.images[0].original} 
                  alt={person.title || 'FBI Most Wanted'}
                  style={{
                    width: '100%',
                    height: '200px',
                    objectFit: 'cover',
                    borderRadius: '4px',
                    marginBottom: '10px'
                  }}
                />
              )}
              
              <h3 style={{ margin: '0 0 10px 0', color: '#333' }}>
                {person.title || 'Unknown'}
              </h3>
              
              {person.subjects && person.subjects.length > 0 && (
                <p style={{ margin: '5px 0', fontWeight: 'bold' }}>
                  Subject: {person.subjects.join(', ')}
                </p>
              )}
              
              {person.description && (
                <p style={{ 
                  margin: '10px 0', 
                  fontSize: '14px', 
                  lineHeight: '1.4',
                  maxHeight: '100px',
                  overflow: 'hidden',
                  textOverflow: 'ellipsis'
                }}>
                  {person.description.length > 200 
                    ? person.description.substring(0, 200) + '...' 
                    : person.description
                  }
                </p>
              )}
              
              {person.reward_text && (
                <p style={{ 
                  margin: '10px 0', 
                  fontWeight: 'bold', 
                  color: '#d32f2f',
                  fontSize: '16px'
                }}>
                  Reward: {person.reward_text}
                </p>
              )}
              
              {person.url && (
                <a 
                  href={person.url} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  style={{
                    display: 'inline-block',
                    marginTop: '10px',
                    padding: '8px 16px',
                    backgroundColor: '#1976d2',
                    color: 'white',
                    textDecoration: 'none',
                    borderRadius: '4px',
                    fontSize: '14px'
                  }}
                >
                  View Details
                </a>
              )}
            </div>
          ))}
        </div>
      )}
      
      <div style={{ textAlign: 'center', marginTop: '30px', fontSize: '12px', color: '#666' }}>
        Data provided by FBI's Most Wanted API
      </div>
    </div>
  );
}

export default App;
