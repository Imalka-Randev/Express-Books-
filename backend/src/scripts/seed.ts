import mongoose from 'mongoose';
import dotenv from 'dotenv';
import Book from '../models/Book.js';

dotenv.config();

const SUBJECTS = [
  { id: 'science_fiction', label: 'Science Fiction' },
  { id: 'fantasy', label: 'Fantasy' },
  { id: 'mystery_and_detective_stories', label: 'Mystery' },
  { id: 'romance', label: 'Romance' },
  { id: 'management', label: 'Business' }
];

const fetchBooksFromOpenLibrary = async () => {
  const allBooks = [];

  for (const subject of SUBJECTS) {
    console.log(`Fetching books for subject: ${subject.label}...`);
    try {
      // Limit to 12 books per category to get a good spread without overloading
      const response = await fetch(`https://openlibrary.org/subjects/${subject.id}.json?limit=12`);
      const data = await response.json();
      
      if (data && data.works) {
        for (const work of data.works) {
          // We only want books with a valid cover image
          if (work.cover_id) {
            const authorName = work.authors && work.authors.length > 0 ? work.authors[0].name : 'Unknown Author';
            
            // Generate some random but realistic prices
            const basePrice = Math.floor(Math.random() * (25 - 12 + 1)) + 12; // Between $12 and $25
            const buyPrice = basePrice - 0.01; // e.g., 14.99
            const rentPrice = Math.floor(basePrice * 0.3) - 0.01; // Roughly 30% of buy price
            
            const publishedYear = work.first_publish_year ? work.first_publish_year : 2020;
            
            allBooks.push({
              title: work.title,
              author: authorName,
              // OpenLibrary Subject API doesn't return full synopsis, providing a generic high-quality fallback
              synopsis: `A captivating ${subject.label.toLowerCase()} story exploring profound themes and unforgettable characters. This classic work by ${authorName} continues to resonate with readers around the world.`,
              buyPrice: buyPrice,
              rentPrice: rentPrice,
              formatsAvailable: ['E-Book', 'Audiobook'],
              genres: [subject.label],
              publishedDate: new Date(`${publishedYear}-01-01`),
              deliveryInfo: 'Instant digital access to your Library.',
              coverImageUrl: `https://covers.openlibrary.org/b/id/${work.cover_id}-L.jpg`,
              averageRating: Number((Math.random() * (5 - 3.5) + 3.5).toFixed(1)), // Random rating between 3.5 and 5.0
              totalReviews: Math.floor(Math.random() * 500) + 10
            });
          }
        }
      }
    } catch (error) {
      console.error(`Error fetching subject ${subject.id}:`, error);
    }
    
    // Add a small delay between requests to be polite to the OpenLibrary API
    await new Promise(resolve => setTimeout(resolve, 1000));
  }
  
  return allBooks;
};

const seedDatabase = async () => {
  try {
    const mongoUri = process.env.MONGO_URI;
    
    if (!mongoUri) {
      console.error('❌ MONGO_URI is not defined in the .env file');
      process.exit(1);
    }

    console.log('Connecting to MongoDB...');
    await mongoose.connect(mongoUri);
    console.log('✅ Connected to MongoDB');

    console.log('Clearing existing books...');
    await Book.deleteMany({});

    console.log('Starting fetch from OpenLibrary API...');
    const booksToInsert = await fetchBooksFromOpenLibrary();
    
    console.log(`Fetched ${booksToInsert.length} valid books with covers. Inserting into database...`);
    await Book.insertMany(booksToInsert);

    console.log('✅ Database seeded successfully with real OpenLibrary data!');
    process.exit(0);
  } catch (error) {
    console.error('❌ Error seeding database:', error);
    process.exit(1);
  }
};

seedDatabase();
