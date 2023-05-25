import { NextApiRequest, NextApiResponse } from "next";
import fs from "fs";
import path from "path";

const filePath = path.join(process.cwd(), "/db/data.json");

interface User {
  id: string;
  name: string;
  email: string;
  gender: string;
  address: {
    street: string;
    city: string;
  };
  phone: string;
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method == "PATCH") {
    try {
      const jsonData = JSON.parse(fs.readFileSync(filePath, "utf-8"));

      const { name, email, gender, address, phone } = req.body;

      const { id } = req.query;

      const userToUpdate = await jsonData.find((user: User) => user.id == id);

      if (!userToUpdate) {
        res.status(404).json({ error: "User not found" });
        return;
      }

      userToUpdate.name = name || userToUpdate.name;
      userToUpdate.email = email || userToUpdate.email;
      userToUpdate.gender = gender || userToUpdate.gender;
      userToUpdate.address.street =
        address?.street || userToUpdate.address.street;
      userToUpdate.address.city = address?.city || userToUpdate.address.city;
      userToUpdate.phone = phone || userToUpdate.phone;

      fs.writeFileSync(filePath, JSON.stringify(jsonData));

      res.status(200).send("User Updated!");
    } catch (error) {
      res.status(500).json({ error: "Failed to read JSON file" });
    }
  } else {
    res.status(405).json({ error: "Method not allowed" });
  }
}
