export const API_LINKS = {
  BASE: "http://localhost:1690",
  SIGNUP_USER: "/auth/signup",
  SIGNIN_USER: "/auth/signin",
  AUTH: "/auth",
  BOOKS: "/books",
  // GET_BOOK: ( id ) => "http://localhost:1690/books/" + id,
  // CREATE_BOOK: "http://localhost:1690/books",
  // UPDATE_BOOK: ( id ) => "http://localhost:1690/books/" + id,
  // DELETE_BOOK: ( id ) => "http://localhost:1690/books/" + id
};

export const SUBJECTS = [
  "Mathematics",
  "Computer Science",
  "Chemistry",
  "Physics",
  "Biology",
  "Economics",
  "Psychology",
  "Engineering",
  "Literature",
  "History",
  "Philosophy",
  "Other",
];

export const UNIVERSITIES = [
  "UCP"
];











export const formatDate = ( dateString ) => {
  const date = new Date( dateString );
  return date.toLocaleDateString( "en-GB" );
};
