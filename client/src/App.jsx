import AppRoutes from './routes/AppRoutes.jsx';
import Header from './components/Header.jsx';
import ErrorBoundary from './components/ErrorBoundary.jsx';

export default function App() {
  return (
    <ErrorBoundary>
      <Header />
      <main className="container">
        <AppRoutes />
      </main>
    </ErrorBoundary>
  );
}
