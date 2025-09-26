"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search, BookOpen, User, Menu } from "lucide-react";
import Link from "next/link";
import { useDispatch } from "react-redux";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "./ui/dropdown-menu";
// import { logout } from "@/app/features/auth";
import { useRouter } from "next/navigation";
import { useGetCurrentUserQuery, useSignoutUserMutation } from "@/app/services/api";

export function Header() {

  const { data: user } = useGetCurrentUserQuery();
  const [ signoutUser ] = useSignoutUserMutation();
  const router = useRouter();

  const handleSignout = async () => {
    try {
      await signoutUser().unwrap(); // call backend /signout (clears cookie)
    } catch ( err ) {
      console.error( "Signout failed:", err );
    }
  };

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          {/* Logo */ }
          <Link href="/" className="flex items-center space-x-2">
            <BookOpen className="h-8 w-8 text-primary" />
            <span className="text-2xl font-bold text-primary">ExchangeHub</span>
          </Link>

          {/* Search Bar - Hidden on mobile */ }
          <div className="hidden md:flex flex-1 max-w-md mx-8">
            <div className="relative w-full">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <Input placeholder="Search for textbooks..." className="pl-10 bg-muted/50" />
            </div>
          </div>

          {/* Navigation */ }
          <nav className="hidden md:flex items-center gap-6 px-3">
            <Link href="/browse" className="text-sm font-medium hover:text-primary transition-colors">
              Browse Books
            </Link>
            <Link href="/how-it-works" className="text-sm font-medium hover:text-primary transition-colors">
              How It Works
            </Link>
          </nav>

          {/* User Actions */ }
          <div className="flex items-center gap-4">
            {
              !user ? (
                <>
                  <Link href="/auth/signin">
                    <Button variant="ghost" size="sm" className="hidden sm:flex">
                      <User className="h-4 w-4 mr-2" />
                      Sign In
                    </Button>
                  </Link>
                  <Link href="/auth/signup">
                    <Button size="sm" className="bg-secondary hover:bg-secondary/90">
                      Get Started
                    </Button>
                  </Link>
                </>
              ) : (
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" size="sm" className="hidden sm:flex">
                      <User className="h-4 w-4 mr-2" />
                      { user.name }
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent>
                    <DropdownMenuLabel>My Account</DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem onClick={ () => router.push( "/profile" ) }>Profile</DropdownMenuItem>
                    <DropdownMenuItem onClick={ handleSignout }>
                      Sign Out
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>

              )
            }
            <Button variant="ghost" size="sm" className="md:hidden">
              <Menu className="h-4 w-4" />
            </Button>
          </div>
        </div>

        {/* Mobile Search */ }
        <div className="md:hidden pb-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input placeholder="Search for textbooks..." className="pl-10 bg-muted/50" />
          </div>
        </div>
      </div>
    </header>
  );
}
