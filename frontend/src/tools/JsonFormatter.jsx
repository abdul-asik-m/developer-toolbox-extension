import { useState } from "react";
import { parse, stringify } from "lossless-json";

import ToolCard from "../components/ToolCard";
import CopyButton from "../components/CopyButton";

const MAX_JSON_SIZE = 5 * 1024 * 1024;

function JsonFormatter() {
  const [input, setInput] = useState("");
  const [output, setOutput] = useState("");
  const [error, setError] = useState("");

  const getJsonErrorMessage = (error, value) => {
    if (!error) {
      return "Invalid JSON. Please check your syntax.";
    }

    const message = error.message || "";

    const match = message.match(/position\s+(\d+)/i);

    if (!match) {
      return "Invalid JSON. Please check your syntax.";
    }

    const position = Number(match[1]);

    const beforeError = value.slice(0, position);
    const line = beforeError.split("\n").length;

    const lastNewLine = beforeError.lastIndexOf("\n");
    const column = position - lastNewLine;

    return `Invalid JSON at line ${line}, column ${column}.`;
  };

  const isJsonTooLarge = (value) => {
    return new Blob([value]).size > MAX_JSON_SIZE;
  };

  const formatJson = () => {
    if (!input.trim()) {
      setOutput("");
      setError("Please enter some JSON.");
      return;
    }

    if (isJsonTooLarge(input)) {
      setOutput("");
      setError("JSON data is too large. Maximum supported size is 5 MB.");
      return;
    }

    try {
      const parsed = parse(input);

      setOutput(stringify(parsed, null, 2));
      setError("");
    } catch (error) {
      setOutput("");
      setError(getJsonErrorMessage(error, input));
    }
  };

  const minifyJson = () => {
    if (!input.trim()) {
      setOutput("");
      setError("Please enter some JSON.");
      return;
    }

    if (isJsonTooLarge(input)) {
      setOutput("");
      setError("JSON data is too large. Maximum supported size is 5 MB.");
      return;
    }

    try {
      const parsed = parse(input);

      setOutput(stringify(parsed));
      setError("");
    } catch (error) {
      setOutput("");
      setError(getJsonErrorMessage(error, input));
    }
  };

  const clear = () => {
    setInput("");
    setOutput("");
    setError("");
  };

  return (
    <ToolCard
      title="JSON Formatter"
      description="Format, minify and validate JSON data."
      actions={
        <>
          <button
            type="button"
            onClick={formatJson}
            className="rounded-lg bg-blue-600 px-3 py-2 text-xs font-medium text-white transition hover:bg-blue-500"
          >
            Format
          </button>

          <button
            type="button"
            onClick={minifyJson}
            className="rounded-lg border border-slate-700 bg-slate-800 px-3 py-2 text-xs font-medium text-slate-300 transition hover:bg-slate-700 hover:text-white"
          >
            Minify
          </button>

          <button
            type="button"
            onClick={clear}
            className="rounded-lg border border-slate-700 bg-slate-800 px-3 py-2 text-xs font-medium text-slate-300 transition hover:bg-slate-700 hover:text-white"
          >
            Clear
          </button>
        </>
      }
    >
      <div className="space-y-4">
        {/* Input */}
        <div>
          <label
            htmlFor="json-input"
            className="mb-2 block text-xs font-medium text-slate-400"
          >
            Input
          </label>

          <textarea
            id="json-input"
            value={input}
            onChange={(e) => {
              setInput(e.target.value);
              setOutput("");
              setError("");
            }}
            placeholder="Paste JSON here..."
            className="h-32 w-full resize-none rounded-lg border border-slate-700 bg-slate-950 p-3 font-mono text-xs text-slate-200 outline-none placeholder:text-slate-600 focus:border-blue-500"
          />
        </div>

        {/* Error */}
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
            <span className="text-xs font-medium text-slate-400">Output</span>

            <CopyButton text={output} disabled={!output} />
          </div>

          <pre className="min-h-32 max-h-48 overflow-auto rounded-lg border border-slate-800 bg-slate-950 p-3 font-mono text-xs text-slate-300">
            {output || "Formatted JSON will appear here..."}
          </pre>
        </div>
      </div>
    </ToolCard>
  );
}

export default JsonFormatter;
