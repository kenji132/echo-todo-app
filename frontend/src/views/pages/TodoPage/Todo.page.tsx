import { AppEnv } from "@/constants/env";
import { Todo as TodoType } from "@/modules/todo/type";
import { router } from "@/router";
import { TodoUpdateForm } from "@/views/features/TodoUpdateForm";
import { Button, Text } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

type TodoPageParams = {
  id: string;
};

export const Todo = () => {
  const { id } = useParams<TodoPageParams>();
  const [todo, setTodo] = useState<TodoType>();
  const navigate = useNavigate();

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

  if (todo != undefined && id != undefined) {
    return (
      <>
        <TodoUpdateForm {...todo} />
        <Button
          onClick={() => {
            navigate(router.getPath("todos"));
          }}
        >
          Back to index
        </Button>
      </>
    );
  }
  return (
    <>
      <Text fontSize={"xl"}>Todo not found.</Text>
      <Button
        onClick={() => {
          navigate(router.getPath("todos"));
        }}
      >
        Back to index
      </Button>
    </>
  );
};
