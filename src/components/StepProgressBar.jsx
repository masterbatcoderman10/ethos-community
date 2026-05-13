import StepIndicator from "./StepIndicator.jsx";
import React from "react";

export default function StepProgressBar({ steps = [], currentStep = 0 }) {
  return (
    <div className="step-progress">
      {steps.map((s, i) => {
        const status = i < currentStep ? "done" : i === currentStep ? "active" : "idle";
        return (
          <React.Fragment key={i}>
            <StepIndicator index={i + 1} label={s.label} status={status} />
            {i < steps.length - 1 && <span className={`step-progress-line ${i < currentStep ? "done" : ""}`} />}
          </React.Fragment>
        );
      })}
    </div>
  );
}
