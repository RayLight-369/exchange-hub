"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { BookOpen } from "lucide-react";
import { useEffect, useState } from "react";
import { useSigninUserMutation } from "@/app/services/authApi";
import { useDispatch, useSelector } from "react-redux";
import { login } from "@/app/features/auth";
import { useRouter } from "next/navigation";

export default function SignInPage() {

  const [ email, setEmail ] = useState( "" );
  const [ password, setPassword ] = useState( "" );
  const [ signinUser, { isLoading, error } ] = useSigninUserMutation();
  const dispatch = useDispatch();
  const router = useRouter();
  const user = useSelector( ( state ) => state.auth.user );

  useEffect( () => {
    if ( user ) {
      router.push( "/profile" );
    }
  }, [ user ] );

  const handleSubmit = async () => {
    try {

      const data = await signinUser( { email, password } ).unwrap();
      dispatch( login( data ) );
      console.log( data );

      router.push( "/" );

    } catch ( err ) {
      console.log( err );
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b to-amber-50 flex items-center justify-center">
      <Card className="w-full max-w-md">
        <CardHeader className="text-center">
          <div className="flex items-center justify-center mb-4">
            <BookOpen className="h-8 w-8 text-secondary mr-2" />
            <span className="text-2xl font-bold text-primary">ExchangeHub</span>
          </div>
          <CardTitle className="text-2xl">Welcome back</CardTitle>
          <CardDescription>Sign in to your account to continue trading books</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input id="email" type="email" placeholder="Enter your email" onChange={ ( e ) => setEmail( e.target.value ) } required />
          </div>
          <div className="space-y-2">
            <Label htmlFor="password">Password</Label>
            <Input id="password" type="password" placeholder="Enter your password" onChange={ ( e ) => setPassword( e.target.value ) } required />
          </div>
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <input type="checkbox" id="remember" className="rounded border-gray-300" />
              <Label htmlFor="remember" className="text-sm">
                Remember me
              </Label>
            </div>
            <Link href="#" className="text-sm text-secondary hover:underline">
              Forgot password?
            </Link>
          </div>
        </CardContent>
        <CardFooter className="flex flex-col space-y-4">
          <Button className="w-full bg-secondary hover:bg-secondary/90" onClick={ handleSubmit }>Sign In</Button>
          <p className="text-center text-sm text-gray-600">
            Don't have an account?{ " " }
            <Link href="/auth/signup" className="text-secondary hover:underline">
              Sign up
            </Link>
          </p>
        </CardFooter>
      </Card>
    </div>
  );
}
