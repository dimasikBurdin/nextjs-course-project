// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
import { MongoClient } from 'mongodb';
import { test } from '../../test-moks/test/test';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const url = "mongodb://localhost:27017/";
  const client = new MongoClient(url);
  try {
    await client.connect();
    const nameDB =  (await client.db().admin().listDatabases()).databases[3].name;
    const results = await client.db(nameDB).collection(`results 6374bc1d78879ba5724e1393`).find({}).toArray();
    res.send(JSON.stringify(results));
  } catch(e) {
    console.log(e)
  } finally {
    await client.close();
  }
} 
