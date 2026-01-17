import AOS from "aos";
import "aos/dist/aos.css";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { useEffect, useRef, useState } from "react";
import {
  FileText,
  Archive,
  Shield,
  Zap,
  CheckCircle,
  ArrowRight,
  GalleryVerticalEnd,
  ShieldQuestionMark,
  Menu,
  X,
} from "lucide-react";
import MovingBackground from "@/components/common/moving-background";

export default function LandingPage() {
  // Animation on scroll for sections
  const aboutRef = useRef(null);
  const howItWorksRef = useRef(null);
  const featuresRef = useRef(null);
  const ctaRef = useRef(null);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    // Always scroll to top on mount/refresh
    window.scrollTo({ top: 0, behavior: 'auto' });
    AOS.init({
      duration: 800,
      once: false,
      offset: 80,
      easing: 'ease-in-out',
    });
  }, []);

  // Close mobile menu on resize to desktop
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 768) {
        setMobileMenuOpen(false);
      }
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Prevent body scroll when mobile menu is open
  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [mobileMenuOpen]);

  const scrollToSection = (sectionId) => {
    setMobileMenuOpen(false);
    const section = document.getElementById(sectionId);
    if (section) {
      const nav = document.querySelector('nav');
      const navHeight = nav ? nav.offsetHeight : 0;
      const rect = section.getBoundingClientRect();
      const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
      const top = rect.top + scrollTop - navHeight - 24;
      window.scrollTo({ top, behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="min-h-[100dvh] flex flex-col justify-center pt-24 sm:pt-32 md:pt-40 pb-16 sm:pb-24 md:pb-32 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
        {/* Animated minimalist background */}
        <MovingBackground />
        <div className="relative z-10 max-w-4xl mx-auto text-center px-2">
          <h1 className="text-4xl sm:text-4xl md:text-5xl lg:text-7xl font-bold tracking-tight mb-4 sm:mb-6 leading-tight">
            Notes for the soul,
            <span className="text-primary block sm:inline"> Commit to the goal</span>
          </h1>
          <p className="text-base sm:text-lg md:text-xl text-muted-foreground mb-6 sm:mb-8 max-w-2xl mx-auto leading-relaxed">
            CommitNotes is your personal note-taking companion. Create,
            organize, and archive your notes with ease. Stay focused and never
            lose an important idea again.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center">
            <Link to="/signup" className="w-full sm:w-auto">
              <Button size="lg" className="cursor-pointer w-full sm:w-auto text-sm sm:text-base">
                Get Started
                <ArrowRight className="h-4 w-4 sm:h-5 sm:w-5" />
              </Button>
            </Link>
            <a
              href="#how-it-works"
              onClick={(e) => {
                e.preventDefault();
                scrollToSection('how-it-works');
              }}
              className="w-full sm:w-auto"
            >
              <Button
                size="lg"
                variant="outline"
                className="cursor-pointer w-full sm:w-auto text-sm sm:text-base"
              >
                See How It Works
              </Button>
            </a>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section
        id="about"
        ref={aboutRef}
        className="py-12 sm:py-16 md:py-20 px-4 sm:px-6 lg:px-8 bg-muted/50 mt-16 sm:mt-24 md:mt-32"
        data-aos="fade-up"
      >
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-8 sm:mb-12">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-3 sm:mb-4">
              About CommitNotes
            </h2>
            <p className="text-sm sm:text-base text-muted-foreground max-w-2xl mx-auto">
              Built for developers, students, and professionals who value
              simplicity and efficiency.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8 md:gap-12 items-center">
            <div className="order-2 md:order-1">
              <h3 className="text-xl sm:text-2xl font-semibold mb-3 sm:mb-4">Why CommitNotes?</h3>
              <p className="text-sm sm:text-base text-muted-foreground mb-4 sm:mb-6">
                In a world full of complex productivity tools, CommitNotes
                stands out with its simplicity. We believe that a great
                note-taking app should get out of your way and let you focus on
                what matters most — your ideas.
              </p>
              <ul className="space-y-2 sm:space-y-3">
                {[
                  "Simple and intuitive interface",
                  "Secure authentication with email verification",
                  "Archive notes without losing them",
                  "Access your notes from anywhere",
                ].map((item, index) => (
                  <li key={index} className="flex items-start sm:items-center gap-2 sm:gap-3">
                    <CheckCircle className="h-4 w-4 sm:h-5 sm:w-5 text-primary flex-shrink-0 mt-0.5 sm:mt-0" />
                    <span className="text-sm sm:text-base">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div className="order-1 md:order-2 bg-background rounded-lg border p-5 sm:p-6 md:p-8 shadow-sm">
              <div className="flex items-center gap-3 mb-3 sm:mb-4">
                <div className="h-10 w-10 sm:h-12 sm:w-12 rounded-full bg-primary/10 flex items-center justify-center">
                  <FileText className="h-5 w-5 sm:h-6 sm:w-6 text-primary" />
                </div>
                <div>
                  <h4 className="font-semibold text-sm sm:text-base">My First Note</h4>
                  <p className="text-xs sm:text-sm text-muted-foreground">
                    Created just now
                  </p>
                </div>
              </div>
              <p className="text-sm sm:text-base text-muted-foreground">
                This is an example of how your notes will look. Clean, simple,
                and focused on your content.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* How it Works Section */}
      <section
        id="how-it-works"
        ref={howItWorksRef}
        className="py-12 sm:py-16 md:py-20 px-4 sm:px-6 lg:px-8"
        data-aos="fade-up"
      >
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-8 sm:mb-12">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-3 sm:mb-4">
              How It Works
            </h2>
            <p className="text-sm sm:text-base text-muted-foreground max-w-2xl mx-auto">
              Get started in minutes with these simple steps.
            </p>
          </div>

          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 md:gap-8">
            {[
              {
                step: "1",
                title: "Sign Up",
                description:
                  "Create your free account with email verification for security.",
                icon: Shield,
              },
              {
                step: "2",
                title: "Create Notes",
                description:
                  "Start writing your notes with our simple and clean editor.",
                icon: FileText,
              },
              {
                step: "3",
                title: "Organize",
                description:
                  "Keep your notes organized and archive the ones you don't need.",
                icon: Archive,
              },
              {
                step: "4",
                title: "Stay Productive",
                description:
                  "Access your notes anytime and boost your productivity.",
                icon: Zap,
              },
            ].map((item, index) => (
              <div key={index} className="text-center">
                <div className="relative mb-4 sm:mb-6 inline-block">
                  <div className="h-12 w-12 sm:h-14 sm:w-14 md:h-16 md:w-16 rounded-full bg-primary/10 flex items-center justify-center mx-auto">
                    <item.icon className="h-6 w-6 sm:h-7 sm:w-7 md:h-8 md:w-8 text-primary" />
                  </div>
                  <span className="absolute -top-1 -right-1 sm:-top-2 sm:-right-2 h-6 w-6 sm:h-7 sm:w-7 md:h-8 md:w-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-xs sm:text-sm font-bold">
                    {item.step}
                  </span>
                </div>
                <h3 className="text-base sm:text-lg md:text-xl font-semibold mb-1 sm:mb-2">{item.title}</h3>
                <p className="text-xs sm:text-sm md:text-base text-muted-foreground leading-relaxed">{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section
        id="features"
        ref={featuresRef}
        className="py-12 sm:py-16 md:py-20 px-4 sm:px-6 lg:px-8 bg-muted/50"
        data-aos="fade-up"
      >
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-8 sm:mb-12">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-3 sm:mb-4">Features</h2>
            <p className="text-sm sm:text-base text-muted-foreground max-w-2xl mx-auto">
              Everything you need to manage your notes effectively.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5 md:gap-6">
            {[
              {
                title: "Secure Authentication",
                description:
                  "Email verification and password protection keep your notes safe.",
                icon: Shield,
              },
              {
                title: "Note Archiving",
                description:
                  "Archive notes you don't need right now without deleting them.",
                icon: Archive,
              },
              {
                title: "Fast & Responsive",
                description:
                  "Built with modern technology for a smooth experience on any device.",
                icon: Zap,
              },
              {
                title: "Easy to Use",
                description:
                  "Clean interface that lets you focus on your content.",
                icon: FileText,
              },
              {
                title: "Password Recovery",
                description: "Forgot your password? Reset it easily via email.",
                icon: ShieldQuestionMark,
              },
              {
                title: "Rate Limited",
                description:
                  "Protection against abuse with intelligent rate limiting.",
                icon: CheckCircle,
              },
            ].map((feature, index) => (
              <div
                key={index}
                className="bg-background rounded-lg border p-4 sm:p-5 md:p-6 hover:shadow-md transition-shadow"
              >
                <div className="h-10 w-10 sm:h-11 sm:w-11 md:h-12 md:w-12 rounded-lg bg-primary/10 flex items-center justify-center mb-3 sm:mb-4">
                  <feature.icon className="h-5 w-5 sm:h-5.5 sm:w-5.5 md:h-6 md:w-6 text-primary" />
                </div>
                <h3 className="text-base sm:text-lg font-semibold mb-1.5 sm:mb-2">{feature.title}</h3>
                <p className="text-muted-foreground text-xs sm:text-sm">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section
        ref={ctaRef}
        className="py-12 sm:py-16 md:py-20 px-4 sm:px-6 lg:px-8"
        data-aos="fade-up"
      >
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-3 sm:mb-4">
            Ready to Commit?
          </h2>
          <p className="text-sm sm:text-base text-muted-foreground mb-6 sm:mb-8 max-w-2xl mx-auto">
            Join CommitNotes today and start organizing your thoughts.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center">
            <Link to="/signup" className="w-full sm:w-auto">
              <Button size="lg" className="cursor-pointer w-full sm:w-auto text-sm sm:text-base">
                Create Account
                <ArrowRight className="h-4 w-4 sm:h-5 sm:w-5" />
              </Button>
            </Link>
            <Link to="/login" className="w-full sm:w-auto">
              <Button
                size="lg"
                variant="outline"
                className="cursor-pointer w-full sm:w-auto text-sm sm:text-base"
              >
                Login
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t py-6 sm:py-8 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto flex flex-col sm:flex-row justify-between items-center gap-3 sm:gap-4">
          <div className="flex items-center gap-2">
            <GalleryVerticalEnd className="h-4 w-4 sm:h-5 sm:w-5" />
            <span className="font-semibold text-sm sm:text-base">CommitNotes</span>
          </div>
          <p className="text-xs sm:text-sm text-muted-foreground text-center">
            © {new Date().getFullYear()} CommitNotes. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
}
