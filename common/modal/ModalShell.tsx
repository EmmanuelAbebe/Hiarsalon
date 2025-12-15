"use client";

import React, { useEffect, useRef } from "react";
import Button from "../Button";

export default function ModalShell({
  id,
  title,
  isVisible,
  onClose,
  children,
}: {
  id: string;
  title: string;
  isVisible: boolean;
  onClose: () => void;
  children: React.ReactNode;
}) {
  const panelRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!isVisible) return;

    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };

    window.addEventListener("keydown", onKeyDown);
    panelRef.current?.focus();

    return () => window.removeEventListener("keydown", onKeyDown);
  }, [isVisible, onClose]);

  if (!isVisible) return null;

  return (
    <div
      id={id}
      role="dialog"
      aria-modal="true"
      className="fixed inset-0 z-50 flex items-center justify-center"
    >
      <button
        type="button"
        aria-label="Close modal"
        onClick={onClose}
        className="absolute inset-0 bg-black/60"
      />

      <div
        ref={panelRef}
        tabIndex={-1}
        className="relative w-full max-w-2xl max-h-[calc(100%-2rem)] overflow-auto p-4 outline-none"
      >
        <div className="relative bg-white text-gray-900 border border-gray-200 rounded-2xl shadow-lg p-4 md:p-6">
          <div className="flex items-center justify-between border-b border-gray-200 pb-4 md:pb-5">
            <h3 className="text-lg font-bold text-gray-900">{title}</h3>
            <Button
              label={
                <>
                  <svg
                    className="w-5 h-5"
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="none"
                  >
                    <path
                      stroke="currentColor"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M6 18L18 6M18 18L6 6"
                    />
                  </svg>
                  <span className="sr-only">Close modal</span>
                </>
              }
              onClick={onClose}
              className="hover:bg-gray-100"
            />
          </div>

          <div className="py-4 md:py-6">{children}</div>
        </div>
      </div>
    </div>
  );
}
