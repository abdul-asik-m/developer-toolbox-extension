import { useEffect, useRef, useState } from "react";

function CopyButton({ text, disabled = false }) {
  const [status, setStatus] = useState("idle");
  const timeoutRef = useRef(null);

  useEffect(() => {
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
        timeoutRef.current = null;
      }
    };
  }, []);

  const handleCopy = async () => {
    if (!text || disabled) return;

    try {
      await navigator.clipboard.writeText(text);

      setStatus("copied");

      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }

      timeoutRef.current = setTimeout(() => {
        setStatus("idle");
        timeoutRef.current = null;
      }, 1500);
    } catch (error) {
      console.error("Copy failed:", error);

      setStatus("error");

      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }

      timeoutRef.current = setTimeout(() => {
        setStatus("idle");
        timeoutRef.current = null;
      }, 2000);
    }
  };

  const isDisabled = disabled || !text;

  return (
    <button
      type="button"
      onClick={handleCopy}
      disabled={isDisabled}
      aria-label={
        status === "copied"
          ? "Copied to clipboard"
          : status === "error"
            ? "Copy failed"
            : "Copy to clipboard"
      }
      className="rounded-lg border border-slate-700 bg-slate-800 px-3 py-2 text-xs font-medium text-slate-300 transition hover:bg-slate-700 hover:text-white disabled:cursor-not-allowed disabled:opacity-40"
    >
      {status === "copied"
        ? "✓ Copied"
        : status === "error"
          ? "Copy failed"
          : "Copy"}
    </button>
  );
}

export default CopyButton;
