import { useState } from "react";

import ToolCard from "../components/ToolCard";
import CopyButton from "../components/CopyButton";

function UuidGenerator() {
  const [uuid, setUuid] = useState("");

  const generateUuid = () => {
    setUuid(crypto.randomUUID());
  };

  const generateMultiple = () => {
    const uuids = Array.from({ length: 5 }, () => crypto.randomUUID());

    setUuid(uuids.join("\n"));
  };

  const clear = () => {
    setUuid("");
  };

  return (
    <ToolCard
      title="UUID Generator"
      description="Generate random UUID v4 identifiers."
      actions={
        <>
          <button
            type="button"
            onClick={generateUuid}
            className="rounded-lg bg-blue-600 px-3 py-2 text-xs font-medium text-white hover:bg-blue-500"
          >
            Generate
          </button>

          <button
            type="button"
            onClick={generateMultiple}
            className="rounded-lg border border-slate-700 bg-slate-800 px-3 py-2 text-xs font-medium text-slate-300 hover:bg-slate-700 hover:text-white"
          >
            Generate 5
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
      <div>
        <div className="mb-2 flex items-center justify-between">
          <label htmlFor="uuid" className="text-xs font-medium text-slate-400">UUID</label>

          <CopyButton text={uuid} disabled={!uuid} />
        </div>

        <div id="uuid" className="min-h-32 whitespace-pre-wrap break-all rounded-lg border border-slate-800 bg-slate-950 p-4 font-mono text-xs text-slate-300">
          {uuid || "Click Generate to create a UUID..."}
        </div>
      </div>
    </ToolCard>
  );
}

export default UuidGenerator;
