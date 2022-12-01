import { NextApiRequest } from "next";

export default function handler(
    req: NextApiRequest,
    res: any
  ) {
    res.status(200).json({ name: 'John Doe' })
  }