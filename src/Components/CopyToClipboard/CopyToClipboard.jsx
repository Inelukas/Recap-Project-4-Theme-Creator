import { useEffect, useState } from "react";

export function CopyToCliboard({ color }) {
  const [copied, setCopied] = useState(false);

  async function handleCopy(color) {
    setCopied(true);
    try {
      await navigator.clipboard.writeText(color.hex);
    } catch (error) {
      console.error(error.message);
    }
  }

  useEffect(() => {
    if (copied) {
      console.log("works");
      const timer = setTimeout(() => setCopied(false), 3000);
      return () => clearTimeout(timer);
    }
  }, [copied]);

  return !copied ? (
    <button
      onClick={() => {
        handleCopy(color);
      }}
    >
      COPY
    </button>
  ) : (
    <button>SUCCESSFULLY COPIED</button>
  );
}
