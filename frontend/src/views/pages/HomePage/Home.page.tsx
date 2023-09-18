import { Box } from "@chakra-ui/react";
import { FC } from "react";
import { NavLink } from "react-router-dom";

export const Home: FC = () => {
  return (
    <Box>
      <h1>Home Page</h1>
      <NavLink to="/todos">Todos</NavLink>
    </Box>
  );
};
