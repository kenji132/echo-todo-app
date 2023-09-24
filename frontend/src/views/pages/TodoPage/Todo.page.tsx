import { AppEnv } from "@/constants/env";
import { Todo as TodoType } from "@/modules/todo/type";
import { Text } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

type TodoPageParams = {
  id: string;
};

export const Todo = () => {
  const { id } = useParams<TodoPageParams>();
  const [todo, setTodo] = useState<TodoType>();

  useEffect(() => {
    fetch(`${AppEnv.apiUrl}/todos/${id}`)
      .then((res) => {
        if (!res.ok) {
          throw new Error("APIレスポンスがエラーを返しました。");
        }
        return res.json();
      })
      .then((data) => {
        console.log(data);
        setTodo(data);
      })
      .catch((error) => {
        console.error("APIリクエストエラー:", error);
      });
  }, []);

  if (todo != undefined) {
    return (
      <>
        <Text fontSize={"xl"}>Todo show</Text>
        <div key={todo.id}>
          <Text fontSize={"xl"}>Title: {todo.title}</Text>
          <Text fontSize={"xl"}>Content: {todo.content}</Text>
        </div>
      </>
    );
  }
  return (
    <>
      <Text fontSize={"xl"}>Todo not found.</Text>
    </>
  );
};