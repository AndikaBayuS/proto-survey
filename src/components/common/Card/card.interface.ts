import { Prisma } from "@prisma/client";

export interface CardProps {
  surveyId: string;
  ownerName: Prisma.JsonValue | undefined;
  ownerImage: Prisma.JsonValue | undefined;
  title: string;
  description: string;
}
