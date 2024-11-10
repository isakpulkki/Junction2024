import AuthenticationBar from "../components/AuthenticationBar";
import { ThemeProvider } from "@mui/material/styles";
import { theme } from "../App";
import fetchRSSFeed from "../hooks/fetchRSSFeeds";
import { Typography } from "@mui/material";
import VotingList from "../components/VotingList";
import Sidebar from "../components/SideBar";

export default function VotingPage() {
  // Tän idea fetchata data, joka löytyy data.json tiedostosta --> tähän RSS feedistä dataa

  // const rssFeedUrlOG = 'https://www.eduskunta.fi/_layouts/15/feed.aspx?xsl=1&web=%2FFI%2Frss%2Dfeeds&page=09a1389c-9905-432f-a68b-dad4d2992beb&wp=aae94984-39b7-459a-9912-7bf5d970b356&pageurl=%2FFI%2Frss%2Dfeeds%2FSivut%2FHEt%2Easpx';
  const rssFeedUrl =
    "https://api.rss2json.com/v1/api.json?rss_url=https%3A%2F%2Fwww.eduskunta.fi%2F_layouts%2F15%2Ffeed.aspx%3Fxsl%3D1%26web%3D%252FFI%252Frss%252Dfeeds%26page%3D09a1389c-9905-432f-a68b-dad4d2992beb%26wp%3Daae94984-39b7-459a-9912-7bf5d970b356%26pageurl%3D%252FFI%252Frss%252Dfeeds%252FSivut%252FHEt%252Easpx";

  const { status, items, loading, error } = fetchRSSFeed(rssFeedUrl);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error loading feed: {error.message}</p>;

  return (
    <ThemeProvider theme={theme}>
      <AuthenticationBar />
      <Sidebar />
      <VotingList polls={items} />
    </ThemeProvider>
  );
}
