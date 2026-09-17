import { useState } from "react";

import ToolCard from "../components/ToolCard";
import CopyButton from "../components/CopyButton";

function UrlEncoder() {
  const [input, setInput] = useState("");
  const [output, setOutput] = useState("");
  const [error, setError] = useState("");

  const encodeUrl = () => {
    if (!input.trim()) {
      setError("Please enter some text.");
      setOutput("");
      return;
    }

    try {
      const result = encodeURIComponent(input);

      setOutput(result);
      setError("");
    } catch {
      setOutput("");
      setError("Failed to encode the URL.");
    }
  };

  const decodeUrl = () => {
    if (!input.trim()) {
      setError("Please enter an encoded URL.");
      setOutput("");
      return;
    }

    try {
      const result = decodeURIComponent(input);

      setOutput(result);
      setError("");
    } catch {
      setOutput("");
      setError("Invalid encoded URL.");
    }
  };

  const clear = () => {
    setInput("");
    setOutput("");
    setError("");
  };

  return (
    <ToolCard
      title="URL Encoder / Decoder"
      description="Encode or decode URL components."
      actions={
        <>
          <button
            type="button"
            onClick={encodeUrl}
            className="rounded-lg bg-blue-600 px-3 py-2 text-xs font-medium text-white hover:bg-blue-500"
          >
            Encode
          </button>

          <button
            type="button"
            onClick={decodeUrl}
            className="rounded-lg border border-slate-700 bg-slate-800 px-3 py-2 text-xs font-medium text-slate-300 hover:bg-slate-700 hover:text-white"
          >
            Decode
          </button>

          <button
            type="button"
            onClick={clear}
            className="rounded-lg border border-slate-700 bg-slate-800 px-3 py-2 text-xs font-medium text-slate-300 hover:bg-slate-700 hover:text-white"
          >
            Clear
          </button>
        </>
      }
    >
      <div className="space-y-4">
        <div>
          <label
            htmlFor="url-input"
            className="mb-2 block text-xs font-medium text-slate-400"
          >
            Input
          </label>

          <textarea
            id="url-input"
            value={input}
            onChange={(e) => {
              setInput(e.target.value);
              setError("");
            }}
            placeholder="Enter URL or text..."
            className="h-32 w-full resize-none rounded-lg border border-slate-700 bg-slate-950 p-3 font-mono text-xs text-slate-200 outline-none placeholder:text-slate-600 focus:border-blue-500"
          />
        </div>

        {error && (
          <div className="rounded-lg border border-red-900 bg-red-950/40 px-3 py-2 text-xs text-red-400">
            {error}
          </div>
        )}

        <div>
          <div className="mb-2 flex items-center justify-between">
            <label
              htmlFor="url-output"
              className="text-xs font-medium text-slate-400"
            >
              Output
            </label>

            <CopyButton text={output} disabled={!output} />
          </div>

          <pre
            id="url-output"
            className="min-h-32 max-h-48 overflow-auto whitespace-pre-wrap break-all rounded-lg border border-slate-800 bg-slate-950 p-3 font-mono text-xs text-slate-300"
          >
            {output || "Result will appear here..."}
          </pre>
        </div>
      </div>
    </ToolCard>
  );
}

export default UrlEncoder;
