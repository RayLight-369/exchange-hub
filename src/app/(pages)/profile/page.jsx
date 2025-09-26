"use client";

import { formatDate } from "@/app/constants";
import { useGetCurrentUserQuery } from "@/app/services/api";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { BookOpen } from "lucide-react";

export default function AdminDashboard() {

  const { data: user } = useGetCurrentUserQuery();
  const books = user?.books ?? [];

  return (
    <div className="p-6">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Admin Dashboard</h1>
        <p className="text-gray-600 mt-2">Manage your ExchangeHub Account</p>
      </div>

      {/* Stats Cards */ }
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Books</CardTitle>
            <BookOpen className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">15,432</div>
          </CardContent>
        </Card>

      </div>

      {/* Recent Activity */ }
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">

        <Card>
          <CardHeader>
            <CardTitle>Recent Books</CardTitle>
            <CardDescription>Latest book listings</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              { books.map( ( book, index ) => (
                <div key={ index } className="flex items-center space-x-4">
                  <div className="w-10 h-10 bg-amber-100 rounded flex items-center justify-center">
                    <BookOpen className="h-5 w-5 text-amber-600" />
                  </div>
                  <div className="flex-1">
                    <p className="font-medium">{ book.title }</p>
                    <p className="text-sm text-gray-500">at { formatDate( book.createdAt ) }</p>
                    <p className="text-xs text-gray-400">{ book.subject }</p>
                  </div>
                </div>
              ) ) }
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
