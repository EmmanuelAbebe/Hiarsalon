// components/StepProgress.tsx
export function StepProgress({
  step,
  total,
  label,
}: {
  step: number;
  total: number;
  label?: string;
}) {
  const pct = Math.round((Math.min(step, total) / total) * 100);
  return (
    <div
      className="w-full"
      role="progressbar"
      aria-valuenow={pct}
      aria-valuemin={0}
      aria-valuemax={100}
      aria-label={label ?? "Form completion"}
    >
      <div className="mb-2 flex items-center justify-between">
        <span className="text-sm font-medium text-gray-700">
          {label ?? "Completion"}
        </span>
        <span className="text-sm font-medium text-gray-700">{pct}%</span>
      </div>
      <div className="h-2 w-full rounded-full bg-gray-200">
        <div
          className="h-2 rounded-full bg-black transition-all duration-500 ease-in-out"
          style={{ width: `${pct}%` }}
        />
      </div>
    </div>
  );
}
