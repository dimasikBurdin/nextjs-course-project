// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
import { MongoClient } from 'mongodb';
import { test } from '../../test-moks/test/test';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const url = "mongodb://localhost:27017/";
  const client = new MongoClient(url);
  // setTimeout(() => {
  //   res.send(JSON.stringify([test]))
  // }, 300)
  try {
    await client.connect();
    const nameDB =  (await client.db().admin().listDatabases()).databases[3].name;
    await client.db(nameDB).collection(`results ${JSON.parse(req.body).testId}`).insertOne( JSON.parse(req.body));
    res.send('')
  } catch(e) {
    console.log(e)
  } finally {
    await client.close();
  }
} 
