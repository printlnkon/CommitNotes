import { GalleryVerticalEnd, Lock, User } from "lucide-react";
import { Link } from "react-router-dom";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Field,
  FieldDescription,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";

export default function LoginForm({ className, ...props }) {
  return (
    <div className={cn("flex flex-col gap-6", className)} {...props}>
      <form>
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
              Don&apos;t have an account? <Link to="/signup">Sign up</Link>
            </FieldDescription>
          </div>
          {/* username */}
          <Field>
            <FieldLabel htmlFor="username">Username</FieldLabel>
            <div className="relative flex items-center text-muted-foreground focus-within:text-foreground">
              <User className="h-5 w-5 absolute ml-3 pointer-events-none" />
              <Input
                id="username"
                type="username"
                placeholder="Username"
                className="pl-10"
                required
              />
            </div>
          </Field>
          {/* password */}
          <Field>
            <FieldLabel htmlFor="password">Password</FieldLabel>
            <div className="relative flex items-center text-muted-foreground focus-within:text-foreground">
              <Lock className="h-5 w-5 absolute ml-3 pointer-events-none" />
              <Input
                id="password"
                type="password"
                placeholder="********"
                className="pl-10"
                required
              />
            </div>
          </Field>
          <Field>
            <Button type="submit" className="cursor-pointer">
              Login
            </Button>
          </Field>
        </FieldGroup>
      </form>
    </div>
  );
}
