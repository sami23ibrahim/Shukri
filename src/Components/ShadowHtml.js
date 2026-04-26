import { useEffect, useRef } from "react";

function ShadowHtml({ html }) {
  const hostRef = useRef(null);

  useEffect(() => {
    const host = hostRef.current;
    if (!host || !html) return;

    let root = host.shadowRoot;
    if (!root) {
      root = host.attachShadow({ mode: "open" });
    } else {
      root.innerHTML = "";
    }

    const doc = new DOMParser().parseFromString(html, "text/html");

    doc.head.querySelectorAll("style, link[rel='stylesheet']").forEach((node) => {
      root.appendChild(node.cloneNode(true));
    });

    const baseStyle = document.createElement("style");
    baseStyle.textContent = ":host { display: block; all: initial; } :host * { box-sizing: border-box; }";
    root.appendChild(baseStyle);

    Array.from(doc.body.childNodes).forEach((node) => {
      root.appendChild(node.cloneNode(true));
    });

    root.querySelectorAll("script").forEach((oldScript) => {
      const newScript = document.createElement("script");
      Array.from(oldScript.attributes).forEach((attr) => {
        newScript.setAttribute(attr.name, attr.value);
      });
      newScript.textContent = oldScript.textContent;
      oldScript.parentNode.replaceChild(newScript, oldScript);
    });
  }, [html]);

  return <div ref={hostRef} />;
}

export default ShadowHtml;
