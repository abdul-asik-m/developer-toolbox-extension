function Header() {
  return (
    <header className="flex h-14 shrink-0 items-center justify-between border-b border-slate-800 bg-slate-950 px-4">
      <div className="flex items-center gap-3">
        <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-blue-600 text-sm font-bold text-white">
          DT
        </div>

        <div>
          <h1 className="text-sm font-semibold text-white">
            Developer Toolbox
          </h1>

          <p className="text-[10px] text-slate-500">Developer utilities</p>
        </div>
      </div>

      {/* <button
        type="button"
        className="rounded-lg p-2 text-slate-400 transition hover:bg-slate-800 hover:text-white"
        title="Settings"
      >
        ⚙
      </button> */}
    </header>
  );
}

export default Header;
