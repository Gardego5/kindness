import { userContext } from "@context/userContext";
import Link from "next/link";
import { useContext } from "react";
import { Root } from "./style";

const Header = () => {
  const { user, name } = useContext(userContext);

  return (
    <Root>
      <Link href="/">
        <h1>Kindness</h1>
      </Link>

      <nav>
        {user && (
          <>
            <Link href="/user">{name}</Link>
            <Link href="/api/logout">Logout</Link>
          </>
        )}
      </nav>
    </Root>
  );
};

export default Header;
