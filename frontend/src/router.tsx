import { createBrowserRouter } from "react-router-dom";
import { HomePage } from "./views/pages/HomePage";
import { TodosPage } from "./views/pages/TodosPage";
import { TodoPage } from "./views/pages/TodoPage";

const paths = {
  home: "/",
  todos: "/todos",
  todo: "/todos/:id",
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
      {
        path: paths.todo,
        element: <TodoPage />,
      },
    ]);
  },
};
