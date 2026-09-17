import { useState } from "react";

import Header from "./Header";
import Sidebar from "./Sidebar";

import JsonFormatter from "../tools/JsonFormatter";
import Base64Tool from "../tools/Base64Tool";
import UrlEncoder from "../tools/UrlEncoder";
import UuidGenerator from "../tools/UuidGenerator";
import TimestampConverter from "../tools/TimestampConverter";
import HashGenerator from "../tools/HashGenerator";

const tools = [
  {
    id: "json",
    name: "JSON",
    icon: "{ }",
  },
  {
    id: "base64",
    name: "Base64",
    icon: "🔐",
  },
  {
    id: "url",
    name: "URL",
    icon: "🔗",
  },
  {
    id: "uuid",
    name: "UUID",
    icon: "🆔",
  },
  {
    id: "timestamp",
    name: "Time",
    icon: "🕐",
  },
  {
    id: "hash",
    name: "Hash",
    icon: "#",
  },
];

function Layout() {
  const [activeTool, setActiveTool] = useState("json");

  const renderTool = () => {
    switch (activeTool) {
      case "json":
        return <JsonFormatter />;

      case "base64":
        return <Base64Tool />;

      case "url":
        return <UrlEncoder />;

      case "uuid":
        return <UuidGenerator />;

      case "timestamp":
        return <TimestampConverter />;

      case "hash":
        return <HashGenerator />;

      default:
        return <JsonFormatter />;
    }
  };

  return (
    <div className="flex h-[600px] w-[900px] flex-col overflow-hidden bg-slate-950">
      <Header />

      <div className="flex min-h-0 flex-1">
        <Sidebar
          tools={tools}
          activeTool={activeTool}
          onToolSelect={setActiveTool}
        />

        <main className="min-w-0 flex-1 overflow-y-auto bg-slate-900 p-4">
          {renderTool()}
        </main>
      </div>
    </div>
  );
}

export default Layout;
