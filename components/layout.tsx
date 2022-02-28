import { ReactElement } from "react";
import Footer from "./Footer";
import Header from "./Header";

interface LayoutProps {
  children: ReactElement;
}

const Layout = ({ children }: LayoutProps) => {
  return (
    <section
      className="grid min-h-screen grid-cols-1 
    grid-rows-[max-content_1fr_max-content] text-slate-900
    selection:bg-sky-300 selection:text-sky-900"
    >
      <Header></Header>
      <main
        className="mx-auto flex w-full flex-col items-center 
      gap-10 p-5"
      >
        {children}
      </main>
      <Footer></Footer>
    </section>
  );
};

export default Layout;
