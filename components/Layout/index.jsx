import AlertModal from "@components/AlertModal";
import Header from "@components/Header";
import { Root } from "./style";

const Layout = ({ children }) => {
  return (
    <>
      <Header />
      <Root>{children}</Root>
    </>
  );
};

export default Layout;
