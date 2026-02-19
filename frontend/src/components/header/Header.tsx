import { NavLink } from "react-router-dom";
import style from "./Header.module.scss";

const Header = () => {
    const menu = [
        {
            id: 1,
            title: "Home",
            path: "/"
        },
        {
            id: 2,
            title: "Products",
            path: "/products"
        },
    ];

    return (
        <ul className={style.list}>
            {menu.map((item) => (
                <li key={item.id}>
                    <NavLink
                        to={item.path}
                        className={({ isActive }) =>
                            isActive ? `${style.link} ${style.active}` : style.link
                        }
                        end={item.path === "/"}
                    >
                        {item.title}
                    </NavLink>
                </li>
            ))}
        </ul>
    );
};

export default Header;

