import { cookies } from "next/headers";
import { Sidebar } from "@/components/sidebar";
import { redirect } from "next/navigation";

export default async function AdminLayout( { children } ) {
  const token = ( await cookies() ).get( "token" )?.value;

  // If no token, redirect to signin
  if ( !token ) {
    redirect( "/auth/signin" );
  }

  return (
    <div className="flex h-screen bg-gray-50">
      <Sidebar />
      <main className="flex-1 overflow-y-auto">{ children }</main>
    </div>
  );
}
