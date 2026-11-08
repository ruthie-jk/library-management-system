
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  const genres = await Promise.all([
    prisma.genre.upsert({
      where: { slug: 'fiction' },
      update: {},
      create: { name: 'Fiction', slug: 'fiction' },
    }),
    prisma.genre.upsert({
      where: { slug: 'science' },
      update: {},
      create: { name: 'Science', slug: 'science' },
    }),
    prisma.genre.upsert({
      where: { slug: 'technology' },
      update: {},
      create: { name: 'Technology', slug: 'technology' },
    }),
    prisma.genre.upsert({
      where: { slug: 'history' },
      update: {},
      create: { name: 'History', slug: 'history' },
    }),
  ]);

  const books = [
    { title: 'Things Fall Apart', author: 'Chinua Achebe', isbn: '9780385474542', genreId: genres[0].id },
    { title: 'The Great Gatsby', author: 'F. Scott Fitzgerald', isbn: '9780743273565', genreId: genres[0].id },
    { title: 'Jane Eyre', author: 'Charlotte Bronte', isbn: '9780141441146', genreId: genres[0].id },
    { title: 'Pride and Prejudice', author: 'Jane Austen', isbn: '9780141439518', genreId: genres[0].id },

    { title: 'A Brief History of Time', author: 'Stephen Hawking', isbn: '9780553380163', genreId: genres[1].id },
    { title: 'The Selfish Gene', author: 'Richard Dawkins', isbn: '9780198788607', genreId: genres[1].id },
    { title: 'Cosmos', author: 'Carl Sagan', isbn: '9780345539434', genreId: genres[1].id },
    { title: 'Silent Spring', author: 'Rachel Carson', isbn: '9780618249060', genreId: genres[1].id },

    { title: 'Clean Code', author: 'Robert C. Martin', isbn: '9780132350884', genreId: genres[2].id },
    { title: 'The Pragmatic Programmer', author: 'David Thomas', isbn: '9780135957059', genreId: genres[2].id },
    { title: 'Introduction to Algorithms', author: 'Thomas H. Cormen', isbn: '9780262046305', genreId: genres[2].id },
    { title: 'Code', author: 'Charles Petzold', isbn: '9780735611313', genreId: genres[2].id },

    { title: 'Sapiens', author: 'Yuval Noah Harari', isbn: '9780062316097', genreId: genres[3].id },
    { title: 'The Diary of a Young Girl', author: 'Anne Frank', isbn: '9780553296983', genreId: genres[3].id },
    { title: 'Long Walk to Freedom', author: 'Nelson Mandela', isbn: '9780316548182', genreId: genres[3].id },
    { title: 'Guns, Germs, and Steel', author: 'Jared Diamond', isbn: '9780393354324', genreId: genres[3].id },
  ];

  for (const book of books) {
    await prisma.book.upsert({
      where: { isbn: book.isbn },
      update: book,
      create: book,
    });
  }

  console.log('Seed completed: 4 genres and 16 books created or verified.');
}

main()
  .catch((error) => {
    console.error('Seed failed:', error);
    process.exitCode = 1;
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
