import { Link } from "react-router-dom";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuIndicator,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  NavigationMenuViewport,
} from "@/components/ui/navigation-menu";
import { HomeIcon } from "lucide-react";

// const menuItems = [
//   { title: "Home", href: "/" },
//   { title: "TEST", href: "/" },
//   { title: "TEST", href: "/" },
// ];

export default function Home() {
  return (
    <header className="header flex justify-center">
      <NavigationMenu>
        <NavigationMenuList>
          <NavigationMenuItem>
            <Button className="cursor-pointer">
              <HomeIcon />
              Home
            </Button>
          </NavigationMenuItem>
        </NavigationMenuList>
      </NavigationMenu>
    </header>
  );
}
