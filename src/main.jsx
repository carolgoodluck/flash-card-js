import React from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-icons/font/bootstrap-icons.css";
import Root, { loader as rootLoader } from "./routes/root.jsx";
import DetailModal, {
  loader as vocabularyLoader,
} from "./routes/detailModal.jsx";

const router = createBrowserRouter([
  {
    path: "/vocabularies",
    element: <Root />,
    loader: rootLoader,
    children: [
      {
        path: "/vocabularies/:id",
        loader: vocabularyLoader,
        element: <DetailModal />,
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
