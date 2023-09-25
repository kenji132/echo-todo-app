import { createBrowserRouter } from "react-router-dom";
import { HomePage } from "./views/pages/HomePage";
import { TodosPage } from "./views/pages/TodosPage";
import { TodoPage } from "./views/pages/TodoPage";

const paths = {
  home: "/",
  todos: "/todos",
  todo: "/todos/:id",
} as const

type PathType = keyof typeof paths

export type PathParams<T extends keyof typeof paths> = {
  home: undefined
  todos: undefined
  todo: { id: number }
}[T]

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
  getPath<T extends PathType>(pathType: T, params?: PathParams<T>): string {
    const path: string = paths[pathType]

    if (params == null) {
      return path
    }

    return Object.entries(params).reduce((accPath, [key, value]) => {
      return accPath.replace(`:${key}`, value.toString())
    }, path)
  },
};
