import "./App.css";
import { Outlet, RouterProvider, createBrowserRouter } from "react-router-dom";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import FavoritesPage from "./pages/FavoritesPage/FavoritesPage";
import PopularMoviesPage from "./pages/PopularMoviesPage/PopularMoviesPage";
import SearchMoviesPage from "./pages/SearchMoviesPage/SearchMoviesPage";
import MovieDetailPage from "./pages/MovieDetailPage/MovieDetailPage";

function App() {
  const Layout = () => {
    return (
      <>
        <Navbar />
        <Outlet />
        <Footer />
      </>
    );
  };

  const router = createBrowserRouter([
    {
      path: "/",
      element: <Layout />,
      children: [
        {
          path: "/",
          element: <PopularMoviesPage />,
        },
        {
          path: "/search",
          element: <SearchMoviesPage />,
        },
        {
          path: "/movie/:id",
          element: <MovieDetailPage />,
        },
        {
          path: "/favorites",
          element: <FavoritesPage />,
        },
        // {
        //   path: "/cart",
        //   element: <CartPage />,
        // },
      ],
    },
  ]);
  return (
    <RouterProvider router={router}>
      <Layout />
    </RouterProvider>
  );
}

export default App;
