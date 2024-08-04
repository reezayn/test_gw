import { Databases } from 'appwrite'
import client from '../helpers/appwrite.config'

class BookingService {
  private static instance: BookingService
  private databases: Databases

  private constructor() {
    this.databases = new Databases(client)
  }

  public static getInstance(): BookingService {
    if (!BookingService.instance) {
      BookingService.instance = new BookingService()
    }
    return BookingService.instance
  }

  private databaseId: string = '66ad03a5003237a821fb' 
  private collectionId: string = '66ad03ac000d828d04fb' 

  // Create a booking
  public async createBooking(data: Record<string, any>) {
    try {
      const response = await this.databases.createDocument(
        this.databaseId,
        this.collectionId,
        'unique()',
        data
      )
      return response
    } catch (error) {
      console.error('Failed to create booking:', error)
      throw error
    }
  }

  // Get a booking by ID
  public async getBookingById(bookingId: string) {
    try {
      const response = await this.databases.getDocument(
        this.databaseId,
        this.collectionId,
        bookingId
      )
      return response
    } catch (error) {
      console.error('Failed to fetch booking:', error)
      throw error
    }
  }

  // Update a booking by ID
  public async updateBooking(bookingId: string, data: Record<string, any>) {
    try {
      const response = await this.databases.updateDocument(
        this.databaseId,
        this.collectionId,
        bookingId,
        data
      )
      return response
    } catch (error) {
      console.error('Failed to update booking:', error)
      throw error
    }
  }

  // Delete a booking by ID
  public async deleteBooking(bookingId: string) {
    try {
      const response = await this.databases.deleteDocument(
        this.databaseId,
        this.collectionId,
        bookingId
      )
      return response
    } catch (error) {
      console.error('Failed to delete booking:', error)
      throw error
    }
  }

  // List all bookings with optional filters
  public async listBookings(queries: string[] = []) {
    try {
      const response = await this.databases.listDocuments(
        this.databaseId,
        this.collectionId,
        queries
      )
      return response
    } catch (error) {
      console.error('Failed to list bookings:', error)
      throw error
    }
  }
}

export default BookingService
