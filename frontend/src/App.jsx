import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import NotFound from 'pages/NotFound/NotFound';
import Home from 'pages/Home/Home';
import Login from 'pages/Login/Login';
import Sign from 'pages/Sign/Sign';
import Admin from 'pages/Admin/Admin';
import Products from 'pages/Products/Products';
import Product from 'pages/Product/Product';
import AboutUs from 'pages/AboutUs/AboutUs';

const routes = createBrowserRouter([
  { path: '*', element: <NotFound /> },
  { path: '/', element: <Home /> },
  { path: '/sign', element: <Sign /> },
  { path: '/login', element: <Login /> },
  { path: '/admin', element: <Admin /> },
  { path: '/produtos', element: <Products /> },
  { path: '/produto/:id', element: <Product /> },
  { path: '/quem-somos', element: <AboutUs /> },
]);

export default function App() {
  return <RouterProvider router={routes} />;
}
