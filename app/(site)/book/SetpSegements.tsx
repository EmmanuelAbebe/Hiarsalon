// components/StepSegments.tsx
export function StepSegments({
  step,
  steps,
}: {
  step: number;
  steps: string[];
}) {
  const total = steps.length;
  return (
    <div className="w-full">
      <ol className="mb-3 flex items-center gap-2" aria-label="Form steps">
        {steps.map((label, i) => {
          const idx = i + 1;
          const state = idx < step ? "done" : idx === step ? "current" : "todo";
          return (
            <li key={label} className="flex flex-1 items-center gap-2">
              <div
                className={[
                  "h-2 w-full rounded-full transition-all",
                  (state === "done" || state === "current") && "bg-blue-600",
                  // state === "current" && "bg-gray-400",
                  state === "todo" && "bg-gray-200",
                ]
                  .filter(Boolean)
                  .join(" ")}
                aria-current={state === "current" ? "step" : undefined}
              />
            </li>
          );
        })}
      </ol>
      <div className="flex items-center justify-between text-xs text-gray-600">
        {steps.map((s, i) => (
          <span
            key={s}
            className={[
              "truncate",
              i + 1 === step ? "font-medium text-blue-600" : "",
            ].join(" ")}
            style={{ width: `${100 / steps.length}%` }}
          >
            {s}
          </span>
        ))}
      </div>
    </div>
  );
}
