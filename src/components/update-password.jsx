import { useState } from "react";
import { toast } from "sonner";
import { cn } from "@/lib/utils";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useForm, useWatch } from "react-hook-form";
import { updatePasswordAPI } from "@/api/updatePassword";
import {
  CheckCircle,
  Eye,
  EyeOff,
  Info,
  Mail,
  XCircle,
  Lock,
  RotateCcwKey,
} from "lucide-react";
import {
  Field,
  FieldDescription,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";

export default function UpdatePasswordPage({ className, ...props }) {
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const {
    control,
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const passwordValue = useWatch({
    control,
    name: "password",
    defaultValue: "",
  });

  const passwordChecks = [
    {
      label: "At least 1 number",
      valid: /\d/.test(passwordValue),
    },
    {
      label: "At least 8 characters",
      valid: passwordValue.length >= 8,
    },
    {
      label: "At least 1  lowercase letter",
      valid: /[a-z]/.test(passwordValue),
    },
    {
      label: "At least 1 uppercase letter",
      valid: /[A-Z]/.test(passwordValue),
    },
    {
      label: "At least 1 special character",
      valid: /[!@#$%^&*(),.?":{}|<>]/.test(passwordValue),
    },
  ];

  const onSubmit = async (email, password) => {
    setIsLoading(true);

    const { data: updatePassword, error } =
      await updatePasswordAPI.updatePassword({ email, password });

    if (error) {
      toast.error(error.message || "Failed to send reset link.");
    }

    if (updatePassword) {
      toast.success("Reset password link sent.", {
        description: "Please check your email.",
        duration: 3500,
      });
    }

    setIsLoading(false);
  };

  return (
    <div className={cn("flex flex-col gap-6", className)} {...props}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <FieldGroup>
          <div className="flex flex-col items-center gap-2 text-center">
            {/* logo */}
            <div className="flex items-center justify-center rounded-md">
              <RotateCcwKey className="size-28" />
            </div>
            <span className="sr-only">Update Password</span>
            {/* title */}
            <h1 className="text-2xl font-bold">Update your password</h1>
            {/* subtitle */}
            <FieldDescription className="text-xs">
              We strongly recommend you follow the password format below to
              enhance security.
            </FieldDescription>
          </div>
          {/* email */}
          <Field>
            <div className="flex items center gap-1">
              <FieldLabel htmlFor="forgot-password">Email</FieldLabel>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Info className="h-3.5 w-3.5 cursor-help" />
                </TooltipTrigger>
                <TooltipContent>
                  <p>Input your email.</p>
                </TooltipContent>
              </Tooltip>
            </div>
            <div>
              <div className="relative flex items-center text-muted-foreground focus-within:text-foreground">
                <Mail className="h-5 w-5 absolute ml-3 pointer-events-none" />
                <Input
                  id="email"
                  type="email"
                  placeholder="email@example.com"
                  className="pl-10"
                  required
                  {...register("email", {
                    required: true,
                    pattern: {
                      value: /^\S+@\S+$/i,
                      message: "Invalid email address.",
                    },
                  })}
                />
              </div>
              {errors.email && (
                <span className="text-xs-text-destructive">
                  {errors.email.message}
                </span>
              )}
            </div>
          </Field>
          {/* password */}
          <Field>
            <div className="flex items-center gap-1">
              <FieldLabel htmlFor="password">Password</FieldLabel>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Info className="h-3.5 w-3.5 cursor-help" />
                </TooltipTrigger>
                <TooltipContent>
                  <p>Input your password.</p>
                </TooltipContent>
              </Tooltip>
            </div>
            <div className="relative flex items-center text-muted-foreground focus-within:text-foreground">
              <Lock className="h-5 w-5 absolute ml-3 pointer-events-none" />
              <Input
                id="password"
                type={showPassword ? "text" : "password"}
                placeholder="********"
                className="pl-10"
                required
                {...register("password", {
                  required: true,
                  pattern: {
                    value: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/,
                    message:
                      "Must contain at least 8 chars with uppercase, lowercase, and number.",
                  },
                })}
              />
              <button
                type="button"
                tabIndex={-1}
                className="absolute right-2 p-1 text-muted-foreground hover:text-foreground"
                onClick={() => setShowPassword((prev) => !prev)}
                aria-label={showPassword ? "Hide password" : "Show password"}
              >
                {showPassword ? (
                  <EyeOff className="h-5 w-5" />
                ) : (
                  <Eye className="h-5 w-5" />
                )}
              </button>
            </div>
            {errors.password && (
              <span className="text-xs text-destructive">
                {errors.password.message}
              </span>
            )}
          </Field>
          {/* password validation checker */}
          <ul className="ml-2 space-y-1 text-xs">
            {passwordChecks.map((check) => (
              <li key={check.label} className="flex items-center gap-2">
                {check.valid ? (
                  <CheckCircle className="text-chart-2 w-4 h-4" />
                ) : (
                  <XCircle className="text-destructive w-4 h-4" />
                )}
                {check.label}
              </li>
            ))}
          </ul>
          {/* update button */}
          <Field>
            <Button
              type="submit"
              className="cursor-pointer"
              disabled={isLoading}
            >
              {isLoading ? "Updating..." : "Update password"}
            </Button>
          </Field>
        </FieldGroup>
      </form>
    </div>
  );
}
