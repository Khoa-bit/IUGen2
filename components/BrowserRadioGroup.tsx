import { Dispatch, SetStateAction } from "react";
import { RadioGroup } from "@headlessui/react";
import { Browser } from "lib/utils";
import FirefoxIcon from "./icons/FirefoxIcon";
import ChromeIcon from "./icons/ChromeIcon";

interface BrowserRadioGroupProps {
  browser: Browser;
  setBrowser: Dispatch<SetStateAction<Browser>>;
}

type BrowserRadio = {
  label: string;
  value: Browser;
  childUnchecked: JSX.Element;
  childChecked: JSX.Element;
};

const browserRadioGroup: BrowserRadio[] = [
  {
    label: "Firefox Browser",
    value: "firefox",
    childUnchecked: (
      <FirefoxIcon
        className="h-4 text-slate-400 
drop-shadow-[0px_2px_2px_rgba(148,163,184,0.5)]"
      ></FirefoxIcon>
    ),
    childChecked: (
      <FirefoxIcon
        className="h-4 text-orange-400 
          drop-shadow-[0px_2px_2px_rgba(251,146,60,0.5)]"
      ></FirefoxIcon>
    ),
  },
  {
    label: "Chromium Browser",
    value: "chromium",
    childUnchecked: (
      <ChromeIcon
        className="h-4 text-slate-400 
drop-shadow-[0px_2px_2px_rgba(148,163,184,0.5)]"
      ></ChromeIcon>
    ),
    childChecked: (
      <ChromeIcon
        className="h-4 text-sky-400 
          drop-shadow-[0px_2px_2px_rgba(56,189,248,0.5)]"
      ></ChromeIcon>
    ),
  },
];

function BrowserRadioGroup({ browser, setBrowser }: BrowserRadioGroupProps) {
  return (
    <RadioGroup
      value={browser}
      onChange={setBrowser}
      className="flex items-center gap-2"
    >
      <RadioGroup.Label className="sr-only">
        Select your Browser
      </RadioGroup.Label>
      {browserRadioGroup.map((browserRadio) => (
        <RadioGroup.Option
          key={browserRadio.value}
          value={browserRadio.value}
          className="cursor-pointer rounded-full bg-slate-200 p-1 
          text-slate-900 shadow shadow-slate-400 transition-colors 
          hover:bg-slate-300 focus:border-sky-300 focus:ring 
          focus:ring-sky-200 focus:ring-offset-2"
        >
          {({ active, checked }) => (
            <>
              <RadioGroup.Label className="sr-only">
                {browserRadio.label}
              </RadioGroup.Label>
              {checked
                ? browserRadio.childChecked
                : browserRadio.childUnchecked}
            </>
          )}
        </RadioGroup.Option>
      ))}
    </RadioGroup>
  );
}

export default BrowserRadioGroup;
