import { useState } from "react";
import { toast } from "sonner";
import { cn } from "@/lib/utils";
import { logoutAPI } from "@/api/logout";
import { Input } from "@/components/ui/input";
import { useAuth } from "@/context/AuthContext";
import { Button } from "@/components/ui/button";
import { useForm, useWatch } from "react-hook-form";
import { updatePasswordAPI } from "@/api/updatePassword";
import {
  CheckCircle,
  Eye,
  EyeOff,
  Info,
  XCircle,
  Lock,
  RotateCcwKey,
  BadgeX,
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
import { Link, useNavigate } from "react-router-dom";

export default function UpdatePasswordPage({ className, ...props }) {
  const { user, loading } = useAuth();
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

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

  const onSubmit = async ({ password }) => {
    setIsLoading(true);

    const { data: updatePassword, error } = await updatePasswordAPI.updatePassword(password);

    if (error) {
      toast.error(error.message || "Failed to send reset link.");
    }

    // logout user once updating of password succeeded
    await logoutAPI.logoutUser();

    if (updatePassword) {
      toast.success("Password updated successfully.", {
        description: "You will be directed to login page.",
        duration: 3500,
      });
    }
    navigate("/login")
    
    setIsLoading(false);
  };

  if (loading) {
    return (
      <>
      <div className="flex flex-col items-center justify-center min-h-[60vh] px-4">
        <h1 className="text-xl font-semibold">Loading...</h1>
      </div>
      </>
    );
  }

  if (user) {
    return (
      <>
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
                <FieldDescription className="text-xs text-muted-foreground">
                  To keep your account secure, choose a password that follows the guidelines below.
                </FieldDescription>
              </div>
              {/* password */}
              <Field>
                <div className="flex items-center gap-1">
                  <FieldLabel htmlFor="password">New Password</FieldLabel>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Info className="h-3.5 w-3.5 cursor-help" />
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>Input your new password.</p>
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
                    aria-label={
                      showPassword ? "Hide password" : "Show password"
                    }
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
      </>
    );
  }

  return (
    <>
      <main>
        {/* error display */}
        <div className="flex flex-col items-center justify-center gap-2">
          <section className="flex flex-col items-center space-y-2">
            <BadgeX size={96} className="text-destructive" />
            <h1 className="text-2xl font-bold">Something went wrong!</h1>
            <h2 className="text-sm text-muted-foreground">
              Try requesting forgot password again.
            </h2>
          </section>
        </div>
        {/* button */}
        <section className="flex justify-center mt-4">
          <Link to="/login">
            <Button className="cursor-pointer">Login</Button>
          </Link>
        </section>
      </main>
    </>
  );
}
