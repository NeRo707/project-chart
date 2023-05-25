import { NextApiRequest, NextApiResponse } from "next";
import fs from "fs";
import path from "path";
import { nanoid } from "nanoid";

const filePath = path.join(process.cwd(), "/db/data.json");

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method == "POST") {
    try {
      const jsonData = JSON.parse(fs.readFileSync(filePath, "utf-8"));
      
      //console.log(req.body);

      const { name, email, gender, street, city, phone } = req.body;

      const newUser = {
        id: nanoid(),
        name,
        email,
        gender,
        address:{
          street,
          city
        },
        phone
      }

      //console.log(userData);
      jsonData.push(newUser);

      fs.writeFileSync(filePath, JSON.stringify(jsonData));

      res.status(200).json(jsonData);
    } catch (error) {
      res.status(500).json({ error: "Failed to write JSON file" });
      //console.log(error);
    }
  } else {
    res.status(405).json({ error: "Method not allowed" });
  }
}
