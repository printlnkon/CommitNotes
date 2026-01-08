import { useState } from "react";
import { signUpAPI } from "@/api/signup";
import { useForm, useWatch } from "react-hook-form";
import { cn } from "@/lib/utils";
import { toast } from "sonner";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
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
import { 
  CheckCircle,
  Eye, 
  EyeOff,
  GalleryVerticalEnd,
  Info,
  Lock,
  User,
  XCircle
} from "lucide-react";

const ShowTextReminder = () => {
  return (
    <>
      <div className="text-xs text-destructive">
        Please fill out all fields.
      </div>
    </>
  );
};


export default function SignupForm({ className, ...props }) {
  const {
    reset,
    control,
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm({ mode: "onChange" });
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [isRateLimited, setIsRateLimited] = useState(false);

  const onSubmit = async (data) => {
    setIsLoading(true);

    const { email, password } = data;

    let ipAddress = "";
    try {
      const res = await fetch("https://api.ipify.org?format=json");
      const ipData = await res.json();
      ipAddress = ipData.ip;
    } catch (error) {
      console.error("Failed to get IP Address: ", error.message);
      ipAddress = "unknown";
    }

    const { data: registeredData, error } = await signUpAPI.registerUser({ email, password, ipAddress });

    if (error) {
      if (error.message && error.message.includes("Too many signup attempts")) {
        toast.error("Too many signup attempts.", {
          description: "Please try again in an hour.",
          duration: 3500,
        }); 
        setIsRateLimited(true);
      } else {
        toast.error(error.message || "Error signing up. Please try again.", {
          duration: 3200,
        });
        setIsLoading(false);
        return;
      }
    } 

    if (registeredData) {
      toast.success("Account created successfully.", {
        description: "Please check your email to verify your account.",
        duration: 3500,
      });
      reset();
      // TODO: navigate to page and display a message to verify their email
    }
    setIsLoading(false);
  };

  const confirmPassword = useWatch({
    control,
    name: "password",
  });

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
    }
  ]

  return (
    <div className={cn("flex flex-col gap-6", className)} {...props}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <FieldGroup>
          <div className="flex flex-col items-center gap-2 text-center">
            {/* logo */}
            <div className="flex size-8 items-center justify-center rounded-md">
              <GalleryVerticalEnd className="size-6" />
            </div>
            <span className="sr-only">CommitNotes</span>
            {/* title */}
            <h1 className="text-xl font-bold">Welcome to CommitNotes</h1>
            {/* subtitle */}
            <FieldDescription>
              Already have an account? <Link to="/login">Sign in</Link>
            </FieldDescription>
          </div>
          <Field>
            <div className="flex items-center gap-2">
              <Tooltip>
                <FieldLabel htmlFor="email">Email</FieldLabel>
                <TooltipTrigger asChild>
                  <Info className="w-3.5 h-3.5 cursor-help"/>
                </TooltipTrigger>
                <TooltipContent>
                  <p>Input your email.</p>
                </TooltipContent>
              </Tooltip>
            </div>
            <div className="relative flex items-center text-muted-foreground focus-within:text-foreground">
              <User className="h-5 w-5 absolute ml-3 pointer-events-none" />
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
                    message: "Email is required.",
                  },
                })}
              />
            </div>
            {errors.email && (
              <span className="text-xs text-destructive">
                {errors.email.message}
              </span>
            )}
          </Field>
          {/* password */}
          <Field>
            <div className="flex items-center gap-2">
              <FieldLabel htmlFor="password">Password</FieldLabel>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Info className="w-3.5 h-3.5 cursor-help"/>
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
                  minLength: {
                    value: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/,
                    message: "Must contain at least 8 chars with uppercase, lowercase, and number.",
                  },
                  validate: {
                    hasLowerCase: (value) =>
                      /[a-z]/.test(value) ||
                      "Must contain at least 1 lowercase letter",
                    hasUpperCase: (value) =>
                      /[A-Z]/.test(value) ||
                      "Must contain at least 1 uppercase letter.",
                    hasDigit: (value) =>
                      /[0-9]/.test(value) || "Must contain at least 1 digit.",
                    hasSymbol: (value) =>
                      /[!@#$%^&*(),.?"":{}|<>]/.test(value) ||
                      "Must contain at least 1 special character.",
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
          {/* confirm password */}
          <Field orientation="responsive">
            <div className="flex items-center gap-2">
              <FieldLabel htmlFor="confirm-password">Confirm Password</FieldLabel>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Info className="w-3.5 h-3.5 cursor-help"/>
                </TooltipTrigger>
                <TooltipContent>
                  <p>Confirm your password.</p>
                </TooltipContent>
              </Tooltip>
            </div>
            <div className="relative flex items-center text-muted-foreground focus-within:text-foreground">
              <Lock className="h-5 w-5 absolute ml-3 pointer-events-none" />
              <Input
                id="confirm-password"
                type={showPassword ? "text" : "password"}
                placeholder="********"
                className="pl-10"
                required
                {...register("confirmPassword", {
                  required: true,
                  message: "Please confirm your password",
                  validate: (value) =>
                    value === confirmPassword || "Passwords do not match.",
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
            {errors.confirmPassword && (
              <span className="text-xs text-destructive">
                {errors.confirmPassword.message}
              </span>
            )}
          </Field>
          
            <ul className="ml-2 space-y-1 text-xs">
              {passwordChecks.map((check) => (
                <li key={check.label} className="flex items-center gap-2">
                  {check.valid ? (
                    <CheckCircle className="text-chart-2 w-4 h-4"/>
                  ) : (
                    <XCircle className="text-destructive w-4 h-4"/>
                  )}
                  {check.label}
                </li>
              ))}
            </ul>
          
          {/* show reminder to fill out all fields */}
          {!isValid && (
            <>
              <ShowTextReminder />
            </>
          )}

          {/* terms of service & privacy policy checkbox */}
          <div className="flex items-center gap-2">
            <Checkbox id="terms-and-policy" {...register("terms-and-policy")} />
            <label htmlFor="terms-and-policy" className="cursor-pointer select-none text-xs">
              I agree to the{" "}
              <Link to="/login" className="underline hover:text-chart-3 font-medium">Terms of Services</Link>{" "}and{" "}
              <Link to="/login" className="underline hover:text-chart-3 font-medium">Privacy Policy</Link>
            </label>
          </div>

          {/* create account button */}
          <Field>
            <Button
              type="submit"
              disabled={isLoading || isRateLimited || !isValid}
              className="cursor-pointer"
            >
              {isLoading ? (
                <>
                  Creating account...
                </>
              ) : (
                "Create account"
              )}
            </Button>
          </Field>
        </FieldGroup>
      </form>
      {/* terms & condition */}
      <FieldDescription className="px-6 text-center">
        {/* TODO: add links to actual terms of service and privacy policy */}
        {/* pop-up modal */}
        By creating account, you agree to our <a href="#">
          Terms of Service
        </a>{" "}
        and <a href="#">Privacy Policy</a>.
      </FieldDescription>
    </div>
  );
}
