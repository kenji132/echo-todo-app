import { createBrowserRouter } from "react-router-dom";
import { HomePage } from "./views/pages/HomePage";
import { TodosPage } from "./views/pages/TodosPage";

const paths = {
  home: "/",
  todos: "/todos",
} as const

export const router = {
  create() {
    return createBrowserRouter([
      {
        path: paths.home,
        element: <HomePage />,
      },
      {
        path: paths.todos,
        element: <TodosPage />,
      },
    ]);
  },
};
