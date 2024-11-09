import { useEffect, useState } from 'react';

type RSSItem = {
  title: string;
  link: string;
  description: string;
  pubDate: string;
};

type RSSFeedResponse = {
  status: string;
  items: RSSItem[];
};

export default function fetchRSSFeed(url: string) {
  const [feedData, setFeedData] = useState<RSSFeedResponse>({ status: 'loading', items: [] });
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    const fetchRSSFeed = async () => {
      setLoading(true);
      try {
        const response = await fetch(url);
        const json = await response.json();

        // Assuming the JSON response structure matches the one provided
        const itemsArray: RSSItem[] = json.items.map((item: any) => ({
          title: item.title || '',
          link: item.link || '',
          description: item.description || '',
          pubDate: item.pubDate || '',
        }));

        setFeedData({ status: json.status, items: itemsArray });
      } catch (error) {
        setError(error as Error);
        console.error('Error fetching RSS feed: ', error);
        setFeedData({ status: 'error', items: [] });
      } finally {
        setLoading(false);
      }
    };

    fetchRSSFeed();
  }, [url]);

  return { ...feedData, loading, error };
}
