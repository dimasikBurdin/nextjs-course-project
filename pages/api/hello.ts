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
    const nameDB = await (await client.db().admin().listDatabases()).databases[3].name;
    const anyData = await client.db(nameDB).collection("tests").find({}).limit(1).toArray();
    console.log(anyData)
    setTimeout(() => {
      res.send(JSON.stringify(anyData))
    }, 10);
  } catch(e) {
    console.log(e)
  } finally {
    await client.close();
  }
} 
