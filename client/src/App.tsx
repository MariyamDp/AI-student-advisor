import { RouterProvider } from 'react-router-dom';
import { router } from './routes/router';
import { Suspense } from 'react';
import { AuthProvider } from './context/AuthContext';

function App() {
  return (
    <AuthProvider>
      <Suspense fallback={<div>Loading…</div>}>
        <RouterProvider router={router} />
      </Suspense>
    </AuthProvider>
  );
}

export default App;
