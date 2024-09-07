const EVENTS_BASE_URL = "https://trey-calendar-strapi.fly.dev/api/events";

interface GetEventsResponse {
  data: {
    id: number;
    attributes: {
      from: string;
      to: string;
      location: string | null;
      isOpen: boolean;
      name: {
        id: number;
        fi: string;
        en: string;
      };
      categories: {
        data: { id: number }[];
      };
      organizer: {
        data: {
          id: number;
          attributes: {
            bgColor: string;
            fgColor: string;
            createdAt: string;
            updatedAt: string;
          };
        };
      };
    };
  }[];
  meta: {
    pagination: {
      page: number;
      pageSize: number;
      pageCount: number;
      total: number;
    };
  };
}

export const getEvents = async () => {
  const url = new URL(EVENTS_BASE_URL);
  url.searchParams.append("fields", "from");
  url.searchParams.append("fields", "to");
  url.searchParams.append("fields", "location");
  url.searchParams.append("fields", "isOpen");
  url.searchParams.append("populate[name]", "true");
  url.searchParams.append("populate[categories][fields]", "id");
  url.searchParams.append("populate[organizer][fields]", "id");
  url.searchParams.append("filters[from][$gte]", "2024-08-25T21:00:00.000Z");
  url.searchParams.append("filters[to][$lte]", "2024-10-06T21:00:00.000Z");

  const response = await fetch(url);
  const data = (await response.json()) as GetEventsResponse;
  return data;
};
