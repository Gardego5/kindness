import homeIcon from "@iconify/icons-material-symbols/home-outline-rounded";
import { Icon } from "@iconify/react";
import Link from "next/link";

const HomeButton = (props) => (
  <Link href={props.href ?? "/"} title={props.title ?? "Home"} {...props}>
    <Icon icon={homeIcon} />
  </Link>
);

export default HomeButton;
