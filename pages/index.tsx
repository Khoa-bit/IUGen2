import { Browser, browserDetection, CanonicalURL, mergeMaps } from "lib/utils";
import Head from "next/head";
import { useEffect, useState } from "react";
import ClassInputForm from "../components/ClassInputForm";
import ErrorAlert from "../components/ErrorAlert";
import FilterTable from "../components/FilterTable";
import NewUserPrompt from "../components/NewUserPrompt";
import ScheduleTables from "../components/ScheduleTables";
import {
  compressCoursesMap,
  CoursesMap,
  decompressCoursesStr,
  parseClassInput,
} from "../lib/classInput";
import { toggleAllState } from "../lib/courseAndClassUtils";
import { mapColor } from "../lib/schedule";

export type InputHandler = (rawInputString: string) => void;

export const BG_COLOR_PALETTE = [
  "bg-rose-200 shadow shadow-rose-500/50",
  // "bg-pink-200 shadow shadow-pink-500/50",
  "bg-fuchsia-200 shadow shadow-fuchsia-500/50",
  // "bg-purple-200 shadow shadow-purple-500/50",
  // "bg-violet-200 shadow shadow-violet-500/50",
  "bg-indigo-200 shadow shadow-indigo-500/50",
  // "bg-blue-200 shadow shadow-blue-500/50",
  // "bg-sky-200 shadow shadow-sky-500/50",
  // "bg-cyan-200 shadow shadow-cyan-500/50",
  // "bg-teal-200 shadow shadow-teal-500/50",
  "bg-emerald-200 shadow shadow-emerald-500/50",
  // "bg-green-200 shadow shadow-green-500/50",
  "bg-lime-200 shadow shadow-lime-500/50",
  // "bg-yellow-200 shadow shadow-yellow-500/50",
  "bg-amber-200 shadow shadow-amber-500/50",
  "bg-orange-200 shadow shadow-orange-500/50",
  // "bg-red-200 shadow shadow-red-500/50",
  "bg-slate-100 shadow shadow-slate-500/50",
];

const Description = "Fast and clean scheduling helper for perfectionists.";

const IUGen = () => {
  const [coursesMap, setCoursesMap] = useState<CoursesMap>(new Map());
  const [errorMessage, setErrorMessage] = useState<string>();
  const [browser, setBrowser] = useState<Browser>("chromium");

  useEffect(() => {
    setBrowser(browserDetection());

    // Decode Share params
    try {
      const queryParams = new URLSearchParams(window.location.search);
      const compressedAndEncoded = queryParams.get("share");
      if (!compressedAndEncoded) return;
      const compressed = decodeURIComponent(compressedAndEncoded);
      setCoursesMap(mapColor(decompressCoursesStr(compressed)));
    } catch (error) {
      if (error instanceof Error) {
        setErrorMessage(error.message);
      }
    }
  }, []);

  useEffect(() => {
    // Encode Share params
    const compressedAndEncoded = encodeURIComponent(
      compressCoursesMap(coursesMap)
    );
    const searchParam = "?share=" + compressedAndEncoded;
    const fullHref = window.location.origin + "/" + searchParam;
    if (fullHref.length > 2048) return; // Recommended max URL length

    window.history.pushState(
      null,
      "",
      compressedAndEncoded ? searchParam : "/"
    );
  }, [coursesMap]);

  const inputHandler: InputHandler = (rawInputString: string) => {
    if (!rawInputString) return;
    setErrorMessage(undefined);

    try {
      const newCoursesMap = parseClassInput(rawInputString, browser);
      toggleAllState(newCoursesMap, false); // Default to unchecked
      setCoursesMap((prevCoursesMap) =>
        mapColor(mergeMaps(prevCoursesMap, newCoursesMap))
      );
    } catch (error) {
      if (error instanceof Error) {
        setErrorMessage(error.message);
      }
    }
  };

  return (
    <>
      <Head>
        <title>IUGen</title>
        <meta name="description" content={Description} />
        <meta property="og:title" content="IUGen" />
        <meta property="og:url" content={CanonicalURL} />
        <meta property="og:description" content={Description} />
        <meta property="og:type" content="website" />
        <meta property="og:image" content="/OGPImageIUGEN.png" />
        <meta name="twitter:card" content={Description} />
      </Head>
      <ClassInputForm
        inputHandler={inputHandler}
        browser={browser}
        setBrowser={setBrowser}
      ></ClassInputForm>
      <ErrorAlert
        message={errorMessage}
        setMessage={setErrorMessage}
      ></ErrorAlert>
      <FilterTable
        coursesMap={coursesMap}
        setCoursesMap={setCoursesMap}
      ></FilterTable>
      <ScheduleTables coursesMap={coursesMap}></ScheduleTables>
      <NewUserPrompt></NewUserPrompt>
    </>
  );
};

export default IUGen;
