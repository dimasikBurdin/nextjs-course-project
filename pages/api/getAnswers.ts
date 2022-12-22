// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
import { MongoClient } from 'mongodb';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const url = "mongodb://localhost:27017/";
  const client = new MongoClient(url);
  try {
    await client.connect();
    const nameDB =  (await client.db().admin().listDatabases()).databases[3].name;
    const collection = await client.db(nameDB).collection(`checkAnswers`).find({}).limit(1).toArray();
    res.send(JSON.stringify(collection[0]))
  } catch(e) {
    console.log(e)
  } finally {
    await client.close();
  }
} 
