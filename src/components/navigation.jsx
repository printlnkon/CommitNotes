import { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuList,
} from "@/components/ui/navigation-menu";
import { HomeIcon, CircleUser, Menu } from "lucide-react";
import { useIsMobile } from "@/hooks/useIsMobile";

export default function Navigation() {
  const [isOpen, setIsOpen] = useState(false);
  const isMobile = useIsMobile();

  return (
    <>
      {/* mobile hamburger button */}
      <Button
        variant="ghost"
        size="icon"
        className="md:hidden text-white cursor-pointer"
        onClick={() => setIsOpen(!isOpen)}
      >
        <Menu />
      </Button>

      {(!isMobile || isOpen) && (
        <NavigationMenu className={isMobile ? "absolute top-18 right-1 bg-accent-foreground/80 rounded-lg shadow-lg" : ""}>
          <NavigationMenuList className={isMobile ? "flex-col gap-2" : "flex-row"}>
            {/* home */}
            <NavigationMenuItem>
              <Link to="/" onClick={() => isMobile && setIsOpen(false)}>
                <Button variant="ghost" className={`text-white cursor-pointer ${isMobile ? "w-full justify-start" : ""}`}>
                  <HomeIcon />
                  Home
                </Button>
              </Link>
            </NavigationMenuItem>

            {/* profile */}
            <NavigationMenuItem>
              <Link to="/profile" onClick={() => isMobile && setIsOpen(false)}>
                <Button
                  variant="ghost"
                  aria-label="Profile"
                  className={`text-white cursor-pointer ${isMobile ? "w-full justify-start" : ""}`}
                >
                  <CircleUser />
                  Profile
                </Button>
              </Link>
            </NavigationMenuItem>
          </NavigationMenuList>
        </NavigationMenu>
      )}
    </>
  );
}
