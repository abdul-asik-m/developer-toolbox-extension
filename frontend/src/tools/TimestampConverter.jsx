import { useState } from "react";

import ToolCard from "../components/ToolCard";
import CopyButton from "../components/CopyButton";

function TimestampConverter() {
  const [input, setInput] = useState("");
  const [unit, setUnit] = useState("seconds");
  const [output, setOutput] = useState("");
  const [error, setError] = useState("");

  const timestampToDate = () => {
    if (!input.trim()) {
      setError("Please enter a timestamp.");
      setOutput("");
      return;
    }

    const timestamp = input.trim();

    if (
      unit === "seconds"
        ? !/^-?\d+(\.\d+)?$/.test(timestamp)
        : !/^-?\d+$/.test(timestamp)
    ) {
      setError(
        unit === "seconds"
          ? "Invalid timestamp. Enter a valid number of seconds."
          : "Invalid timestamp. Milliseconds must be a whole number.",
      );
      setOutput("");
      return;
    }

    const value = Number(timestamp);

    if (!Number.isFinite(value)) {
      setError("Timestamp is out of range.");
      setOutput("");
      return;
    }

    const milliseconds = unit === "seconds" ? value * 1000 : value;

    if (!Number.isFinite(milliseconds) || Math.abs(milliseconds) > 8.64e15) {
      setError("Timestamp is out of supported date range.");
      setOutput("");
      return;
    }

    const date = new Date(milliseconds);

    if (Number.isNaN(date.getTime())) {
      setError("Invalid timestamp.");
      setOutput("");
      return;
    }

    setOutput(
      `Local: ${date.toLocaleString()}\n` +
        `UTC: ${date.toUTCString()}\n\n` +
        `ISO: ${date.toISOString()}`,
    );

    setError("");
  };

  const dateToTimestamp = () => {
    if (!input.trim()) {
      setError("Please enter a date.");
      setOutput("");
      return;
    }

    const date = new Date(input.trim());
    if (Number.isNaN(date.getTime())) {
      setError("Invalid date.");
      setOutput("");
      return;
    }

    const milliseconds = date.getTime();
    const seconds = Math.floor(milliseconds / 1000);

    setOutput(`Seconds: ${seconds}\n` + `Milliseconds: ${milliseconds}`);

    setError("");
  };

  const currentTimestamp = () => {
    const milliseconds = Date.now();
    const seconds = Math.floor(milliseconds / 1000);

    setOutput(`Seconds: ${seconds}\n` + `Milliseconds: ${milliseconds}`);

    setError("");
  };

  const clear = () => {
    setInput("");
    setOutput("");
    setError("");
    setUnit("seconds");
  };

  return (
    <ToolCard
      title="Timestamp Converter"
      description="Convert Unix timestamps and ISO 8601 dates."
      actions={
        <>
          <button
            type="button"
            onClick={timestampToDate}
            className="rounded-lg bg-blue-600 px-3 py-2 text-xs font-medium text-white hover:bg-blue-500"
          >
            Timestamp → Date
          </button>

          <button
            type="button"
            onClick={dateToTimestamp}
            className="rounded-lg border border-slate-700 bg-slate-800 px-3 py-2 text-xs font-medium text-slate-300 hover:bg-slate-700 hover:text-white"
          >
            Date → Timestamp
          </button>

          <button
            type="button"
            onClick={currentTimestamp}
            className="rounded-lg border border-slate-700 bg-slate-800 px-3 py-2 text-xs font-medium text-slate-300 hover:bg-slate-700 hover:text-white"
          >
            Now
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
        {/* Input */}
        <div>
          <label
            htmlFor="timestamp-input"
            className="mb-2 block text-xs font-medium text-slate-400"
          >
            Input
          </label>

          <input
            id="timestamp-input"
            type="text"
            value={input}
            onChange={(e) => {
              setInput(e.target.value);
              setError("");
            }}
            placeholder="Example: 1758000000"
            className="w-full rounded-lg border border-slate-700 bg-slate-950 p-3 font-mono text-xs text-slate-200 outline-none placeholder:text-slate-600 focus:border-blue-500"
          />
        </div>

        {/* Timestamp Unit */}
        <div>
          <label
            htmlFor="timestamp-unit"
            className="mb-2 block text-xs font-medium text-slate-400"
          >
            Timestamp Unit
          </label>

          <select
            id="timestamp-unit"
            value={unit}
            onChange={(e) => {
              setUnit(e.target.value);
              setError("");
            }}
            className="w-full rounded-lg border border-slate-700 bg-slate-950 p-3 text-xs text-slate-200 outline-none focus:border-blue-500"
          >
            <option value="seconds">Seconds</option>
            <option value="milliseconds">Milliseconds</option>
          </select>
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

          <pre className="min-h-32 whitespace-pre-wrap rounded-lg border border-slate-800 bg-slate-950 p-3 font-mono text-xs text-slate-300">
            {output || "Result will appear here..."}
          </pre>
        </div>
      </div>
    </ToolCard>
  );
}

export default TimestampConverter;
