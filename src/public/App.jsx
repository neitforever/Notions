import React from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Login from "../routes/Login.jsx";
import AboutUser from "../routes/AboutUser.jsx";
import RequireAuth from "../components/RequireAuth.jsx";
import UserNotes from "../routes/UserNotes.jsx";
import SignUp from "../routes/SignUp.jsx";
import CreateNote from "../routes/CreateNote.jsx";
import EditNote, { loader as noteEditLoader } from "../routes/EditNote.jsx";
import HomeLayout from "../routes/HomeLayout.jsx";
import PageNotFound from "../routes/PageNotFound.jsx";
import ViewNote, { loader as viewNoteLoader } from "../routes/ViewNote.jsx";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import store, { persistor } from "../redux/index.js";

const router = createBrowserRouter([
  {
    path: "/sign/",
    element: <SignUp />,
  },
  {
    path: "/",
    element: <Login />,
  },
  {
    path: "/404",
    element: <PageNotFound />,
  },
  {
    path: "/home/",
    element: (
      <RequireAuth>
        <HomeLayout />
      </RequireAuth>
    ),
    children: [
      {
        path: "/home/about/",
        element: <AboutUser />,
      },
      {
        path: "/home/notes/:id",
        element: <UserNotes />,
      },
      {
        path: "/home/notes/create-note",
        element: <CreateNote />,
      },
      {
        path: "/home/notes/edit-note/:id",
        loader: noteEditLoader,
        element: <EditNote />,
      },
      {
        path: "/home/notes/view-note/:id",
        loader: viewNoteLoader,
        element: <ViewNote />,
      },
    ],
  },
  {
    path: "*",
    element: <PageNotFound />,
  },
]);
export default function App() {
  return (
    <Provider store={store}>
    <PersistGate loading={<div>Loading...</div>} persistor={persistor}>
      <RouterProvider router={router} />
    </PersistGate>
  </Provider>  );
}
