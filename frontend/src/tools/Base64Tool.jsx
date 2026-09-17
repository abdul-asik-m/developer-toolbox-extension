import { useState } from "react";

import ToolCard from "../components/ToolCard";
import CopyButton from "../components/CopyButton";

function Base64Tool() {
  const [input, setInput] = useState("");
  const [output, setOutput] = useState("");
  const [error, setError] = useState("");

  const encode = () => {
    if (!input) {
      setError("Please enter some text.");
      setOutput("");
      return;
    }

    try {
      const bytes = new TextEncoder().encode(input);
      const encoded = bytes.toBase64();

      setOutput(encoded);
      setError("");
    } catch {
      setError("Failed to encode the text.");
      setOutput("");
    }
  };

  const decode = () => {
    if (!input) {
      setError("Please enter Base64 text.");
      setOutput("");
      return;
    }

    try {
      const decodedBytes = Uint8Array.fromBase64(input.replace(/\s/g, ""));
      const decoded = new TextDecoder().decode(decodedBytes);

      setOutput(decoded);
      setError("");
    } catch {
      setError("Invalid Base64 input.");
      setOutput("");
    }
  };

  const clear = () => {
    setInput("");
    setOutput("");
    setError("");
  };

  return (
    <ToolCard
      title="Base64 Encoder / Decoder"
      description="Encode text to Base64 or decode Base64 text."
      actions={
        <>
          <button
            type="button"
            onClick={encode}
            className="rounded-lg bg-blue-600 px-3 py-2 text-xs font-medium text-white hover:bg-blue-500"
          >
            Encode
          </button>

          <button
            type="button"
            onClick={decode}
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
            htmlFor="base64-input"
            className="mb-2 block text-xs font-medium text-slate-400"
          >
            Input
          </label>

          <textarea
            id="base64-input"
            value={input}
            onChange={(e) => {
              setInput(e.target.value);
              setOutput("");
              setError("");
            }}
            placeholder="Enter text or Base64..."
            className="h-32 w-full resize-none rounded-lg border border-slate-700 bg-slate-950 p-3 font-mono text-xs text-slate-200 outline-none placeholder:text-slate-600 focus:border-blue-500"
          />
        </div>

        {error && (
          <div
            role="alert"
            className="rounded-lg border border-red-900 bg-red-950/40 px-3 py-2 text-xs text-red-400"
          >
            {error}
          </div>
        )}

        <div>
          <div className="mb-2 flex items-center justify-between">
            <label className="text-xs font-medium text-slate-400">Output</label>

            <CopyButton text={output} disabled={!output} />
          </div>

          <pre className="min-h-32 max-h-48 overflow-auto whitespace-pre-wrap break-all rounded-lg border border-slate-800 bg-slate-950 p-3 font-mono text-xs text-slate-300">
            {output || "Result will appear here..."}
          </pre>
        </div>
      </div>
    </ToolCard>
  );
}

export default Base64Tool;
