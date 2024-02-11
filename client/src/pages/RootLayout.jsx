import { Outlet } from "react-router-dom";
import { MenuBar } from "../components";
import { Container } from "semantic-ui-react";

const RootLayout = () => {
  return (
    <Container>
      <MenuBar />
      <Outlet />
    </Container>
  );
};

export default RootLayout;
