import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { SplitLayout } from './components/layout/SplitLayout';
import { SuccessOverlay } from './components/steps/SuccessOverlay';
import { Notification } from './components/ui/Notification';
import { DisclaimerBanner } from './components/ui/DisclaimerBanner';
import { FormWizardCard } from './components/wizard/FormWizardCard';
import { useFormWizard } from './lib/useFormWizard';
import { usePageFlipAnimation } from './lib/usePageFlipAnimation';
import { step5Schema } from './lib/validation';
import { useAuth } from './context/AuthContext';

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
  const { login } = useAuth();
  const navigate = useNavigate();

  // When registration completes (step 6), log in and navigate to dashboard
  useEffect(() => {
    if (step === 6) {
      login({
        accountType: formData.accountType || 'personal',
        countryCode: formData.countryCode,
        phone: formData.phone,
        firstName: formData.firstName,
        lastName: formData.lastName,
      });
      const timer = setTimeout(() => navigate('/dashboard'), 1500);
      return () => clearTimeout(timer);
    }
  }, [step, formData, login, navigate]);
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
