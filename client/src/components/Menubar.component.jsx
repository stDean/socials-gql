import { useState } from "react";
import { Menu } from "semantic-ui-react";
import { Link, useLocation } from "react-router-dom";

const Menubar = () => {
  const user = null;

  const { pathname } = useLocation();
  const path = pathname === "/" ? "home" : pathname.split("/")[1];
  const [activeItem, setActiveItem] = useState(path);

  const handleItemClick = (e, { name }) => setActiveItem(name);

  const menuBar = user ? (
    // <Menu pointing secondary size="massive" color="teal">
    //   <Menu.Item name={user.username} active as={Link} to="/" />

    //   <Menu.Menu position="right">
    //     <Menu.Item name="logout" onClick={logout} />
    //   </Menu.Menu>
    // </Menu>
    "The other nav"
  ) : (
    <Menu pointing secondary size="massive" color="teal">
      <Menu.Item
        name="home"
        active={activeItem === "home"}
        onClick={handleItemClick}
        as={Link}
        to="/"
      />

      <Menu.Menu position="right">
        <Menu.Item
          name="login"
          active={activeItem === "login"}
          onClick={handleItemClick}
          as={Link}
          to="/login"
        />
        <Menu.Item
          name="register"
          active={activeItem === "register"}
          onClick={handleItemClick}
          as={Link}
          to="/register"
        />
      </Menu.Menu>
    </Menu>
  );

  return menuBar;
};

export default Menubar;
