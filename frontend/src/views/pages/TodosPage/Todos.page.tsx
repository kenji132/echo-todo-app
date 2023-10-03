import { AppEnv } from "@/constants/env";
import { Todo } from "@/modules/todo/type";
import { TodoCreateForm } from "@/views/features/TodoCreateForm";
import { TodoIndex } from "@/views/features/TodoIndex";
import { Text, VStack } from "@chakra-ui/react";
import { useEffect, useState } from "react";

export const Todos = () => {
  const [todos, setTodos] = useState<Todo[]>([]);

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
  return (
    <>
      <Text fontSize={"3xl"}>Index</Text>
      <VStack>
        <TodoIndex todos={todos} />
      </VStack>
      <VStack>
        <TodoCreateForm />
      </VStack>
    </>
  );
};
