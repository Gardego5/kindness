import Header from "@components/Header";
import { Root } from "./style";

const Layout = ({ children }) => {
  return (
    <Root>
      <Header />
      {children}
    </Root>
  );
};

export default Layout;
