import { AppEnv } from "@/constants/env";
import { FormControl, FormLabel, Input, Button } from "@chakra-ui/react";
import { useState } from "react";

type FormData = {
  title: string;
  content: string;
};

export const TodoForm = () => {
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
    <form onSubmit={handleSubmit}>
      <FormControl mt={3}>
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
      <FormControl mt={3}>
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
      <Button type="submit" mt={3} justifyContent={"center"}>
        Create Todo
      </Button>
    </form>
  );
};
