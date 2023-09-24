import { AppEnv } from "@/constants/env";
import { Todo } from "@/modules/todo/type";
import { TodoForm } from "@/views/features/TodoForm";
import { Button, Text, VStack } from "@chakra-ui/react";
import { useState } from "react";

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
            </div>
          );
        })}
        <TodoForm />
      </VStack>
    </>
  );
};
