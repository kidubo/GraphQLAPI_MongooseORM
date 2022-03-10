import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
// import books from '../data/books';
import { Book, CreateBookInput, BookDocument } from './book.schema';
import { Model } from 'mongoose';

@Injectable()
export class BookService {
  //   books: Partial<Book>[];
  constructor(@InjectModel(Book.name) private bookModel: Model<BookDocument>) {
    // this.books = books;
  }

  async findMany() {
    return this.bookModel.find().exec();
  }

  async findById(id) {
    return this.bookModel.findById(id).exec();
  }

  async findByAuthorId(authorId) {
    return this.bookModel.find({ author: authorId });
  }

  async createBook(book: CreateBookInput) {
    const newBook = this.bookModel.create(book);
    return (await newBook).save();
  }
}
