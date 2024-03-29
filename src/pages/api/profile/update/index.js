import { prisma } from "@/lib/prisma";

export default async function handler(req, res) {
  try {
    const updatedUser = await prisma.user.update({
      where: {
        email: String(req.body.email),
      },
      data: {
        name: {
          set: req.body.name,
        },
        university: {
          set: req.body.university,
        },
      },
    });

    res.status(200).json(updatedUser);
  } catch (err) {
    res.status(400).json({ message: "Failed" });
  }
}
