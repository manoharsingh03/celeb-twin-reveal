
import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Menu, Home, Upload, History, User, Settings, Brain, LogIn, Moon, Sun } from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";
import UserProfile from "./UserProfile";

const Navigation = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(false);
  const { user } = useAuth();
  const location = useLocation();

  const navigationItems = [
    { name: "Home", href: "/", icon: Home },
    { name: "Upload", href: "/", icon: Upload },
    { name: "History", href: "/history", icon: History },
    { name: "Profile", href: "/profile", icon: User },
    { name: "Settings", href: "/settings", icon: Settings },
  ];

  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode);
    document.documentElement.classList.toggle('dark');
  };

  const NavItems = ({ mobile = false }) => (
    <>
      {navigationItems.map((item) => (
        <Link
          key={item.name}
          to={item.href}
          className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-all duration-200 hover:bg-white/20 ${
            location.pathname === item.href ? 'bg-white/30 text-white' : 'text-white/80 hover:text-white'
          } ${mobile ? 'text-lg' : ''}`}
          onClick={() => mobile && setIsOpen(false)}
        >
          <item.icon className="w-5 h-5" />
          {mobile && <span>{item.name}</span>}
        </Link>
      ))}
    </>
  );

  return (
    <nav className="sticky top-0 z-50 peach-purple-gradient shadow-lg border-b border-white/20">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2 text-white font-bold text-xl">
            <Brain className="w-8 h-8 text-yellow-300" />
            <span className="hidden sm:block">CelebTwin AI</span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-2">
            <NavItems />
          </div>

          {/* Right Side Actions */}
          <div className="flex items-center gap-3">
            {/* Dark Mode Toggle */}
            <Button
              onClick={toggleDarkMode}
              variant="ghost"
              size="sm"
              className="text-white/80 hover:text-white hover:bg-white/20"
            >
              {isDarkMode ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
            </Button>

            {/* User Profile or Sign In */}
            {user ? (
              <UserProfile />
            ) : (
              <Link to="/auth">
                <Button className="bg-white/20 hover:bg-white/30 text-white border-white/30 border backdrop-blur-sm">
                  <LogIn className="w-4 h-4 mr-2" />
                  <span className="hidden sm:inline">Sign In</span>
                </Button>
              </Link>
            )}

            {/* Mobile Menu */}
            <Sheet open={isOpen} onOpenChange={setIsOpen}>
              <SheetTrigger asChild>
                <Button variant="ghost" size="sm" className="md:hidden text-white hover:bg-white/20">
                  <Menu className="w-6 h-6" />
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="peach-purple-gradient border-l border-white/20">
                <div className="flex flex-col gap-4 mt-8">
                  <NavItems mobile />
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navigation;
