import StepProgressBar from "./StepProgressBar.jsx";
import Icon from "./Icon.jsx";

export default function StepWizard({ steps = [], currentStep = 0, onStepChange, onSubmit, canAdvance = true, submitLabel = "Submit" }) {
  const isLast = currentStep === steps.length - 1;
  const back = () => onStepChange && currentStep > 0 && onStepChange(currentStep - 1);
  const next = () => {
    if (!canAdvance) return;
    if (isLast) onSubmit && onSubmit();
    else onStepChange && onStepChange(currentStep + 1);
  };
  return (
    <div className="step-wizard">
      <StepProgressBar steps={steps} currentStep={currentStep} />
      <div className="step-wizard-content">{steps[currentStep] && steps[currentStep].content}</div>
      <div className="step-wizard-actions">
        <button type="button" className="btn btn-soft" onClick={back} disabled={currentStep === 0}>
          <Icon name="arrow-left" size={16} /> Back
        </button>
        <button type="button" className="btn btn-primary" onClick={next} disabled={!canAdvance}>
          {isLast ? submitLabel : <>Next <Icon name="arrow" size={16} /></>}
        </button>
      </div>
    </div>
  );
}
