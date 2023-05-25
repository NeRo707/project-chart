import { NextApiRequest, NextApiResponse } from "next";
import fs from "fs";
import path from "path";

const filePath = path.join(process.cwd(), "/db/data.json");

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  const {
    query: { id },
  } = req;
  if (req.method == "DELETE") {
    try {
      const jsonData = JSON.parse(fs.readFileSync(filePath, "utf-8"));
      const updatedData = jsonData.filter((item: any) => item.id != id);

      fs.writeFileSync(filePath, JSON.stringify(updatedData));
      console.log("Deleted User with ID:" + id);
      res.status(200).json({ message: "Item deleted successfully" });
    } catch (error) {
      res.status(500).json({ error: "Failed to delete item" });
    }
  } else {
    res.status(405).json({ error: "Method not allowed" });
  }
}
