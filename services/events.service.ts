import { Databases } from 'appwrite';
import client from '../helpers/appwrite.config';

class EventService {
  private static instance: EventService;
  private databases: Databases;

  private constructor() {
    this.databases = new Databases(client);
  }

  public static getInstance(): EventService {
    if (!EventService.instance) {
      EventService.instance = new EventService();
    }
    return EventService.instance;
  }

  private databaseId: string = '66ad03a5003237a821fb'; 
  private collectionId: string = '66ade8a20019d04380fa'; 

  // Fetch all events
  public async fetchEvents() {
    try {
      const response = await this.databases.listDocuments(
        this.databaseId,
        this.collectionId
      );
      return response.documents;
    } catch (error) {
      console.error('Failed to fetch events:', error);
      throw error;
    }
  }
}

export default EventService;
