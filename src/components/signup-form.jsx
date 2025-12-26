import { useState } from "react";
import { signUpAPI } from "@/api/signup";
import { useForm, useWatch } from "react-hook-form";
import { Eye, EyeOff, GalleryVerticalEnd, LoaderCircle, Lock, User } from "lucide-react";
import { cn } from "@/lib/utils";
import { toast } from "sonner";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Field,
  FieldDescription,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field";

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
    control,
    reset,
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm({ mode: "onChange" });
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const onSubmit = async (data) => {
    setIsLoading(true);

    const { email, password } = data;

    const { data: registeredData, error } = await signUpAPI.registerUser({
      email,
      password,
    });

    if (error) {
      toast.error(error.message || "Error signing up. Please try again.");
      setIsLoading(false);
    } else {
      toast.success(
        "Account created successfully! Please check your email to verify your account.",
        registeredData
      );
      reset();
    }
    setIsLoading(false);
  };

  const confirmPassword = useWatch({
    control,
    name: "password",
  });

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
            <FieldLabel htmlFor="email">Email</FieldLabel>
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
            <FieldLabel htmlFor="password">Password</FieldLabel>
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
                    value: 8,
                    message: "Password must be at least 8 characters.",
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
          <Field>
            <FieldLabel htmlFor="confirm-password">Confirm Password</FieldLabel>
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
          {/* show reminder to fill out all fields */}
          {!isValid && (
            <>
              <ShowTextReminder />
            </>
          )}
          {/* create account button */}
          <Field>
            <Button
              type="submit"
              disabled={isLoading || !isValid}
              className="cursor-pointer"
            >
              {isLoading ? (
                <>
                  <LoaderCircle className="mr-2 h-4 w-4 animate-spin" />
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
