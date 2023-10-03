import { AppEnv } from "@/constants/env";
import { Todo } from "@/modules/todo/type";
import { router } from "@/router";
import { TodoCreateForm } from "@/views/features/TodoCreateForm";
import { Button, HStack, Text, VStack } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export const Todos = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
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
  });
  const done_todos = todos.filter((todo) => todo.is_done == true);
  const not_done_todos = todos.filter((todo) => todo.is_done == false);
  return (
    <>
      <Text fontSize={"3xl"}>Index</Text>
      <VStack>
        <HStack spacing={20}>
          <VStack spacing={5}>
            <Text>Done Todo list</Text>
            {not_done_todos.map((todo) => {
              return (
                <div key={todo.id}>
                  <Text fontSize={"xl"}>Title: {todo.title}</Text>
                  <Text fontSize={"xl"}>Content: {todo.content}</Text>
                  <Button
                    onClick={() => {
                      navigate(router.getPath("todo", { id: todo.id }));
                    }}
                  >
                    Go to show
                  </Button>
                  <Button
                    onClick={() => {
                      fetch(`${AppEnv.apiUrl}/todos/${todo.id}`, {
                        method: "PUT",
                        headers: {
                          "Content-Type": "application/json",
                        },
                        body: JSON.stringify({
                          title: todo.title,
                          content: todo.content,
                          is_done: true,
                        }),
                      });
                    }}
                    colorScheme="teal"
                  >
                    complete
                  </Button>
                </div>
              );
            })}
          </VStack>
          <VStack spacing={5}>
            <Text>Not Done Todo list</Text>
            {done_todos.map((todo) => {
              return (
                <div key={todo.id}>
                  <Text fontSize={"xl"}>Title: {todo.title}</Text>
                  <Text fontSize={"xl"}>Content: {todo.content}</Text>
                  <Button
                    onClick={() => {
                      navigate(router.getPath("todo", { id: todo.id }));
                    }}
                  >
                    Go to show
                  </Button>
                </div>
              );
            })}
          </VStack>
        </HStack>
      </VStack>
      <VStack>
        <TodoCreateForm />
      </VStack>
    </>
  );
};
