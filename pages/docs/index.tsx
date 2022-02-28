import { TableIcon } from "@heroicons/react/solid";
import type { NextPage } from "next";
import Image from "next/image";
import ChromeIcon from "../../components/ChromeIcon";
import EdgeIcon from "../../components/EdgeIcon";
import FirefoxIcon from "../../components/FirefoxIcon";
import highlightClasses from "../../public/highlightClasses.png";
import highlightClassesChrome from "../../public/highlightClassesChrome.png";
import pasteClassInput from "../../public/pasteClassInput.png";
import sheetButton from "../../public/sheetButton.png";
import sheetPrompt from "../../public/sheetPrompt.png";
import copySheet from "../../public/copySheet.png";
import pasteSheetTable from "../../public/pasteSheetTable.png";
import copySheetLink from "../../public/copySheetLink.png";
import savedSheetLink from "../../public/savedSheetLink.png";

const DocsIndex: NextPage = () => {
  return (
    <article
      className="prose prose-slate w-full max-w-screen-lg
      rounded border border-slate-100 p-8 shadow prose-a:text-sky-600 hover:prose-a:text-sky-400 prose-code:text-indigo-500"
    >
      <h1>Documentation</h1>
      <p>Welcome to IUGen documentation!</p>
      <h3>The documentation is in 2 parts:</h3>
      <ol>
        <li>
          <a href="#firefox">Firefox users guide</a>
        </li>
        <li>
          <a href="#chrome_edge">Chrome/Edge users guide</a>
        </li>
      </ol>
      <h2 id="firefox" className="flex scroll-m-4 gap-2">
        <span>Firefox</span>
        <FirefoxIcon className="h-8"></FirefoxIcon>
      </h2>
      <p>
        Highlight your class table from{" "}
        <a
          href="https://edusoftweb.hcmiu.edu.vn"
          target="_blank"
          rel="noopener noreferrer"
        >
          IU Edusoftweb
        </a>{" "}
        and copy them to your clipboard with <code>Ctrl + C</code> on Windows or{" "}
        <code>Command + C</code> on MacOS.
      </p>
      <div className="overflow-clip rounded-lg border">
        <Image
          src={highlightClasses}
          alt="Image of highlighting classes from Edusoftweb table"
        ></Image>
      </div>
      <blockquote>
        Note: You have to copy every column on each class row.
      </blockquote>
      <p>
        Paste your clipboard to IUGen class table input with{" "}
        <code>Ctrl + V</code> on Windows or <code>Command + V</code> on MacOS
      </p>
      <div className="overflow-clip rounded-lg border">
        <Image
          src={pasteClassInput}
          alt="Image of pasting classes IUGen input"
        ></Image>
      </div>
      <blockquote>
        The input box may look weird but don&apos;t worry :3
      </blockquote>
      <p>
        Click the Add button. You see that your schedule is generated instantly!
      </p>
      <hr />

      <h2 id="chrome_edge" className="flex scroll-m-4 gap-2">
        <span>Chrome/Edge</span>
        <ChromeIcon className="h-8"></ChromeIcon>
        <EdgeIcon className="h-8"></EdgeIcon>
      </h2>
      <blockquote>
        First of all, IUGen is currently cumbersome on Chrome/Edge because of
        how Edusoftweb displays your registration table and how Chromium-based
        browsers copy Edusoftweb&apos;s table under the hood. Better solution is
        coming soon.
      </blockquote>
      <p>
        Highlight your class table from{" "}
        <a
          href="https://edusoftweb.hcmiu.edu.vn"
          target="_blank"
          rel="noopener noreferrer"
        >
          IU Edusoftweb
        </a>{" "}
        and copy them to your clipboard with <code>Ctrl + C</code> on Windows or{" "}
        <code>Command + C</code> on MacOS.
      </p>
      <div className="overflow-clip rounded-lg border">
        <Image
          src={highlightClassesChrome}
          alt="Image of highlighting classes from Edusoftweb table"
        ></Image>
      </div>
      <blockquote>
        Note: You have to copy every columns on each class row.
      </blockquote>
      <p>
        Go back to IUGen, Click{" "}
        <TableIcon className="inline-block h-6 w-6 text-emerald-700"></TableIcon>{" "}
        on top right of class table input
      </p>
      <div className="w-fit overflow-clip rounded-lg border">
        <Image src={sheetButton} alt="Image of sheet button"></Image>
      </div>
      <p>
        Click on the New Sheet button and paste your clipboard to Google Sheet
        with <code>Ctrl + V</code> on Windows or <code>Command + V</code> on
        MacOS.
      </p>
      <div className="w-fit overflow-clip rounded-lg border">
        <Image src={sheetPrompt} alt="Image of sheet prompt"></Image>
      </div>
      <p>
        Delete the preceding cells and shift left to align the table (example
        below).
      </p>
      <p>
        Highlight every rows and the last additional columns (R Column) then
        press copy.
      </p>
      <div className="w-fit overflow-clip rounded-lg border">
        <Image src={copySheet} alt="Image of Google Sheet"></Image>
      </div>
      <blockquote>
        Note: It is important that you copy an additional column at the
        right-most of your table.
      </blockquote>
      <p>
        Paste your clipboard to IUGen class table input with{" "}
        <code>Ctrl + V</code> on Windows or <code>Command + V</code> on MacOS
      </p>
      <div className="overflow-clip rounded-lg border">
        <Image
          src={pasteSheetTable}
          alt="Image of pasting classes IUGen input"
        ></Image>
      </div>
      <blockquote>
        The input box may look weird but don&apos;t worry :3
      </blockquote>
      <p>
        Click the Add button. You see that your schedule is generated instantly!
      </p>
      <h3>Bonus tip</h3>
      <p>
        To help you save your drive space from creating a new sheet every time,
        I have made a prompt that save your Sheet link. Therefore, you can reuse
        your Sheet.
      </p>
      <p>Create a name for your sheet - optional</p>
      <p>Copy your sheet link</p>
      <div className="w-fit overflow-clip rounded-lg border">
        <Image
          src={copySheetLink}
          alt="Image of copying Google Sheet link"
        ></Image>
      </div>
      <p>
        Paste your sheet link to the prompt. So the next time you want to open
        the same Sheet, you can click Open Link.
      </p>
      <div className="w-fit overflow-clip rounded-lg border">
        <Image
          src={savedSheetLink}
          alt="Google Sheet link is saved in prompt"
        ></Image>
      </div>
      <blockquote>
        Note: I do not have your link. It is saved on your computer only. Even
        if I have your link, I do not have your access privilege.
      </blockquote>
    </article>
  );
};

export default DocsIndex;
