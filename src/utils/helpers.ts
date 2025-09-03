export const $ = document.querySelector.bind(document);
export const $$ = document.querySelectorAll.bind(document);

export const qs = (target: HTMLElement, query = "") => {
  return target.querySelector(query);
};

export const $on = (
  target: HTMLElement | (Window & typeof globalThis),
  type: any,
  callback: (this: HTMLElement, ev: any) => any,
  options?: AddEventListenerOptions
) => target?.addEventListener(type, callback, options);

export const setHtml = (element: HTMLElement | null, html: string) => {
  if (element) {
    element.innerHTML = html;
  }
};

export function cloneDeep<T>(value: T): T {
  return JSON.parse(JSON.stringify(value as T));
}

// export const
// getAttribute

export const addClass = (target: HTMLElement, className = "") => {
  if (target) {
    className.split(" ").forEach((classText) => {
      target.classList.add(classText);
    });
  }
};

export const removeClass = (target: HTMLElement, className = "") => {
  if (target) {
    className
      .split(" ")
      .forEach((classText) => target.classList.remove(classText));
  }
};

export const hasClass = (target: HTMLElement, className = "") =>
  target.classList.contains(className);

export const setCssVariable = (
  target: HTMLElement,
  variable = "",
  value = ""
) => target.style.setProperty(`--${variable}`, value);

// export const addStyle = (
//   target: null | HTMLElement,
//   styles: Record<string, string>
// ): void => {
//   if (target) {
//     for (const style in styles) {
//       target.style[style as any] = styles[style];
//     }
//   }
// };

// export const inlineStyles = (styles: Record<string, string>) =>
//   Object.keys(styles).length
//     ? `style='${Object.keys(styles)
//         .map((v) => `${v}:${styles[v]}`)
//         .join(";")}'`
//     : "";
