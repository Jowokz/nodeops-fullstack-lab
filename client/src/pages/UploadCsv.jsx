import { useState } from 'react';
import { uploadCsv } from '../services/jobService.js';

export default function UploadCsv() {
  const [file, setFile] = useState(null);
  const [result, setResult] = useState(null);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  async function handleSubmit(event) {
    event.preventDefault();
    if (!file) return setError('Please choose a CSV file first.');
    setLoading(true);
    setError('');
    try {
      const response = await uploadCsv(file);
      setResult(response);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }

  return (
    <section className="panel">
      <h1>Upload CSV</h1>
      <p>Demonstrates forms, file input, controlled state, API service separation, and conditional rendering.</p>
      <form onSubmit={handleSubmit}>
        <input type="file" accept=".csv" onChange={(e) => setFile(e.target.files[0])} />
        <button disabled={loading}>{loading ? 'Uploading...' : 'Upload'}</button>
      </form>
      {error && <p className="error">{error}</p>}
      {result && <pre>{JSON.stringify(result, null, 2)}</pre>}
    </section>
  );
}
