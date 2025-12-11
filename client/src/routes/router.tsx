import { lazy } from 'react';
import Home from '../pages/Home';
import { Route, createBrowserRouter, createRoutesFromElements } from 'react-router-dom';
import ProtectedRoute from './ProtectedRoute';
import Login from '../pages/Login';
import SignUp from '../pages/SignUp';
import Profile from '../pages/Profile';

const ChatAssistant = lazy(() => import('../pages/ChatAssistant'));
const Milestones = lazy(() => import('../pages/Milestones'));

export const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/">
      <Route index element={<Home />} />
      <Route path="login" element={<Login />} />
      <Route path="signup" element={<SignUp />} />
      <Route
        path="profile"
        element={
          <ProtectedRoute>
            <Profile />
          </ProtectedRoute>
        }
      />

      <Route
        path="chat"
        element={
          <ProtectedRoute>
            <ChatAssistant />
          </ProtectedRoute>
        }
      />

      <Route
        path="milestones"
        element={
          <ProtectedRoute>
            <Milestones />
          </ProtectedRoute>
        }
      />
    </Route>
  )
);
