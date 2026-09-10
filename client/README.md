# NodeOps React UI

Frontend companion for the NodeOps/NestOps backend project.

## Run

```bash
cd client
npm install
npm run dev
```

The Vite dev server runs on `http://localhost:5173` and proxies `/api` calls to the backend on `http://localhost:3000`.

## 10 React interview topics demonstrated

1. Components: `Header`, `JobCard`, `ProtectedRoute`
2. Props: `JobCard` receives `job` and `onSelect`
3. State: `useState` in `Login`, `UploadCsv`, `DebugPanel`
4. Effects: `useEffect` inside `useApi`
5. Custom hooks: `useApi`, `useJobs`
6. Context API: `AuthContext`
7. React Router: `AppRoutes`
8. Forms and controlled inputs: `Login`
9. API service layer: `apiClient`, `authService`, `jobService`
10. Testing: `JobCard.test.jsx` using React Testing Library

Bonus topics: `useMemo`, `useCallback`, `React.memo`, conditional rendering, error boundaries, file upload UI.
