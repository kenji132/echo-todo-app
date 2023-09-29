import { Button, VStack } from "@chakra-ui/react";
import { FC } from "react";
import { NavLink } from "react-router-dom";

export const Home: FC = () => {
  return (
    <VStack>
      <h1>Home Page</h1>
      <Button>
        <NavLink to="/todos">Check Todos</NavLink>
      </Button>
    </VStack>
  );
};
