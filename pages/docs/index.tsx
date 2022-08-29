import type { NextPage } from "next";
import Head from "next/head";
import Image from "next/image";
import ChromeIcon from "../../components/icons/ChromeIcon";
import EdgeIcon from "../../components/icons/EdgeIcon";
import FirefoxIcon from "../../components/icons/FirefoxIcon";
import { CanonicalURL } from "../../lib/utils";
import highlightClasses from "../../public/highlightClasses.png";
import pasteClassInput from "../../public/pasteClassInput.png";

const Description = "Get started with IUGen in the official documentation.";

const DocsIndex: NextPage = () => {
  return (
    <>
      <Head>
        <title>Docs | IUGen</title>
        <meta name="description" content={Description} />
        <meta property="og:title" content="IUGen" />
        <meta property="og:url" content={CanonicalURL + "/docs"} />
        <meta property="og:description" content={Description} />
        <meta property="og:type" content="website" />
        <meta property="og:image" content="/OGPImageDocs.png" />
        <meta name="twitter:card" content={Description} />
      </Head>
      <article
        className="prose prose-slate w-full max-w-screen-lg rounded border 
        border-slate-100 p-8 shadow prose-a:text-sky-600 
        hover:prose-a:text-sky-400 prose-code:text-indigo-500"
      >
        <h1>Documentation</h1>
        <p>Welcome to IUGen documentation!</p>
        <h2 id="firefox_chrome_edge" className="flex scroll-m-4 gap-2">
          <span>Firefox/Chrome/Edge</span>
          <FirefoxIcon className="h-8"></FirefoxIcon>
          <ChromeIcon className="h-8"></ChromeIcon>
          <EdgeIcon className="h-8"></EdgeIcon>
        </h2>
        <blockquote>Note: Safari official support is coming soon.</blockquote>

        <h3>Video Guide</h3>
        <div className="overflow-clip rounded-lg border">
          <iframe
            className="aspect-video w-full"
            src="https://www.youtube-nocookie.com/embed/zg7g8RqVZnA"
            title="YouTube video player"
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          ></iframe>
        </div>

        <h3>Document Guide</h3>
        <p>
          Highlight your class table from{" "}
          <a
            href="https://edusoftweb.hcmiu.edu.vn"
            target="_blank"
            rel="noopener noreferrer"
          >
            IU Edusoftweb
          </a>{" "}
          and copy them to your clipboard with <code>Ctrl + C</code> on Windows
          or <code>Command + C</code> on MacOS.
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
          Click the Add button. You see that your schedule is generated
          instantly!
        </p>
      </article>
    </>
  );
};

export default DocsIndex;
