import Image from "next/image";
import Link from "next/link";
import GithubIcon from "./icons/GithubIcon";
import IUGenTextIcon from "./IUGenTextIcon";
import profilePic from "../public/Edited.jpg";

const Header = () => {
  return (
    <header className="border-b border-slate-300 bg-white p-5">
      <nav className="mx-auto flex max-w-screen-lg flex-col items-center gap-3 sm:flex-row">
        <Link href="/">
          <a className="">
            <IUGenTextIcon className="h-14"></IUGenTextIcon>
          </a>
        </Link>
        <Link href="/docs">
          <a className="block text-lg font-semibold text-sky-500 transition-colors hover:text-sky-400 hover:underline sm:ml-12 sm:mr-auto">
            Docs
          </a>
        </Link>
        <a
          href="https://github.com/Khoa-bit/IUGen2"
          target="_blank"
          rel="noopener noreferrer"
        >
          <GithubIcon className="h-8 text-indigo-500 drop-shadow-[0px_1px_3px_rgba(129,140,248,0.8)] transition-colors hover:text-indigo-400"></GithubIcon>
        </a>
        <a
          className="flex items-center gap-3 rounded-full 
        bg-slate-500 p-1 text-white shadow shadow-slate-400 transition-colors hover:bg-slate-400"
          href="https://www.linkedin.com/in/khoabit/"
          target="_blank"
          rel="noopener noreferrer"
        >
          <Image
            className="rounded-full"
            src={profilePic}
            alt="Picture of the me"
            width={32}
            height={32}
            objectFit="cover"
          ></Image>
          <p className="mr-3 font-bold" title="ITITIU19141 - Computer Science">
            Nguyễn Anh Khoa
          </p>
        </a>
      </nav>
    </header>
  );
};

export default Header;
