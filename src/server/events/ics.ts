import { getEvents } from ".";

export const generateIcs = async () => {
  const events = await getEvents();

  const ics = `BEGIN:VCALENDAR
VERSION:2.0
PRODID:-//unievent-calendar//NONSGML v1.0//EN
${events.data
  .map((event) => {
    const { from, to, location, name, categories } = event.attributes;

    return `BEGIN:VEVENT
UID:${event.id}
DTSTAMP:${new Date().toISOString().split("-").join("").split(":").join("").split(".")[0] + "Z"}
DTSTART:${new Date(from).toISOString().split("-").join("").split(":").join("").split(".")[0] + "Z"}
DTEND:${new Date(to).toISOString().split("-").join("").split(":").join("").split(".")[0] + "Z"}
LOCATION:${location ?? ""}
SUMMARY:${name.fi ?? name.en}
CATEGORIES:${categories.data.map((category) => category.id).join(",")}
END:VEVENT`;
  })
  .join("\n")}
END:VCALENDAR`;

  return ics.split("\n").join("\r\n");
};
