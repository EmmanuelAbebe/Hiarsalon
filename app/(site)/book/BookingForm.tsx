// app/form/page.tsx
"use client";
import { useState } from "react";
import { StepProgress } from "./SetpProgress";
import { StepSegments } from "./SetpSegements";
import DateTime from "./formcomponents/DateAndTime";
import PersonalInfo from "./formcomponents/PersonalInfo";
import Review from "./formcomponents/Review";
import Services from "./formcomponents/Services";

const STEPS = ["Personal info", "Services", "Date & time", "Review"];

export default function MultiStepForm() {
  const [step, setStep] = useState(1);
  const total = STEPS.length;

  function next() {
    setStep((s) => Math.min(s + 1, total));
  }
  function prev() {
    setStep((s) => Math.max(s - 1, 1));
  }

  return (
    <div className="mx-auto max-w-2xl px-4 py-10 space-y-6 h-screen">
      <h1 className="text-2xl font-sans text-center py-8">Booking</h1>
      {/* <StepProgress step={step} total={total} label="Form completion" /> */}
      <StepSegments step={step} steps={STEPS} />

      <section className="rounded-lg border border-gray-200 bg-white p-6">
        {step === 1 && <PersonalInfo />}
        {step === 2 && <Services />}
        {step === 3 && <DateTime />}
        {step === 4 && <Review />}
      </section>

      <div className="flex justify-between">
        <button
          onClick={prev}
          disabled={step === 1}
          className="rounded-md border border-gray-300 bg-white px-4 py-2 text-sm disabled:opacity-60"
        >
          Back
        </button>
        <button
          onClick={next}
          className={`rounded-md px-4 py-2 text-sm font-medium text-white ${
            step === total ? "bg-blue-600" : "bg-black"
          }`}
        >
          {step === total ? "Finish" : "Next"}
        </button>
      </div>
    </div>
  );
}
