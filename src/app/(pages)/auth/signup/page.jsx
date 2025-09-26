"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { BookOpen } from "lucide-react";
import { useState } from "react";
import { API_LINKS, UNIVERSITIES } from "@/app/constants";
import { useDispatch } from "react-redux";
import { login } from "@/app/features/auth";
import { useSignupUserMutation } from "@/app/services/api";
import { useRouter } from "next/navigation";

export default function SignUpPage() {

  const [ name, setName ] = useState( "" );
  const [ email, setEmail ] = useState( "" );
  const [ university, setUniversity ] = useState( "" );
  const [ password, setPassword ] = useState( "" );
  const [ confirmPassword, setConfirmPassword ] = useState( "" );

  const [ signupUser ] = useSignupUserMutation();
  const dispatch = useDispatch();
  const router = useRouter();

  const [ isLoading, setLoading ] = useState( false );

  const handleSubmit = async ( e ) => {
    e.preventDefault();
    setLoading( true );

    // const emailPattern = /^[A-Za-z0-9]{13}@[A-Za-z]+\.edu\.pk$/;

    // if ( !emailPattern.test( email ) ) {
    //   alert( "Email must follow the format of UCP student mails" );
    //   setLoading( false );
    //   return;
    // }

    if ( password !== confirmPassword ) {
      alert( "Passwords do not match" );
      setLoading( false );
      return;
    }

    try {

      const data = await signupUser( { name, email, university, password } ).unwrap();
      dispatch( login( data ) );
      router.push( "/" );

    } catch ( err ) {
      console.log( err );
    } finally {
      setLoading( false );
    }
  };


  return (
    <div className="min-h-screen bg-gradient-to-br to-amber-50 flex items-center justify-center p-4">
      <Card className="w-full max-w-md">
        <CardHeader className="text-center">
          <div className="flex items-center justify-center mb-4">
            <BookOpen className="h-8 w-8 text-secondary mr-2" />
            <span className="text-2xl font-bold text-primary">BookHub</span>
          </div>
          <CardTitle className="text-2xl">Create your account</CardTitle>
          <CardDescription>Join thousands of students trading textbooks</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="name">Full Name</Label>
            <Input id="name" type="text" placeholder="Enter your full name" onChange={ ( e ) => setName( e.target.value ) } required />
          </div>
          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input id="email" type="email" placeholder="Enter your email" onChange={ ( e ) => setEmail( e.target.value ) } required />
          </div>
          <div className="space-y-2">
            <Label htmlFor="university">University</Label>
            <Select onValueChange={ ( e ) => setUniversity( e ) }>
              <SelectTrigger>
                <SelectValue placeholder="Select your university" />
              </SelectTrigger>
              <SelectContent>
                { UNIVERSITIES.map( ( university ) => (
                  <SelectItem key={ university } value={ university }>
                    { university }
                  </SelectItem>
                ) ) }
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-2">
            <Label htmlFor="password">Password</Label>
            <Input id="password" type="password" placeholder="Create a password" onChange={ ( e ) => setPassword( e.target.value ) } required />
          </div>
          <div className="space-y-2">
            <Label htmlFor="confirmPassword">Confirm Password</Label>
            <Input id="confirmPassword" type="password" placeholder="Confirm your password" onChange={ ( e ) => setConfirmPassword( e.target.value ) } required />
          </div>
          <div className="flex items-center space-x-2">
            <input type="checkbox" id="terms" className="rounded border-gray-300" required />
            <Label htmlFor="terms" className="text-sm">
              I agree to the{ " " }
              <Link href="#" className="text-secondary hover:underline">
                Terms of Service
              </Link>{ " " }
              and{ " " }
              <Link href="#" className="text-secondary hover:underline">
                Privacy Policy
              </Link>
            </Label>
          </div>
        </CardContent>
        <CardFooter className="flex flex-col space-y-4">
          <Button className="w-full bg-secondary hover:bg-secondary/90" disabled={ isLoading } onClick={ handleSubmit }>Create Account</Button>
          <p className="text-center text-sm text-gray-600">
            Already have an account?{ " " }
            <Link href="/auth/signin" className="text-secondary hover:underline">
              Sign in
            </Link>
          </p>
        </CardFooter>
      </Card>
    </div>
  );
}
