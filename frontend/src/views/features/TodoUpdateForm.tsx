import { AppEnv } from "@/constants/env";
import { Todo } from "@/modules/todo/type";
import { FormControl, FormLabel, Input, Button, Text } from "@chakra-ui/react";
import { useState } from "react";

type FormData = {
  title: string;
  content: string;
};

type PropsType = Todo;

export const TodoUpdateForm = (props: PropsType) => {
  const [formData, setFormData] = useState<FormData>({
    title: props.title,
    content: props.content,
  });
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log(JSON.stringify(formData));
    await fetch(`${AppEnv.apiUrl}/todos/${props.id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    });
    setIsOpen(false);
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
      {isOpen ? (
        <>
          <Text fontSize={"xl"}>Todo show</Text>
          <form onSubmit={handleSubmit}>
            <FormControl>
              <FormLabel>Title</FormLabel>
              <Input
                type="text"
                id="title"
                name="title"
                value={formData.title}
                onChange={handleInputChange}
                required
              />
            </FormControl>
            <FormControl>
              <FormLabel>Content</FormLabel>
              <Input
                type="text"
                id="content"
                name="content"
                value={formData.content}
                onChange={handleInputChange}
                required
              />
            </FormControl>
            <Button type="submit">Update Todo</Button>
          </form>
          <Button onClick={() => setIsOpen(false)}>cancel</Button>
        </>
      ) : (
        <>
          <Text fontSize={"xl"}>Todo show</Text>
          <div>
            <Text fontSize={"xl"}>Title: {formData.title}</Text>
            <Text fontSize={"xl"}>Content: {formData.content}</Text>
          </div>
          <Button onClick={() => setIsOpen(true)}>Edit Todo</Button>
        </>
      )}
    </>
  );
};
