import { type NextRequest } from "next/server";
import { generateIcs } from "~/server/events/ics";

const handler = async (req: NextRequest) => {
  const ics = await generateIcs();

  return new Response(ics, {
    headers: {
      "Content-Type": "text/calendar",
    },
  });
};

export { handler as GET };
