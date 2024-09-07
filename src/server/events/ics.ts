import * as ics from "ics";
import { getEvents } from ".";

export const generateIcs = async () => {
  const events = await getEvents();

  const eventAttributes = events.data.map((event) => {
    const { from, to, location, name, categories, organizer } =
      event.attributes;
    return {
      title: name.en,
      start: from,
      end: to,
      location: location ?? undefined,
      categories: categories.data.map((category) => category.id.toString()),
      organizer: { name: organizer.data.id.toString() },
    } satisfies ics.EventAttributes;
  });

  return new Promise<string>((resolve, reject) => {
    ics.createEvents(eventAttributes, (error, value) => {
      if (error) {
        reject(error);
      } else {
        resolve(value);
      }
    });
  });
};
