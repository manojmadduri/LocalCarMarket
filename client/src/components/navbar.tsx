import { useState } from "react";
import { Link, useLocation } from "wouter";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Menu, Settings, Plus, LogOut, User, Phone } from "lucide-react";

export default function Navbar() {
  const [location] = useLocation();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const navigation = [
    { name: "Home", href: "/" },
    { name: "Buy Cars", href: "/cars" },
    { name: "Services", href: "/services" },
    { name: "Contact", href: "/contact" },
  ];

  const isActive = (href: string) => {
    if (href === "/") {
      return location === "/";
    }
    return location.startsWith(href);
  };

  return (
    <nav className="bg-gradient-to-r from-purple-900 via-purple-800 to-purple-900 shadow-2xl sticky top-0 z-50 navbar-shadow border-b border-yellow-400">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          {/* Logo */}
          <div className="flex items-center space-x-8">
            <div className="flex-shrink-0">
              <Link href="/">
                <div className="flex items-center group">
                  <img 
                    src="https://theintegrityautoandbody.com/wp-content/uploads/2020/02/cropped-Integritylogo1-1-367x112.png" 
                    alt="Integrity Auto and Body" 
                    className="h-16 w-auto cursor-pointer transition-all duration-300 group-hover:scale-105 filter brightness-110 drop-shadow-lg"
                  />
                </div>
              </Link>
            </div>

            {/* Desktop Navigation */}
            <div className="hidden md:block">
              <div className="ml-10 flex items-baseline space-x-8">
                {navigation.map((item) => (
                  <Link key={item.name} href={item.href}>
                    <span
                      className={`px-4 py-2 text-sm font-medium transition-all duration-200 cursor-pointer rounded-md ${
                        isActive(item.href)
                          ? "text-yellow-400 bg-yellow-400/20 border-b-2 border-yellow-400 shadow-sm"
                          : "text-gray-200 hover:text-yellow-300 hover:bg-purple-700/30"
                      }`}
                      onClick={() => window.scrollTo(0, 0)}
                    >
                      {item.name}
                    </span>
                  </Link>
                ))}
              </div>
            </div>
          </div>

          {/* Desktop Actions */}
          <div className="hidden md:block">
            <div className="ml-4 flex items-center md:ml-6 space-x-4">
              <a href="tel:(615) 896-1080" className="bg-yellow-400 hover:bg-yellow-500 text-black px-4 py-2 rounded-md transition-colors duration-200 flex items-center space-x-2">
                <Phone className="h-4 w-4" />
                <span className="font-medium">(615) 896-1080</span>
              </a>
              <Link href="/contact">
                <Button 
                  variant="default" 
                  className="form-button-primary"
                  onClick={() => window.scrollTo(0, 0)}
                >
                  <Plus className="mr-2 h-4 w-4" />
                  Sell Your Car
                </Button>
              </Link>
{localStorage.getItem('admin_access') === 'true' ? (
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button 
                      variant="ghost" 
                      size="icon" 
                      className="text-gray-300 hover:text-yellow-400"
                    >
                      <User className="h-5 w-5" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end" className="w-48">
                    <DropdownMenuItem asChild>
                      <Link href="/admin" className="flex items-center" onClick={() => window.scrollTo(0, 0)}>
                        <Settings className="mr-2 h-4 w-4" />
                        Admin Panel
                      </Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem asChild>
                      <Link href="/admin/settings" className="flex items-center" onClick={() => window.scrollTo(0, 0)}>
                        <Settings className="mr-2 h-4 w-4" />
                        Settings
                      </Link>
                    </DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem 
                      className="flex items-center text-red-600 cursor-pointer"
                      onClick={() => {
                        localStorage.clear();
                        sessionStorage.clear();
                        window.location.href = '/';
                      }}
                    >
                      <LogOut className="mr-2 h-4 w-4" />
                      Logout
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              ) : (
                <Link href="/admin-login">
                  <Button 
                    variant="ghost" 
                    className="text-gray-300 hover:text-yellow-400 hover:bg-purple-700/30"
                    onClick={() => window.scrollTo(0, 0)}
                  >
                    <Settings className="mr-2 h-4 w-4" />
                    Admin
                  </Button>
                </Link>
              )}
            </div>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <Sheet open={isMobileMenuOpen} onOpenChange={setIsMobileMenuOpen}>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon">
                  <Menu className="h-6 w-6" />
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="w-[300px] sm:w-[400px] bg-gradient-to-br from-purple-900 via-purple-800 to-purple-900">
                <div className="flex flex-col space-y-4 mt-8">
                  <Link href="/">
                    <h2 className="text-2xl font-bold text-yellow-400 mb-6">Integrity Auto and Body</h2>
                  </Link>
                  
                  {navigation.map((item) => (
                    <Link key={item.name} href={item.href}>
                      <span
                        className={`block px-3 py-2 text-base font-medium transition-colors cursor-pointer ${
                          isActive(item.href)
                            ? "text-yellow-400 bg-purple-800 rounded-lg"
                            : "text-gray-300 hover:text-yellow-400 hover:bg-purple-800 rounded-lg"
                        }`}
                        onClick={() => {
                          setIsMobileMenuOpen(false);
                          window.scrollTo(0, 0);
                        }}
                      >
                        {item.name}
                      </span>
                    </Link>
                  ))}
                  
                  <div className="border-t border-purple-700 pt-4 space-y-2">
                    <a href="tel:(615) 896-1080" className="w-full bg-yellow-400 hover:bg-yellow-500 text-black px-4 py-2 rounded-md transition-colors duration-200 flex items-center justify-center space-x-2">
                      <Phone className="h-4 w-4" />
                      <span className="font-medium">(615) 896-1080</span>
                    </a>
                    <Link href="/contact">
                      <Button 
                        className="w-full bg-yellow-400 hover:bg-yellow-500 text-black" 
                        onClick={() => {
                          setIsMobileMenuOpen(false);
                          window.scrollTo(0, 0);
                        }}
                      >
                        <Plus className="mr-2 h-4 w-4" />
                        Sell Your Car
                      </Button>
                    </Link>
                    {localStorage.getItem('admin_access') === 'true' ? (
                      <>
                        <Link href="/admin">
                          <Button 
                            variant="outline" 
                            className="w-full border-yellow-400 text-yellow-400 hover:bg-yellow-400 hover:text-black" 
                            onClick={() => {
                              setIsMobileMenuOpen(false);
                              window.scrollTo(0, 0);
                            }}
                          >
                            <Settings className="mr-2 h-4 w-4" />
                            Admin Panel
                          </Button>
                        </Link>
                        <Link href="/admin/settings">
                          <Button 
                            variant="outline" 
                            className="w-full border-yellow-400 text-yellow-400 hover:bg-yellow-400 hover:text-black" 
                            onClick={() => {
                              setIsMobileMenuOpen(false);
                              window.scrollTo(0, 0);
                            }}
                          >
                            <User className="mr-2 h-4 w-4" />
                            Settings
                          </Button>
                        </Link>
                        <Button 
                          variant="destructive" 
                          className="w-full bg-red-600 hover:bg-red-700 text-white" 
                          onClick={() => {
                            localStorage.clear();
                            sessionStorage.clear();
                            setIsMobileMenuOpen(false);
                            window.location.href = '/';
                          }}
                        >
                          <LogOut className="mr-2 h-4 w-4" />
                          Logout
                        </Button>
                      </>
                    ) : (
                      <Link href="/admin-login">
                        <Button 
                          variant="outline" 
                          className="w-full border-yellow-400 text-yellow-400 hover:bg-yellow-400 hover:text-black" 
                          onClick={() => {
                            setIsMobileMenuOpen(false);
                            window.scrollTo(0, 0);
                          }}
                        >
                          <Settings className="mr-2 h-4 w-4" />
                          Admin Login
                        </Button>
                      </Link>
                    )}
                  </div>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </nav>
  );
}
