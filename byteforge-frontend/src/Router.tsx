import { createBrowserRouter, RouterProvider } from 'react-router-dom';
// import { AppHeader } from './components/Header';
import { AboutPage } from './pages/About.page';
import { ContactPage } from './pages/Contact.page';
import { HomePage } from './pages/Home.page';

const router = createBrowserRouter([
  {
    path: '/',
    element: <HomePage />,
  },
  {
    path: '/About',
    element: <AboutPage />,
  },
  {
    path: '/Contact',
    element: <ContactPage />,
  },
]);

export function Router() {
  return <RouterProvider router={router} />;
}
