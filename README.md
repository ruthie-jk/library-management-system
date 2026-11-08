@'
# Library Management System API

A backend API for managing a library using NestJS, PostgreSQL and Prisma ORM.

## Technologies
- NestJS
- TypeScript
- PostgreSQL
- Prisma ORM

## Database Schema

The database contains three main models:

- **User:** Stores user information, including name, unique email and role.
- **Genre:** Stores book categories with unique names and slugs.
- **Book:** Stores book details, ISBN, copy counts and its associated genre.

The `Role` enum defines two user roles: `PATRON` and `LIBRARIAN`.

## Schema Decisions

The database uses a relational structure to maintain data consistency and reduce duplication.

The `Book` model contains a `genreId` foreign key that references the `id` field in the `Genre` model. This creates a one-to-many relationship: one genre can have multiple books, while each book belongs to one genre.

Storing genres separately avoids repeating genre names in every book record. It also makes it easier to update genre information and maintain referential integrity. The relationship allows books to be queried together with their associated genres.

Unique constraints on user emails, genre names, genre slugs and book ISBNs help prevent duplicate records.

## Setup

1. Clone the repository.
2. Navigate to the API directory:

   ```bash
   cd api