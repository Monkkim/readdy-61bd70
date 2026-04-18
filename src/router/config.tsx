import type { RouteObject } from "react-router-dom";
import NotFound from "../pages/NotFound";
import Home from "../pages/home/page";
import Services from "../pages/services/page";
import About from "../pages/about/page";
import Testimonials from "../pages/testimonials/page";
import Insights from "../pages/insights/page";

const routes: RouteObject[] = [
  {
    path: "/",
    element: <Home />,
  },
  {
    path: "/services",
    element: <Services />,
  },
  {
    path: "/about",
    element: <About />,
  },
  {
    path: "/testimonials",
    element: <Testimonials />,
  },
  {
    path: "/insights",
    element: <Insights />,
  },
  {
    path: "*",
    element: <NotFound />,
  },
];

export default routes;
