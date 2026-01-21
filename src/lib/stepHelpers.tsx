export const getStepTitle = (step: number) => {
    switch (step) {
        case 1: return (
            <>To join us tell us <strong>what type of account</strong> you are opening</>
        );
        case 2: return "Enter your Mobile Number";
        case 3: return "OTP Verification";
        case 4: return "What's your name?";
        case 5: return "Create a password";
        default: return "";
    }
};

export const getStepSubtitle = (step: number) => {
    switch (step) {
        case 1: return "";
        case 2: return "We'll send you a verification code via SMS.";
        case 3: return "";
        case 4: return "";
        case 5: return "";
        default: return "";
    }
};
