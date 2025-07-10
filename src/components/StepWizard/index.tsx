import React, { useState } from 'react';
import clsx from 'clsx';
import IonicIcon from '../IonicIcon';
import styles from './styles.module.css';

interface Step {
  id: string;
  title: string;
  description: string;
  content: React.ReactNode;
  completed?: boolean;
  required?: boolean;
}

interface StepWizardProps {
  steps: Step[];
  title?: string;
  showProgress?: boolean;
  allowSkip?: boolean;
  onStepChange?: (stepIndex: number) => void;
  onComplete?: () => void;
  className?: string;
}

const StepWizard: React.FC<StepWizardProps> = ({
  steps,
  title,
  showProgress = true,
  allowSkip = false,
  onStepChange,
  onComplete,
  className,
}) => {
  const [currentStep, setCurrentStep] = useState(0);
  const [completedSteps, setCompletedSteps] = useState<Set<string>>(new Set());

  const handleStepClick = (stepIndex: number) => {
    if (allowSkip || stepIndex <= currentStep || completedSteps.has(steps[stepIndex].id)) {
      setCurrentStep(stepIndex);
      onStepChange?.(stepIndex);
    }
  };

  const handleNext = () => {
    if (currentStep < steps.length - 1) {
      const nextStep = currentStep + 1;
      setCurrentStep(nextStep);
      setCompletedSteps(prev => new Set([...prev, steps[currentStep].id]));
      onStepChange?.(nextStep);
    } else {
      setCompletedSteps(prev => new Set([...prev, steps[currentStep].id]));
      onComplete?.();
    }
  };

  const handlePrevious = () => {
    if (currentStep > 0) {
      const prevStep = currentStep - 1;
      setCurrentStep(prevStep);
      onStepChange?.(prevStep);
    }
  };

  const isStepAccessible = (stepIndex: number) => {
    return allowSkip || stepIndex <= currentStep || completedSteps.has(steps[stepIndex].id);
  };

  const getStepStatus = (stepIndex: number) => {
    if (completedSteps.has(steps[stepIndex].id)) return 'completed';
    if (stepIndex === currentStep) return 'current';
    if (stepIndex < currentStep) return 'visited';
    return 'upcoming';
  };

  return (
    <div className={clsx(styles.stepWizard, className)}>
      {title && (
        <div className={styles.header}>
          <h3 className={styles.title}>
            <IonicIcon name="school-outline" size={24} />
            {title}
          </h3>
        </div>
      )}

      {showProgress && (
        <div className={styles.progressBar}>
          <div 
            className={styles.progressFill}
            style={{ width: `${((currentStep + 1) / steps.length) * 100}%` }}
          />
        </div>
      )}

      <div className={styles.stepsContainer}>
        <div className={styles.stepsList}>
          {steps.map((step, index) => {
            const status = getStepStatus(index);
            const isAccessible = isStepAccessible(index);
            
            return (
              <div
                key={step.id}
                className={clsx(
                  styles.stepItem,
                  styles[`stepItem--${status}`],
                  isAccessible && styles.stepItemAccessible
                )}
                onClick={() => isAccessible && handleStepClick(index)}
              >
                <div className={styles.stepNumber}>
                  {status === 'completed' ? (
                    <IonicIcon name="checkmark-outline" size={20} color="white" />
                  ) : (
                    <span>{index + 1}</span>
                  )}
                </div>
                <div className={styles.stepContent}>
                  <h4 className={styles.stepTitle}>{step.title}</h4>
                  <p className={styles.stepDescription}>{step.description}</p>
                </div>
                {step.required && (
                  <span className={styles.requiredBadge}>Obrigatório</span>
                )}
              </div>
            );
          })}
        </div>

        <div className={styles.stepContent}>
          <div className={styles.stepHeader}>
            <h4 className={styles.currentStepTitle}>
              Passo {currentStep + 1}: {steps[currentStep].title}
            </h4>
            <span className={styles.stepCounter}>
              {currentStep + 1} de {steps.length}
            </span>
          </div>
          
          <div className={styles.stepBody}>
            {steps[currentStep].content}
          </div>

          <div className={styles.stepNavigation}>
            <button
              className={clsx(styles.navButton, styles.prevButton)}
              onClick={handlePrevious}
              disabled={currentStep === 0}
            >
              <IonicIcon name="chevron-back-outline" size={20} />
              Anterior
            </button>
            
            <button
              className={clsx(styles.navButton, styles.nextButton)}
              onClick={handleNext}
            >
              {currentStep === steps.length - 1 ? (
                <>
                  Concluir
                  <IonicIcon name="checkmark-outline" size={20} />
                </>
              ) : (
                <>
                  Próximo
                  <IonicIcon name="chevron-forward-outline" size={20} />
                </>
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StepWizard; 