import { AppEnv } from "@/constants/env";
import { Todo } from "@/modules/todo/type";
import {
  Button,
  FormControl,
  FormLabel,
  Input,
  Text,
  VStack,
} from "@chakra-ui/react";
import React, { useState } from "react";

type FormData = {
  title: string;
  content: string;
};

export const Todos = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [formData, setFormData] = useState<FormData>({
    title: "",
    content: "",
  });

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log(JSON.stringify(formData));
    await fetch(`${AppEnv.apiUrl}/todos`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    });
    setFormData({ title: "", content: "" });
  };

  const handleInputChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

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
        <form onSubmit={handleSubmit}>
          <FormControl mt={3}>
            <FormLabel>Title</FormLabel>
            <Input
              type="text"
              id="title"
              name="title"
              value={formData.title}
              onChange={handleInputChange}
            />
          </FormControl>
          <FormControl mt={3}>
            <FormLabel>Content</FormLabel>
            <Input
              type="text"
              id="content"
              name="content"
              value={formData.content}
              onChange={handleInputChange}
            />
          </FormControl>
          <Button type="submit" mt={3} justifyContent={"center"}>
            Create Todo
          </Button>
        </form>
      </VStack>
    </>
  );
};
