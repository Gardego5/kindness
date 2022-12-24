import logoutRounded from "@iconify/icons-material-symbols/logout-rounded";
import { Icon } from "@iconify/react";
import Link from "next/link";

const LogoutButton = (props) => (
  <Link
    href={props.href ?? "/api/logout"}
    title={props.title ?? "Logout"}
    {...props}
  >
    <Icon icon={logoutRounded} />
  </Link>
);

export default LogoutButton;
