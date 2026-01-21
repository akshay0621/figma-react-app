import { SplitLayout } from './components/layout/SplitLayout';
import { SuccessOverlay } from './components/steps/SuccessOverlay';
import { Notification } from './components/ui/Notification';
import { DisclaimerBanner } from './components/ui/DisclaimerBanner';
import { FormWizardCard } from './components/wizard/FormWizardCard';
import { useFormWizard } from './lib/useFormWizard';
import { usePageFlipAnimation } from './lib/usePageFlipAnimation';
import { step5Schema } from './lib/validation';

function App() {
  const {
    step,
    isLoading,
    errors,
    formData,
    generatedOTP,
    showOTPNotification,
    isOTPVerified,
    updateData,
    handleNext,
    handleBack,
    handleResendOTP,
    setShowOTPNotification,
  } = useFormWizard();

  const direction = usePageFlipAnimation(step);

  // Check if step 5 is valid (passwords match and requirements met)
  const isStep5Valid = step === 5
    ? step5Schema.safeParse({ password: formData.password, confirmPassword: formData.confirmPassword }).success
    : true;

  // Disable continue button
  const isContinueDisabled = (step === 3 && !isOTPVerified) || (step === 5 && !isStep5Valid);

  return (
    <div className="h-screen overflow-hidden flex flex-col">
      {/* Privacy Disclaimer Banner */}
      <DisclaimerBanner />

      <div className="flex-1 overflow-hidden">
        <SplitLayout>
          <FormWizardCard
            step={step}
            direction={direction}
            formData={formData}
            errors={errors}
            isLoading={isLoading}
            isContinueDisabled={isContinueDisabled}
            isOTPVerified={isOTPVerified}
            updateData={updateData}
            onBack={handleBack}
            onNext={handleNext}
            onResendOTP={handleResendOTP}
          />
        </SplitLayout>
      </div>

      {/* OTP Notification */}
      <Notification
        message={generatedOTP}
        show={showOTPNotification}
        onClose={() => setShowOTPNotification(false)}
      />

      {/* Success Overlay */}
      {step === 6 && <SuccessOverlay formData={formData} />}
    </div>
  );
}

export default App;
