import { createBrowserRouter } from "react-router-dom";
import Root from "./Root";
import Home from "./Home";
import Tv from "./Tv";
import Search from "./Search";
import Movie from "./Movie";
import TvShow from "./TvShow";

export const router = createBrowserRouter(
  [
    {
      path: "/",
      element: <Root />,
      children: [
        {
          path: "",
          element: <Home />,
          children: [
            {
              path: "movie/:movieId",
              element: <Movie />,
            },
          ],
        },
        {
          path: "tv",
          element: <Tv />,
          children: [
            {
              path: ":tvShowId",
              element: <TvShow />,
            },
          ],
        },
        {
          path: "search",
          element: <Search />,
        },
      ],
    },
  ],
  { basename: process.env.PUBLIC_URL }
);
