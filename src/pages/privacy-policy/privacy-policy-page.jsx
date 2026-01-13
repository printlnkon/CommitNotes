import { ArrowLeft, ShieldCheck } from "lucide-react";
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

export default function PrivacyPolicyPage() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-slate-50/50 dark:bg-background px-4 py-12">
      <Card className="w-full max-w-2xl shadow-xl border-t-4 border-t-primary">
        <CardHeader className="space-y-1 pb-6 text-center border-b">
          <CardTitle className="text-3xl font-bold tracking-tight">
            Privacy Policy
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
                  Information We Collect
                </h2>
                <p className="text-sm leading-relaxed text-muted-foreground ml-8">
                  We collect information you provide directly to us when you
                  create an account, such as your email address, to provide a personalized experience in{" "}
                  <span className="font-medium text-foreground">
                    CommitNotes
                  </span>
                  .
                </p>
              </section>

              <section className="space-y-3">
                <h2 className="text-lg font-bold flex items-center gap-2">
                  <span className="flex h-6 w-6 items-center justify-center rounded-full bg-primary/10 text-xs text-primary">
                    2
                  </span>
                  How We Use Data
                </h2>
                <p className="text-sm leading-relaxed text-muted-foreground ml-8">
                  Your data is used solely to facilitate the core features of
                  the app, including note synchronization and repository
                  management. We do not sell your personal information to third
                  parties.
                </p>
              </section>

              <section className="space-y-3">
                <h2 className="text-lg font-bold flex items-center gap-2">
                  <span className="flex h-6 w-6 items-center justify-center rounded-full bg-primary/10 text-xs text-primary">
                    3
                  </span>
                  Security
                </h2>
                <p className="text-sm leading-relaxed text-muted-foreground ml-8">
                  We implement industry-standard security measures to protect
                  your data. However, no method of transmission over the
                  internet is 100% secure, and we cannot guarantee absolute
                  security.
                </p>
              </section>

              <section className="space-y-3">
                <h2 className="text-lg font-bold flex items-center gap-2">
                  <span className="flex h-6 w-6 items-center justify-center rounded-full bg-primary/10 text-xs text-primary">
                    4
                  </span>
                  Third-Party Services
                </h2>
                <p className="text-sm leading-relaxed text-muted-foreground ml-8">
                  CommitNotes may use third-party services like GitHub for
                  authentication. These services have their own privacy
                  policies, and we encourage you to review them.
                </p>
              </section>

              <section className="space-y-3 pb-4">
                <h2 className="text-lg font-bold flex items-center gap-2">
                  <span className="flex h-6 w-6 items-center justify-center rounded-full bg-primary/10 text-xs text-primary">
                    5
                  </span>
                  Your Rights
                </h2>
                <p className="text-sm leading-relaxed text-muted-foreground ml-8">
                  You have the right to access, update, or delete your personal
                  information at any time through your account settings or by
                  contacting the developer.
                </p>
              </section>
            </div>
          </ScrollArea>
        </CardContent>

        <Separator />

        <CardFooter className="flex flex-col sm:flex-row justify-start bg-muted/30 p-6">
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
