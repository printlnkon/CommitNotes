import { useEffect, useState } from "react";
import { loginAPI } from "@/api/login";
import { Link, useNavigate } from "react-router-dom";
import { useForm, Controller } from "react-hook-form";
import { cn } from "@/lib/utils";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Eye,
  EyeOff,
  GalleryVerticalEnd,
  Info,
  Lock,
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
import { logoutAPI } from "../api/logout";

export default function LoginForm({ className, ...props }) {
  const {
    reset,
    control,
    register,
    setValue,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm({ mode: "onChange" });
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [isRateLimited, setIsRateLimited] = useState(false);
  const navigate = useNavigate();

  // load remembered credentials on mount
  useEffect(() => {
    const { email, rememberMe } = logoutAPI.getRememberedCredentials();
    if (email) {
      setValue("email", email, { shouldValidate: true});
    }
    if (rememberMe) {
      setValue("rememberMe", true);
    }
  }, [setValue]);

  const onSubmit = async (data) => {
    setIsLoading(true);

    const { email, password, rememberMe } = data;

    let ipAddress = "";
    try {
      const res = await fetch("https://api.ipify.org?format=json");
      const ipData = await res.json();
      ipAddress = ipData.ip;
    } catch (error) {
      console.error("Failed to get IP Address: ", error.message);
      ipAddress = "unknown"
    }

    const { data: loginData, error } = await loginAPI.loginUser({ email, password, ipAddress, rememberMe: rememberMe || false });

    if (error) {
      if (error.message && error.message.includes("Too many login attempts")) {
        toast.error("Too many login attempts.", {
          description: "Please try again in 10 minutes.",
          duration: 3500,
        });
        setIsRateLimited(true);
      } else {
        toast.error(error.message || "Invalid credentials. Please try again.", {
          duration: 3200,
        });
      }
      setIsLoading(false);
      return;
    } 
    
    if (loginData) {
      toast.success("Login successful", {
        duration: 2000,
      });
      navigate("/home");
      reset();
    }
    setIsLoading(false);
  };

  return (
    <div className={cn("flex flex-col gap-6", className)} {...props}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <FieldGroup>
          <div className="flex flex-col items-center gap-2 text-center">
            {/* logo */}
            <div className="flex size-8 items-center justify-center rounded-md">
              <GalleryVerticalEnd className="size-32" />
            </div>
            <span className="sr-only">CommitNotes</span>
            {/* title */}
            <h1 className="text-xl font-bold">Welcome to CommitNotes</h1>
            {/* subtitle */}
            <FieldDescription>
              Don&apos;t have an account? <Link to="/signup">Sign up</Link>
            </FieldDescription>
          </div>
          {/* email */}
          <Field>
            <div className="flex items-center gap-1">
              <FieldLabel htmlFor="password">Email</FieldLabel>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Info className="h-3.5 w-3.5 cursor-help"/>
                </TooltipTrigger>
                <TooltipContent>
                  <p>Input your email.</p>
                </TooltipContent>
              </Tooltip>
            </div>
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
              <span className="text-xs text-destructive">
                {errors.email.message}
              </span>
            )}
          </Field>
          {/* password */}
          <Field>
            <div className="flex items-center gap-1">
              <FieldLabel htmlFor="password">Password</FieldLabel>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Info className="h-3.5 w-3.5 cursor-help"/>
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
                    message: "Must contain at least 8 chars with uppercase, lowercase, and number.",
                  }
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
          {/* remember me */}
          <div className="flex items-center gap-2">
            <Controller 
              name="rememberMe"
              control={control}
              defaultValue={false}
              render={({ field }) => (
                <Checkbox
                  id="rememberMe"
                  name="rememberMe"
                  checked={field.value}
                  onCheckedChange={field.onChange}
                />
              )}
            />
            <label htmlFor="rememberMe" className="cursor-pointer select-none text-sm">
              Remember me
            </label>
          </div>
          {/* login button */}
          <Field>
            <Button
              type="submit"
              className="cursor-pointer"
              disabled={isLoading || isRateLimited || !isValid}
            >
              {isLoading 
              ? (
                <>
                  Logging in...
                </>
              ) : isRateLimited
                  ? "Try again in 10 minutes."
                  : "Login"
              }
            </Button>
          </Field>
        {/* forgot password */}
        <FieldDescription className="flex items-center justify-end">
          <Link to="/forgot-password" className="text-xs m-0">
            Forgot password?
          </Link>
        </FieldDescription>
        </FieldGroup>
      </form>
    </div>
  );
}
