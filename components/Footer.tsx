import Link from "next/link";
import IUGenIcon from "./IUGenIcon";

const Footer = () => {
  return (
    <footer className="border-t border-slate-300 bg-slate-100 px-5 py-10">
      <div
        className="mx-auto grid max-w-screen-lg grid-cols-1 gap-5 
    md:grid-cols-3 md:grid-rows-[minmax(0,1fr)_min-content]"
      >
        <section>
          <h4 className="mb-3 font-bold">Resources</h4>
          <Link href="/docs">
            <a className="block text-sky-600 transition-colors hover:text-sky-400 hover:underline">
              Docs
            </a>
          </Link>
        </section>
        <section>
          <h4 className="mb-3 font-bold">More</h4>
          <a
            className="block text-sky-600 transition-colors hover:text-sky-400 hover:underline"
            href="https://github.com/Khoa-bit/IUGen2/blob/main/CODE_OF_CONDUCT.md"
            target="_blank"
            rel="noopener noreferrer"
          >
            Code of conduct
          </a>
        </section>
        <section>
          <h4 className="mb-3 font-bold">About me</h4>
          <p>Khoa Bit</p>
          <p>
            🥺 Please <b>no war</b> in{" "}
            <a
              className="text-sky-600 transition-colors hover:text-sky-400 hover:underline"
              href="https://duckduckgo.com/?q=ukraine"
              target="_blank"
              rel="noopener noreferrer"
            >
              Ukraine 🇺🇦
            </a>
          </p>
          <a
            className="block text-sky-600 transition-colors hover:text-sky-400 hover:underline"
            href="mailto:nguyenanhkhoablue@protonmail.com"
            target="_blank"
            rel="noopener noreferrer"
          >
            nguyenanhkhoablue@protonmail.com
          </a>
          <a
            className="block text-sky-600 transition-colors hover:text-sky-400 hover:underline"
            href="https://github.com/Khoa-bit/IUGen2"
            target="_blank"
            rel="noopener noreferrer"
          >
            Github
          </a>
          <a
            className="block text-sky-600 transition-colors hover:text-sky-400 hover:underline"
            href="https://www.linkedin.com/in/khoabit/"
            target="_blank"
            rel="noopener noreferrer"
          >
            LinkedIn
          </a>
        </section>
        <section className="flex items-center md:col-span-2">
          <a
            className="transition-colors hover:text-slate-500"
            href="https://github.com/Khoa-bit/IUGen2/blob/main/LICENSE"
            target="_blank"
            rel="noopener noreferrer"
          >
            License: <strong>MIT</strong>
          </a>
        </section>
        <section>
          <Link href="/compute/IUGenPage">
            <a className="block w-fit">
              <IUGenIcon className="h-12"></IUGenIcon>
            </a>
          </Link>
        </section>
      </div>
    </footer>
  );
};

export default Footer;
