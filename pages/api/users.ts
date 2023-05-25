import { NextApiRequest, NextApiResponse } from "next";
import fs from "fs";
import path from "path";

const filePath = path.join(process.cwd(), "/db/data.json");

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method == "GET"){
    try {
      const jsonData = JSON.parse(fs.readFileSync(filePath, "utf-8"));
      res.status(200).json(jsonData);
    } catch (error) {
      res.status(500).json({ error: "Failed to read JSON file" });
      //console.log(error);
    }
  } else {
    res.status(405).json({ error: "Method not allowed" });
  }
}
