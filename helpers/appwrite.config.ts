import { Client, Databases } from 'appwrite'

const client = new Client()

client
  .setEndpoint('https://cloud.appwrite.io/v1')
  .setProject('66a7a17b003e1c2123b7')

export default client

// expoting the database

export const databases = new Databases(client)


