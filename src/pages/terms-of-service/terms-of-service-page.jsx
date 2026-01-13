import { ArrowLeft } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardFooter,
} from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";

export default function TermsOfServicePage() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-slate-50/50 dark:bg-background px-4 py-12">
      <Card className="w-full max-w-2xl shadow-xl border-t-4 border-t-primary">
        <CardHeader className="space-y-1 pb-6 text-center border-b">
          <CardTitle className="text-3xl font-bold tracking-tight">
            Terms of Service
          </CardTitle>
          <p className="text-sm text-muted-foreground">
            Last Updated: January 2026
          </p>
        </CardHeader>

        <CardContent className="p-0">
          <ScrollArea className="h-[400px] px-8 py-6">
            <div className="grid gap-8">
              <section className="space-y-3">
                <h2 className="text-lg font-bold flex items-center gap-2">
                  <span className="flex h-6 w-6 items-center justify-center rounded-full bg-primary/10 text-xs text-primary">
                    1
                  </span>
                  Acceptance of Terms
                </h2>
                <p className="text-sm leading-relaxed text-muted-foreground ml-8">
                  By accessing and using{" "}
                  <span className="font-medium text-foreground">
                    CommitNotes
                  </span>
                  , you accept and agree to be bound by the terms and provision
                  of this agreement. If you do not agree to abide by the above,
                  please do not use this service.
                </p>
              </section>

              <section className="space-y-3">
                <h2 className="text-lg font-bold flex items-center gap-2">
                  <span className="flex h-6 w-6 items-center justify-center rounded-full bg-primary/10 text-xs text-primary">
                    2
                  </span>
                  Modifications to Service
                </h2>
                <p className="text-sm leading-relaxed text-muted-foreground ml-8">
                  We reserve the right to modify or discontinue, temporarily or
                  permanently, the service with or without notice.
                </p>
              </section>

              <section className="space-y-3">
                <h2 className="text-lg font-bold flex items-center gap-2">
                  <span className="flex h-6 w-6 items-center justify-center rounded-full bg-primary/10 text-xs text-primary">
                    3
                  </span>
                  User Conduct
                </h2>
                <p className="text-sm leading-relaxed text-muted-foreground ml-8">
                  You agree not to use the service for any unlawful or
                  prohibited activities. You are responsible for all content you
                  create and share.
                </p>
              </section>

              <section className="space-y-3">
                <h2 className="text-lg font-bold flex items-center gap-2">
                  <span className="flex h-6 w-6 items-center justify-center rounded-full bg-primary/10 text-xs text-primary">
                    4
                  </span>
                  Termination
                </h2>
                <p className="text-sm leading-relaxed text-muted-foreground ml-8">
                  We may terminate or suspend your access to the service at any
                  time, without prior notice or liability, for any reason.
                </p>
              </section>

              <section className="space-y-3 pb-4">
                <h2 className="text-lg font-bold flex items-center gap-2">
                  <span className="flex h-6 w-6 items-center justify-center rounded-full bg-primary/10 text-xs text-primary">
                    5
                  </span>
                  Contact Information
                </h2>
                <p className="text-sm leading-relaxed text-muted-foreground ml-8">
                  If you have any questions about these Terms, please contact
                  the developer at{" "}
                  <a
                    href="mailto:kalfonteincruz@gmail.com"
                    className="text-primary font-medium hover:underline"
                  >
                    kalfonteincruz@gmail.com
                  </a>
                  .
                </p>
              </section>
            </div>
          </ScrollArea>
        </CardContent>

        <Separator />

        <CardFooter className="flex flex-col sm:flex-row justify-start bg-muted/30">
          <Button asChild className="w-full sm:w-auto gap-2 shadow-sm">
            <Link to="/signup">
              <ArrowLeft className="w-4 h-4" />
              Back to Signup
            </Link>
          </Button>
        </CardFooter>
      </Card>

      <footer className="mt-8 text-center text-xs text-muted-foreground/60">
        &copy; {new Date().getFullYear()} CommitNotes. All rights reserved.
      </footer>
    </div>
  );
}
