export const CanonicalURL = "https://iugen.vercel.app";

export function mergeMaps(...iterables: Map<any, any>[]) {
  const map = new Map();
  for (const iterable of iterables) {
    for (const item of iterable) {
      map.set(...item);
    }
  }
  return map;
}

export type Browser = "firefox" | "chromium";

export function browserDetection(): Browser {
  // Firefox 1.0+
  // @ts-ignore
  var isFirefox = typeof InstallTrigger !== "undefined";

  // Safari 3.0+ "[object HTMLElementConstructor]"
  var isSafari =
    // @ts-ignore
    /constructor/i.test(window.HTMLElement) ||
    (function (p) {
      return p.toString() === "[object SafariRemoteNotification]";
    })(
      // @ts-ignore
      !window["safari"] ||
        // @ts-ignore
        (typeof safari !== "undefined" && window["safari"].pushNotification)
    );

  // Chrome 1 - 79
  // @ts-ignore
  var isChrome = !!window.chrome;

  if (isFirefox) {
    return "firefox";
  } else {
    // Default everything to Chromium
    return "chromium";
  }
}
