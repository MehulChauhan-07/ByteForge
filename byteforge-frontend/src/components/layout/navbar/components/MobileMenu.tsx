import React from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { QUICK_LINKS, LEARNING_ITEMS, TOOL_ITEMS } from "./navbar-Items";

interface MobileMenuProps {
  isOpen: boolean;
  onClose: () => void;
  isAuthenticated: boolean;
  onLogout: () => void;
}

export function MobileMenu({
  isOpen,
  onClose,
  isAuthenticated,
  onLogout,
}: MobileMenuProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 bg-background/95 backdrop-blur-sm">
      <div className="container mx-auto px-4 py-6">
        <div className="flex justify-end mb-6">
          <Button variant="ghost" size="icon" onClick={onClose}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M18 6L6 18" />
              <path d="M6 6l12 12" />
            </svg>
          </Button>
        </div>

        <nav className="space-y-6">
          <div>
            <h3 className="text-lg font-semibold mb-3">Quick Links</h3>
            <div className="space-y-2">
              {QUICK_LINKS.map((item) => (
                <Link
                  key={item.href}
                  to={item.href}
                  className="block py-2 text-foreground hover:text-primary transition-colors"
                  onClick={onClose}
                >
                  {item.title}
                </Link>
              ))}
            </div>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-3">Learning</h3>
            <div className="space-y-2">
              {LEARNING_ITEMS.map((item) => (
                <Link
                  key={item.href}
                  to={item.href}
                  className="block py-2 text-foreground hover:text-primary transition-colors"
                  onClick={onClose}
                >
                  {item.title}
                </Link>
              ))}
            </div>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-3">Tools</h3>
            <div className="space-y-2">
              {TOOL_ITEMS.map((item) => (
                <Link
                  key={item.href}
                  to={item.href}
                  className="block py-2 text-foreground hover:text-primary transition-colors"
                  onClick={onClose}
                >
                  {item.title}
                </Link>
              ))}
            </div>
          </div>

          {isAuthenticated ? (
            <Button
              variant="destructive"
              className="w-full"
              onClick={() => {
                onLogout();
                onClose();
              }}
            >
              Logout
            </Button>
          ) : (
            <div className="space-y-2">
              <Link to="/login" onClick={onClose}>
                <Button className="w-full">Login</Button>
              </Link>
              <Link to="/signup" onClick={onClose}>
                <Button variant="outline" className="w-full">
                  Sign Up
                </Button>
              </Link>
            </div>
          )}
        </nav>
      </div>
    </div>
  );
}
