import React from "react";
import { Link } from "react-router-dom";

const menus = [
  {
    id: 1,
    name: "Main",
    link: "/"
  },
  {
    id: 2,
    name: "One",
    link: "/one"
  },
  {
    id: 3,
    name: "Two",
    link: "/two"
  }
];

const Sidebar = props => (
  <div>
    {menus.map(menu => (
      <Link style={{ marginRight: "5px" }} key={menu.id} to={menu.link}>
        {menu.name}
      </Link>
    ))}
  </div>
);

export default Sidebar;
