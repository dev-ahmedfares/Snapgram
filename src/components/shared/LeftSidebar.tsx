import { sidebarLinks } from "@/constants";
import { useAuthContext } from "@/context/AuthContext";
import { INavLink } from "@/types";
import { Link, NavLink, useLocation, useNavigate } from "react-router-dom";
import { Button } from "../ui/button";
import { useSignOutAccount } from "@/lib/react-query/queries";
import { useEffect } from "react";

export default function LeftSidebar() {
  const { user } = useAuthContext();
  const { pathname } = useLocation();
  const { signOut, isSuccess } = useSignOutAccount();
  const navigate = useNavigate();

  useEffect(() => {
    if (isSuccess) navigate(0);
  }, [isSuccess]);

  return (
    <nav className="leftsidebar">
      <div className="flex flex-col gap-11">
        <Link to="/">
          <img
            src="/assets/images/logo.svg"
            alt="logo"
            width={170}
            height={36}
          />
        </Link>
        <Link to={`/profile/${user.id}`} className="flex items-center gap-3">
          <img
            src={user.imageUrl || "/assets/icons/profile-placeholder.svg"}
            alt="profile image"
            className="h-14 w-14 rounded-full object-cover"
          />
          <div className="flex flex-col">
            <p className="body-bold">{user.name}</p>
            <p className="small-medium text-light-3">@{user.username}</p>
          </div>
        </Link>

        <ul className="flex flex-col gap-5">
          {sidebarLinks.map((link: INavLink) => {
            const isActive = pathname === link.route;
            return (
              <li
                key={link.label}
                className={`${isActive && "bg-primary-500"} leftsidebar-link group`}>
                <NavLink
                  to={link.route}
                  className="flex items-center gap-5 p-4">
                  <img
                    src={link.imgURL}
                    alt="img"
                    className={`${isActive && "invert-white"} group-hover:invert-white`}
                  />
                  <p>{link.label}</p>
                </NavLink>
              </li>
            );
          })}
        </ul>
      </div>
      <Button
        variant={"ghost"}
        className="shad-button_ghost"
        onClick={() => signOut()}>
        <img src="/assets/icons/logout.svg" alt="logout" />
      <p className="small-medium">Logout</p>
      </Button>
      
    </nav>
  );
}
