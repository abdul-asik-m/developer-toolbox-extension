function ToolCard({ title, description, children, actions }) {
  return (
    <div className="overflow-hidden rounded-xl border border-slate-800 bg-slate-900 shadow-lg">
      {/* Header */}
      <div className="border-b border-slate-800 px-4 py-3">
        <h2 className="text-sm font-semibold text-white">{title}</h2>

        {description && (
          <p className="mt-1 text-xs text-slate-500">{description}</p>
        )}
      </div>

      {/* Content */}
      <div className="p-4">{children}</div>

      {/* Actions */}
      {actions && (
        <div className="flex items-center justify-end gap-2 border-t border-slate-800 px-4 py-3">
          {actions}
        </div>
      )}
    </div>
  );
}

export default ToolCard;
