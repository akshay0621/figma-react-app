# Figma to React - Multi-Step Registration Flow

A pixel-perfect implementation of a multi-step registration flow built with React, TypeScript, and Tailwind CSS v4, featuring a beautiful 3D book page flip animation.

## 🎯 Project Overview

This project converts a Figma design into a fully functional React application featuring:
- **5-step registration wizard** with 3D page flip animations
- **Form validation** using Zod
- **Responsive design** (mobile-first approach)
- **Interactive states** (hover, focus, active, loading, error)
- **Modern UI** with Tailwind CSS v4
- **Modular architecture** for maintainability

## 🚀 Live Demo

- **Local Development**: `http://localhost:5173`
- **Deployed URL**: _(To be added after deployment)_

## 📋 Features

### Registration Flow
1. **Account Type Selection** - Choose between Personal or Business account
2. **Contact Information** - Phone number with country code selection
3. **OTP Verification** - 4-digit code input with auto-focus and verification
4. **Personal Details** - First and last name
5. **Password Creation** - Secure password with strength requirements
6. **Success Confirmation** - Account created confirmation with summary

## 🛠️ Tech Stack

- **React 19** - UI library
- **TypeScript** - Type safety
- **Vite** - Build tool
- **Tailwind CSS v4** - Styling
- **Framer Motion** - 3D page flip animations
- **Zod** - Schema validation
- **Lucide React** - Icons
- **React Hook Form** - Form state management

## 🎨 Design Decisions

### Color Palette
- **Primary Blue**: `#2563EB` (buttons, accents)
- **Primary Hover**: `#1D4ED8` (button hover state)
- **Background**: Gradient blue for left panel
- **Text**: Gray-900 for primary text, Gray-500 for secondary

### Component Architecture
```
src/
├── components/
│   ├── layout/
│   │   └── SplitLayout.tsx          # Main layout wrapper
│   ├── wizard/
│   │   ├── FormWizardCard.tsx       # Main card with 3D flip animation
│   │   ├── FormHeader.tsx           # Progress bar, title, subtitle
│   │   └── FormActions.tsx          # Back and Continue buttons
│   ├── steps/
│   │   ├── Step1AccountType.tsx     # Account selection
│   │   ├── Step2Contact.tsx         # Phone input with country code
│   │   ├── Step3OTP.tsx             # OTP verification
│   │   ├── Step4Details.tsx         # Name inputs
│   │   ├── Step5Password.tsx        # Password creation
│   │   ├── SuccessOverlay.tsx       # Completion overlay
│   │   └── SuccessView.tsx          # Success animation
│   ├── ui/
│   │   ├── Button.tsx               # Reusable button component
│   │   ├── Input.tsx                # Form input component
│   │   ├── Card.tsx                 # Selection card component
│   │   ├── OTPInput.tsx             # OTP digit inputs
│   │   └── Notification.tsx         # OTP notification toast
│   └── StepRenderer.tsx             # Step routing component
├── lib/
│   ├── utils.ts                     # Utility functions (cn)
│   ├── validation.ts                # Zod schemas
│   ├── stepHelpers.tsx              # Step titles and subtitles
│   ├── useFormWizard.ts             # Form state management hook
│   ├── usePageFlipAnimation.ts      # Animation direction hook
│   └── animationConfig.ts           # Animation variants
└── App.tsx                          # Main app orchestrator (67 lines)
```

### Validation Rules
- **Phone**: Minimum 10 digits, numeric only
- **OTP**: Exactly 4 digits (auto-generated and displayed in notification)
- **Name**: Minimum 2 characters each (first and last name)
- **Password**: 
  - Minimum 8 characters
  - At least 1 uppercase letter
  - At least 1 lowercase letter
  - At least 1 number
  - At least 1 special symbol
  - Confirm password must match

## 🎭 Interaction States

### Buttons
- **Default**: Blue background with shadow
- **Hover**: Darker blue (#1D4ED8)
- **Active**: Even darker blue (#1E40AF)
- **Loading**: Spinner animation with disabled state
- **Disabled**: Reduced opacity, no pointer events

### Inputs
- **Default**: Gray border
- **Focus**: Blue border with ring effect
- **Error**: Red border with error message
- **Filled**: Maintains focus styling

### Cards (Account Selection)
- **Default**: White background, gray border
- **Hover**: Blue border, subtle shadow
- **Selected**: Blue border, blue background tint, filled radio

## 🔄 Animations

- **3D Page Flip**: Book-like page flip transition between steps (both forward and backward)
- **Direction-Aware**: Flips right-to-left when going forward, left-to-right when going back
- **Progress Bar**: Smooth width animation as you progress
- **Loading Spinner**: Rotate animation
- **Radio Selection**: Scale animation on select
- **Error Messages**: Slide down with fade in
- **OTP Auto-focus**: Smooth focus transition between inputs
- **Success Confetti**: Celebration animation on completion

## 🧪 Testing the Flow

1. **Step 1**: Select "Personal" or "Business"
2. **Step 2**: Select country code and enter phone (e.g., `1234567890`)
3. **Step 3**: Check notification for OTP, enter the 4-digit code
4. **Step 4**: Enter first and last name (e.g., `John Doe`)
5. **Step 5**: Create password (e.g., `Test@1234`) and confirm
6. **Success**: View confirmation screen with confetti animation

## 📱 Responsive Design

- **Mobile (< 1024px)**: Single column, full-width form with mobile-optimized back button
- **Desktop (≥ 1024px)**: Split layout with brand panel on left, form on right

## 📄 License

Free to use this project for learning or as a template.

## 👨‍💻 Author

Built as part of a Figma-to-React assessment, showcasing modern React patterns and animation techniques.

---

**Note**: This is a frontend-only implementation. The OTP is auto-generated and displayed in a notification toast. No data is actually stored or sent to a backend.
