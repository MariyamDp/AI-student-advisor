import { lazy } from 'react';
import Home from '../pages/Home';
import { Route, createBrowserRouter, createRoutesFromElements } from 'react-router-dom';

const ChatAssistant = lazy(() => import('../pages/ChatAssistant'));

export const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/">
      <Route index element={<Home />} />
      <Route path="chat" element={<ChatAssistant />} />
    </Route>
  )
);
