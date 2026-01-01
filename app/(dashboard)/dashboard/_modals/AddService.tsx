"use client";

import Button from "@/common/Button";
import React, { useState } from "react";
import type { AddOn, LevelPrice, Money, Minutes } from "@/app/lib/servicesData";
import { FORM_ROW, FORM_LABEL, FORM_CONTROL } from "@/common/Form/InputFiled";

type ServiceFormData = {
  service: string;
  duration: Minutes | "";
  priceFrom: Money | "";
  priceTo: Money | "";
  description: string;
  requiresConsult: boolean;
  addOns: AddOn[];
  levelPricing: LevelPrice[];
  active: boolean;
};

const DEFAULT_SERVICE_FORM_DATA: ServiceFormData = {
  service: "",
  duration: "",
  priceFrom: "",
  priceTo: "",
  description: "",
  requiresConsult: false,
  addOns: [],
  levelPricing: [],
  active: true,
};

export default function OpenServiceCreate({
  onClose,
}: {
  onClose: () => void;
}) {
  const [formData, setFormData] = useState<ServiceFormData>(
    DEFAULT_SERVICE_FORM_DATA
  );

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    // TODO: validate + POST formData
    onClose();
  };

  return (
    <form onSubmit={submit} className="space-y-6">
      {/* Service name */}
      <div className={FORM_ROW}>
        <div className={FORM_LABEL}>Service</div>
        <input
          className={FORM_CONTROL}
          value={formData.service}
          onChange={(e) =>
            setFormData((p) => ({ ...p, service: e.target.value }))
          }
          placeholder="Women’s Haircut"
        />
      </div>

      {/* Duration */}
      <div className={FORM_ROW}>
        <div className={FORM_LABEL}>Duration (min)</div>
        <input
          type="number"
          className={FORM_CONTROL}
          value={formData.duration}
          onChange={(e) =>
            setFormData((p) => ({
              ...p,
              duration: e.target.value === "" ? "" : Number(e.target.value),
            }))
          }
          min={0}
        />
      </div>

      {/* Price from */}
      <div className={FORM_ROW}>
        <div className={FORM_LABEL}>Price From (cents)</div>
        <input
          type="number"
          className={FORM_CONTROL}
          value={formData.priceFrom}
          onChange={(e) =>
            setFormData((p) => ({
              ...p,
              priceFrom: e.target.value === "" ? "" : Number(e.target.value),
            }))
          }
          min={0}
        />
      </div>

      {/* Price to */}
      <div className={FORM_ROW}>
        <div className={FORM_LABEL}>Price To (cents)</div>
        <input
          type="number"
          className={FORM_CONTROL}
          value={formData.priceTo}
          onChange={(e) =>
            setFormData((p) => ({
              ...p,
              priceTo: e.target.value === "" ? "" : Number(e.target.value),
            }))
          }
          min={0}
        />
      </div>

      {/* Description */}
      <div className={`${FORM_ROW} items-start`}>
        <div className={FORM_LABEL}>Description</div>
        <textarea
          className={`${FORM_CONTROL} resize-y min-h-[80px]`}
          value={formData.description}
          onChange={(e) =>
            setFormData((p) => ({
              ...p,
              description: e.target.value,
            }))
          }
        />
      </div>

      {/* Consult required */}
      <div className={FORM_ROW}>
        <div className={FORM_LABEL}>Consult Required</div>
        <input
          type="checkbox"
          className="h-4 w-4 accent-blue-600"
          checked={formData.requiresConsult}
          onChange={(e) =>
            setFormData((p) => ({
              ...p,
              requiresConsult: e.target.checked,
            }))
          }
        />
      </div>

      {/* Active */}
      <div className={FORM_ROW}>
        <div className={FORM_LABEL}>Active</div>
        <input
          type="checkbox"
          className="h-4 w-4 accent-blue-600"
          checked={formData.active}
          onChange={(e) =>
            setFormData((p) => ({ ...p, active: e.target.checked }))
          }
        />
      </div>

      {/* Actions */}
      <div className="flex gap-3 pt-4">
        <Button label="Create Service" type="submit" />
        <Button
          label="Cancel"
          onClick={onClose}
          className="bg-gray-300 hover:bg-gray-400"
        />
      </div>
    </form>
  );
}
