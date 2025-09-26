"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { BookOpen, Settings, Home, LogOut } from "lucide-react";
import { useEffect } from "react";
import { useGetCurrentUserQuery, useSignoutUserMutation } from "@/app/services/api";


const navigation = [
  { name: "Dashboard", href: "/profile", icon: Home },
  // { name: "Users", href: "/profile/users", icon: Users },
  { name: "Books", href: "/profile/books", icon: BookOpen },
  // { name: "Analytics", href: "/profile/analytics", icon: BarChart3 },
  { name: "Settings", href: "/profile/settings", icon: Settings },
];

export function Sidebar() {
  const pathname = usePathname();
  const router = useRouter();
  const { data: user, error, isLoading } = useGetCurrentUserQuery();
  const [ signoutUser, { isLoading: signoutLoading } ] = useSignoutUserMutation();

  const handleSignOut = async () => {
    try {
      await signoutUser().unwrap();
      router.push( "/auth/signin" ); // ✅ client-side redirect
    } catch ( err ) {
      console.error( "Signout failed:", err );
    }
  };

  if ( signoutLoading || isLoading ) return <div className="p-4">Loading...</div>;
  if ( error || !user ) return null;

  if ( user )
    return (
      <div className="flex flex-col w-64 bg-white border-r border-gray-200 max-h-[calc(100vh-64px)] shrink-0">
        {/* Logo */ }
        <div className="flex items-center px-6 py-4 border-b border-gray-200">
          <BookOpen className="h-8 w-8 text-cyan-600 mr-2" />
          <span className="text-xl font-bold text-gray-900">Admin</span>
        </div>

        {/* Navigation */ }
        <nav className="flex-1 px-4 py-6 space-y-2">
          { navigation.map( ( item ) => {
            const isActive = pathname === item.href;
            return (
              <Link
                key={ item.name }
                href={ item.href }
                className={ cn(
                  "flex items-center px-3 py-2 text-sm font-medium rounded-md transition-colors",
                  isActive ? "bg-cyan-100 text-cyan-700" : "text-gray-600 hover:bg-gray-100 hover:text-gray-900",
                ) }
              >
                <item.icon className="mr-3 h-5 w-5" />
                { item.name }
              </Link>
            );
          } ) }
        </nav>

        {/* User Profile & Logout */ }
        <div className="px-4 py-4 border-t border-gray-200">
          <div className="flex items-center px-3 py-2">
            <div className="w-8 h-8 bg-cyan-100 rounded-full flex items-center justify-center mr-3">
              <span className="text-cyan-600 font-semibold text-sm">{ user.name[ 0 ].toUpperCase() }</span>
            </div>
            <div className="flex-1">
              <p className="text-sm font-medium text-gray-900">{ user.name }</p>
              <p className="text-xs text-gray-500">{ user.email }</p>
            </div>
          </div>
          <Button variant="ghost" className="w-full justify-start text-gray-600 hover:text-white" onClick={ () => handleSignOut() }>
            <LogOut className="h-4 w-4" />
            Sign out
          </Button>
        </div>
      </div>
    );
}
