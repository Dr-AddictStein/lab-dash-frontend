import { createBrowserRouter } from "react-router-dom";
import Main from "../Layout/Main";
import Home from "../Pages/Home";
import CreateNewLab from "../Pages/CreateNewLab";
import LabDetails from "../Pages/LabDetails";
import UpdateLab from "../Pages/UpdateLab";

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
      {
        path: "/labdetails/:labId",
        element: <LabDetails />,
      },
      {
        path: "/updatelab",
        element: <UpdateLab />,
      },
    ],
  },
]);
