import { Check, X } from "lucide-react";

interface PasswordRequirement {
  text: string;
  validator: (password: string) => boolean;
}

const passwordRequirements: PasswordRequirement[] = [
  {
    text: "Mindestens 8 Zeichen",
    validator: (password) => password.length >= 8,
  },
  {
    text: "Mindestens ein Großbuchstabe",
    validator: (password) => /[A-Z]/.test(password),
  },
  {
    text: "Mindestens ein Kleinbuchstabe",
    validator: (password) => /[a-z]/.test(password),
  },
  {
    text: "Mindestens eine Zahl",
    validator: (password) => /\d/.test(password),
  },
  {
    text: "Mindestens ein Sonderzeichen",
    validator: (password) => /[!@#$%^&*(),.?":{}|<>]/.test(password),
  },
];

export function PasswordStrength({ password }: { password: string }) {
  return (
    <div className="space-y-2">
      {passwordRequirements.map((requirement, index) => (
        <div key={index} className="flex items-center gap-2">
          {requirement.validator(password) ? (
            <Check className="w-4 h-4 text-green-500" />
          ) : (
            <X className="w-4 h-4 text-red-500" />
          )}
          <span className="text-sm">{requirement.text}</span>
        </div>
      ))}
    </div>
  );
}
