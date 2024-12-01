import { ReactNode } from "react";
import Footer from "./Footer/Footer";
import { ContainerLayout } from "./Layout.styles";
import Sidebar from "./Sidebar/Sidebar";
import Topbar from "./Topbar/Topbar";

function Layout({ children }: { children: ReactNode }) {
  return (
    <ContainerLayout>
      <Topbar />
      <div className="main-sidebar">
        <Sidebar />
        <div className="body">
          <main>{children}</main>
          <Footer />
        </div>
      </div>
    </ContainerLayout>
  );
}

export default Layout;
