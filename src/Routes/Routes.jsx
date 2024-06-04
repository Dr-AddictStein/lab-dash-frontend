import { createBrowserRouter } from "react-router-dom";
import Main from "../Layout/Main";
import Home from "../Pages/Home";
import CreateNewLab from "../Pages/CreateNewLab";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Main />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/createnewlab",
        element: <CreateNewLab />,
      },
    ],
  },
]);
