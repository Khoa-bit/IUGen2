import type { NextPage } from "next";
import IUGen from "../../components/IUGen";

const IUGenPage: NextPage = () => {
  return (
    <main className="mx-auto flex max-w-screen-lg flex-col gap-10 p-5 selection:bg-sky-300 selection:text-sky-900">
      <IUGen></IUGen>
    </main>
  );
};

export default IUGenPage;
