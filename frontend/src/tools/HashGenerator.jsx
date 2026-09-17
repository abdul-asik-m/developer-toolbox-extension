import { useRef, useState } from "react";
import ToolCard from "../components/ToolCard";
import CopyButton from "../components/CopyButton";

async function generateHash(text, algorithm) {
  const encoder = new TextEncoder();
  const data = encoder.encode(text);

  const hashBuffer = await crypto.subtle.digest(algorithm, data);

  const hashArray = Array.from(new Uint8Array(hashBuffer));

  return hashArray.map((byte) => byte.toString(16).padStart(2, "0")).join("");
}

function HashGenerator() {
  const [input, setInput] = useState("");
  const [algorithm, setAlgorithm] = useState("SHA-256");
  const [output, setOutput] = useState("");
  const [error, setError] = useState("");

  // Persists across renders
  const requestId = useRef(0);

  const generate = async () => {
    if (!input.trim()) {
      setError("Please enter some text.");
      setOutput("");
      return;
    }

    // Create an ID for this generation
    const id = ++requestId.current;

    try {
      const hash = await generateHash(input, algorithm);

      // Clear/new generation happened while we were waiting
      if (id !== requestId.current) {
        return;
      }

      setOutput(hash);
      setError("");
    } catch {
      // Don't show errors from stale requests
      if (id !== requestId.current) {
        return;
      }

      setError("Failed to generate hash.");
      setOutput("");
    }
  };

  const clear = () => {
    // Invalidate any currently running generation
    requestId.current++;

    setInput("");
    setOutput("");
    setError("");
  };

  return (
    <ToolCard
      title="Hash Generator"
      description="Generate SHA-1, SHA-256, SHA-384, and SHA-512 hashes locally. SHA-1 is provided for legacy compatibility."
      actions={
        <>
          <button
            type="button"
            onClick={generate}
            className="rounded-lg bg-blue-600 px-3 py-2 text-xs font-medium text-white hover:bg-blue-500"
          >
            Generate Hash
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
        {/* Algorithm */}
        <div>
          <label
            htmlFor="hash-algorithm"
            className="mb-2 block text-xs font-medium text-slate-400"
          >
            Algorithm
          </label>

          <select
            id="hash-algorithm"
            value={algorithm}
            onChange={(e) => {
              requestId.current++;
              setAlgorithm(e.target.value);
              setOutput("");
              setError("");
            }}
            className="w-full rounded-lg border border-slate-700 bg-slate-950 p-3 text-xs text-slate-200 outline-none focus:border-blue-500"
          >
            <option value="SHA-1">SHA-1</option>
            <option value="SHA-256">SHA-256</option>
            <option value="SHA-384">SHA-384</option>
            <option value="SHA-512">SHA-512</option>
          </select>
        </div>

        {/* Input */}
        <div>
          <label
            htmlFor="hash-input"
            className="mb-2 block text-xs font-medium text-slate-400"
          >
            Input
          </label>

          <textarea
            id="hash-input"
            value={input}
            onChange={(e) => {
              requestId.current++;
              setInput(e.target.value);
              setOutput("");
              setError("");
            }}
            placeholder="Enter text to hash..."
            className="h-28 w-full resize-none rounded-lg border border-slate-700 bg-slate-950 p-3 font-mono text-xs text-slate-200 outline-none placeholder:text-slate-600 focus:border-blue-500"
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

        {/* Output */}
        <div>
          <div className="mb-2 flex items-center justify-between">
            <span className="text-xs font-medium text-slate-400">Hash</span>

            <CopyButton text={output} disabled={!output} />
          </div>

          <div className="min-h-24 break-all rounded-lg border border-slate-800 bg-slate-950 p-3 font-mono text-xs text-slate-300">
            {output || "Hash will appear here..."}
          </div>
        </div>
      </div>
    </ToolCard>
  );
}

export default HashGenerator;
