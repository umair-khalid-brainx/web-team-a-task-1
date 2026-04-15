import React, { useState } from 'react';
import './App.css';

function App() {
  const [inputText, setInputText] = useState('');
  const [response, setResponse] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async () => {
    setLoading(true);
    setError('');
    setResponse('');

    try {
      const backendUrl = process.env.REACT_APP_BACKEND_URL || 'http://localhost:3000'; // Adjust as needed
      const response = await fetch(`${backendUrl}/openai/process-text`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ text: inputText }),
      });

      const data = await response.json();

      if (response.ok) {
        setResponse(data.output);
      } else {
        setError(data.error || 'An unknown error occurred.');
      }
    } catch (err) {
      console.error('Failed to send text to backend:', err);
      setError('Failed to connect to the backend API.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="App">
      <header className="App-header">
        <h1>Enter Project Instructions</h1>
        <p>Please enter your project requirements below to generate dev-ready tasks.</p>
      </header>
      <main>
        <textarea
          className="text-input"
          placeholder="Type your project requirements here..."
          value={inputText}
          onChange={(e) => setInputText(e.target.value)}
          rows={10}
          cols={80}
          disabled={loading}
        ></textarea>
        <br />
        <button onClick={handleSubmit} disabled={loading}>
          {loading ? 'Processing...' : 'Submit Instructions'}
        </button>

        {error && <p className="error-message">Error: {error}</p>}

        {response && (
          <div className="response-container">
            <h2>Dev-Ready Instructions:</h2>
            <p style={{ whiteSpace: 'pre-wrap' }}>{response}</p>
          </div>
        )}
      </main>
    </div>
  );
}

export default App;
