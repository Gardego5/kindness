import Header from "@components/Header";
import { Root } from "./style";

const Layout = ({ children }) => (
  <>
    <Header />
    <Root>{children}</Root>
  </>
);

export default Layout;
