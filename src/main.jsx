import React from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-icons/font/bootstrap-icons.css";
import Root from "./routes/root.jsx";
import DetailModal, {
  loader as vocabularyLoader,
} from "./routes/detailModal.jsx";
import VocabularyList, {allVocabularyLoader, familiarVocabularyLoader, unfamiliarVocabularyLoader} from "./components/vocabularyList.jsx";

const router = createBrowserRouter([
  {
    path: "/vocabularies",
    element: <Root />,
    children: [
      {
        path: "all",
        loader: allVocabularyLoader,
        element: <VocabularyList />,
        children: [{
          path: ":id",
          loader: vocabularyLoader,
          element: <DetailModal />,
        }],
      },
      {
        path: "familiar",
        element: <VocabularyList />,
        loader: familiarVocabularyLoader,
        children: [{
          path: ":id",
          loader: vocabularyLoader,
          element: <DetailModal />,
        }],
      },
      {
        path: "unfamiliar",
        element: <VocabularyList />,
        loader: unfamiliarVocabularyLoader,
        children: [{
          path: ":id",
          loader: vocabularyLoader,
          element: <DetailModal />,
        }],
      }
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
