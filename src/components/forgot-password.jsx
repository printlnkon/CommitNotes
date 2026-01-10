import { useState } from "react";
import { toast } from "sonner";
import { cn } from "@/lib/utils";
import { Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { forgotPasswordAPI } from "@/api/forgotPassword";
import {
  ArrowLeftToLine,
  Info,
  KeyRound,
  Mail,
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

export default function ForgotPassword({ className, ...props }) {
  const [isLoading, setIsLoading] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = async (email) => {
    setIsLoading(true);

    const { data: resetPassword, error } = await forgotPasswordAPI.forgotPassword(email);

    if (error) {
      toast.error(error.message || "Failed to send reset link.");
    }

    if (resetPassword) {
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
              <KeyRound className="size-28" />
            </div>
            <span className="sr-only">Forgot Password</span>
            {/* title */}
            <h1 className="text-2xl font-bold">Forgot your password?</h1>
            {/* subtitle */}
            <FieldDescription className="text-xs">
              Enter your email and we'll send you a link to reset your password.
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
          <Field>
            <Button
              type="submit"
              className="cursor-pointer"
              disabled={isLoading}
            >
              {isLoading ? "Sending..." : "Send Email"}
            </Button>
          </Field>
          <Field>
            <Button variant="ghost" className="cursor-pointer">
              <div className="flex items-center gap-1">
                <ArrowLeftToLine />
              </div>
              <Link to="/login">Back to Login</Link>
            </Button>
          </Field>
        </FieldGroup>
      </form>
    </div>
  );
}
