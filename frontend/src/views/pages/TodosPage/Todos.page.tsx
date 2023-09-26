import { AppEnv } from "@/constants/env";
import { Todo } from "@/modules/todo/type";
import { router } from "@/router";
import { TodoCreateForm } from "@/views/features/TodoCreateForm";
import { Button, Text, VStack } from "@chakra-ui/react";
import { useState } from "react";
import { NavLink } from "react-router-dom";

export const Todos = () => {
  const [todos, setTodos] = useState<Todo[]>([]);

  return (
    <>
      <VStack>
        <Button
          colorScheme="teal"
          onClick={() => {
            fetch(`${AppEnv.apiUrl}/todos`)
              .then((res) => {
                if (!res.ok) {
                  throw new Error("APIレスポンスがエラーを返しました。");
                }
                return res.json();
              })
              .then((data) => {
                setTodos(data);
              })
              .catch((error) => {
                console.error("APIリクエストエラー:", error);
              });
          }}
        >
          Get Todos
        </Button>

        <Text fontSize={"3xl"}>Index</Text>
        {todos.map((todo) => {
          return (
            <div key={todo.id}>
              <Text fontSize={"xl"}>Title: {todo.title}</Text>
              <Text fontSize={"xl"}>Content: {todo.content}</Text>
              <Button>
                <NavLink to={router.getPath("todo", { id: todo.id })}>
                  Go to show
                </NavLink>
              </Button>
            </div>
          );
        })}
        <TodoCreateForm />
      </VStack>
    </>
  );
};
