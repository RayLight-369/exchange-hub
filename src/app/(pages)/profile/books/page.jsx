"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Search, Plus, Edit, Trash2, BookOpen } from "lucide-react";
import { formatDate, SUBJECTS } from "@/app/constants";
import { useSelector } from "react-redux";
import { useAddBookMutation, useDeleteBookMutation, useGetCurrentUserQuery, useUpdateBookMutation } from "@/app/services/api";


export default function BooksPage() {
  // const user = useSelector( ( state ) => state.auth.user );

  const { data: user } = useGetCurrentUserQuery( undefined, {
    refetchOnMountOrArgChange: true,
    refetchOnReconnect: true,
    refetchOnFocus: true,
  } );
  const books = user?.books ?? [];

  const [ searchTerm, setSearchTerm ] = useState( "" );
  const [ subjectFilter, setSubjectFilter ] = useState( "all" );
  const [ isAddDialogOpen, setIsAddDialogOpen ] = useState( false );
  const [ isEditDialogOpen, setIsEditDialogOpen ] = useState( false );
  const [ selectedBook, setSelectedBook ] = useState( null );
  const [ bookInfo, setBookInfo ] = useState( null );


  const [ addBook, { isLoading: isAddingBook } ] = useAddBookMutation();
  const [ updateBook, { isLoading: isUpdatingBook } ] = useUpdateBookMutation();
  const [ deleteBook, { isLoading: isDeletingBook } ] = useDeleteBookMutation();

  const filteredBooks = books.filter( ( book ) => {
    const matchesSearch =
      book.title.toLowerCase().includes( searchTerm.toLowerCase() ) ||
      book.price?.toLowerCase().includes( searchTerm.toLowerCase() ) ||
      book.subject?.toLowerCase().includes( searchTerm.toLowerCase() ) ||
      formatDate( book.createdAt ).toLowerCase().includes( searchTerm.toLowerCase() );

    const matchesSubject = subjectFilter === "all" || book.subject === subjectFilter;

    return matchesSearch && matchesSubject;
  } );

  const handleDeleteBook = async ( bookId ) => {
    if ( confirm( "Are you sure you want to delete this book?" ) ) {
      await deleteBook( bookId ).unwrap();
    }
  };

  const handleEditBook = async ( bookId ) => {
    await updateBook( { id: bookId, ...bookInfo } ).unwrap();
    setBookInfo( null );
    setIsEditDialogOpen( false );
  };


  const handleAddBook = async ( book ) => {

    await addBook( book ).unwrap();
    // await refetch();
    setBookInfo( null );
    setIsAddDialogOpen( false );
  };

  const getSubjectColor = ( subject ) => {
    const colors = {
      Mathematics: "bg-blue-100 text-blue-800",
      "Computer Science": "bg-green-100 text-green-800",
      Chemistry: "bg-purple-100 text-purple-800",
      Physics: "bg-red-100 text-red-800",
      Biology: "bg-emerald-100 text-emerald-800",
      Economics: "bg-yellow-100 text-yellow-800",
      Psychology: "bg-pink-100 text-pink-800",
      Engineering: "bg-orange-100 text-orange-800",
      Literature: "bg-indigo-100 text-indigo-800",
      History: "bg-amber-100 text-amber-800",
      Philosophy: "bg-slate-100 text-slate-800",
    };
    return colors[ subject ] || "bg-gray-100 text-gray-800";
  };

  return (
    <div className="p-6">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Book Management</h1>
        <p className="text-gray-600 mt-2">Manage all books listed by your account</p>
      </div>

      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle>All Books</CardTitle>
              <CardDescription>{ filteredBooks.length } books found</CardDescription>
            </div>
            <Dialog open={ isAddDialogOpen } onOpenChange={ setIsAddDialogOpen }>
              <DialogTrigger asChild>
                <Button className="bg-cyan-600 hover:bg-cyan-700">
                  <Plus className="h-4 w-4 mr-2" />
                  Add Book
                </Button>
              </DialogTrigger>
              <DialogContent className="max-w-md">
                <DialogHeader>
                  <DialogTitle>Add New Book</DialogTitle>
                  <DialogDescription>Add a new book to the platform</DialogDescription>
                </DialogHeader>
                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="title">Title</Label>
                    <Input id="title" placeholder="Enter book title" onChange={ ( e ) => setBookInfo( { ...bookInfo, title: e.target.value } ) } />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="price">Price</Label>
                    <Input id="price" placeholder="Enter price (optional)" onChange={ ( e ) => setBookInfo( { ...bookInfo, price: e.target.value } ) } />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="subject">Subject</Label>
                    <Select onValueChange={ ( subject ) => setBookInfo( { ...bookInfo, subject } ) }>
                      <SelectTrigger>
                        <SelectValue placeholder="Select subject" />
                      </SelectTrigger>
                      <SelectContent>
                        { SUBJECTS.map( ( subject ) => (
                          <SelectItem key={ subject } value={ subject }>
                            { subject }
                          </SelectItem>
                        ) ) }
                      </SelectContent>
                    </Select>
                  </div>

                </div>
                <DialogFooter>
                  <Button variant="outline" onClick={ () => setIsAddDialogOpen( false ) }>
                    Cancel
                  </Button>
                  <Button className="bg-cyan-600 hover:bg-cyan-700" onClick={ () => {
                    handleAddBook( {
                      title: bookInfo.title,
                      price: bookInfo.price,
                      subject: bookInfo.subject,
                      ownerId: user.id
                    } );
                  } }>Add Book</Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          </div>
        </CardHeader>
        <CardContent>
          {/* Search and Filters */ }
          <div className="flex items-center space-x-4 mb-6">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
              <Input
                placeholder="Search books by title, Price, or owner..."
                value={ searchTerm }
                onChange={ ( e ) => setSearchTerm( e.target.value ) }
                className="pl-10"
              />
            </div>
            <Select value={ subjectFilter } onValueChange={ setSubjectFilter }>
              <SelectTrigger className="w-48">
                <SelectValue placeholder="Filter by subject" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Subjects</SelectItem>
                { SUBJECTS.map( ( subject ) => (
                  <SelectItem key={ subject } value={ subject }>
                    { subject }
                  </SelectItem>
                ) ) }
              </SelectContent>
            </Select>
          </div>

          {/* Books Table */ }
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Title</TableHead>
                <TableHead>Price</TableHead>
                <TableHead>Subject</TableHead>
                <TableHead>Listed</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              { filteredBooks.map( ( book ) => (
                <TableRow key={ book.id }>
                  <TableCell className="font-medium max-w-xs">
                    <div className="flex items-center space-x-2">
                      <BookOpen className="h-4 w-4 text-gray-400" />
                      <span className="truncate">{ book.title }</span>
                    </div>
                  </TableCell>
                  <TableCell>{ book.price }</TableCell>
                  <TableCell>
                    <Badge className={ getSubjectColor( book.subject || "Other" ) }>{ book.subject || "Other" }</Badge>
                  </TableCell>
                  <TableCell>{ formatDate( book.createdAt ) }</TableCell>
                  <TableCell>
                    <div className="flex items-center space-x-2">
                      <Button variant="ghost" size="sm" onClick={ () => {
                        setSelectedBook( book );
                        setBookInfo( book );
                        setIsEditDialogOpen( true );
                      } }>
                        <Edit className="h-4 w-4" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={ () => handleDeleteBook( book.id ) }
                        className="text-red-600 hover:text-red-700"
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ) ) }
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {/* Edit Book Dialog */ }
      <Dialog open={ isEditDialogOpen } onOpenChange={ setIsEditDialogOpen }>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle>Edit Book</DialogTitle>
            <DialogDescription>Update book information</DialogDescription>
          </DialogHeader>
          { selectedBook && (
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="edit-title">Title</Label>
                <Input id="edit-title" defaultValue={ selectedBook.title } placeholder="Enter book title" onChange={ ( e ) => setBookInfo( { ...bookInfo, title: e.target.value } ) } />
              </div>
              <div className="space-y-2">
                <Label htmlFor="edit-price">Price</Label>
                <Input id="edit-price" defaultValue={ selectedBook.price } placeholder="Enter price (optional)" onChange={ ( e ) => setBookInfo( { ...bookInfo, price: e.target.value } ) } />
              </div>
              <div className="space-y-2">
                <Label htmlFor="edit-subject">Subject</Label>
                <Select defaultValue={ selectedBook.subject } onValueChange={ ( subject ) => setBookInfo( { ...bookInfo, subject } ) }>
                  <SelectTrigger>
                    <SelectValue placeholder="Select subject" />
                  </SelectTrigger>
                  <SelectContent>
                    { SUBJECTS.map( ( subject ) => (
                      <SelectItem key={ subject } value={ subject }>
                        { subject }
                      </SelectItem>
                    ) ) }
                  </SelectContent>
                </Select>
              </div>

            </div>
          ) }
          <DialogFooter>
            <Button variant="outline" onClick={ () => setIsEditDialogOpen( false ) }>
              Cancel
            </Button>
            <Button className="bg-cyan-600 hover:bg-cyan-700" onClick={ () => handleEditBook( selectedBook.id ) }>Save Changes</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
