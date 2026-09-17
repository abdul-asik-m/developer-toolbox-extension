function Sidebar({ tools, activeTool, onToolSelect }) {
  return (
    <aside className="w-36 shrink-0 border-r border-slate-800 bg-slate-950">
      <div className="p-3">
        <p className="mb-2 px-2 text-[10px] font-semibold uppercase tracking-wider text-slate-500">
          Tools
        </p>

        <nav className="space-y-1">
          {tools.map((tool) => {
            const active = activeTool === tool.id;

            return (
              <button
                key={tool.id}
                type="button"
                onClick={() => onToolSelect(tool.id)}
                className={`flex w-full items-center gap-2 rounded-lg px-2 py-2 text-left text-xs transition ${
                  active
                    ? "bg-blue-600 text-white"
                    : "text-slate-400 hover:bg-slate-800 hover:text-white"
                }`}
              >
                <span className="w-5 text-center">{tool.icon}</span>

                <span>{tool.name}</span>
              </button>
            );
          })}
        </nav>
      </div>
    </aside>
  );
}

export default Sidebar;
