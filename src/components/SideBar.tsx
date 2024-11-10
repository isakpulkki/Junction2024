import { Box, Link, Typography } from "@mui/material";
import HistoryIcon from "@mui/icons-material/History";
import FormatQuoteIcon from "@mui/icons-material/FormatQuote";
import ArticleIcon from "@mui/icons-material/Article";
import QuestionMarkIcon from "@mui/icons-material/QuestionMark";

function Sidebar() {
  return (
    <Box
      id="sidebar"
      sx={{
        position: "fixed",
        bottom: 0,
        zIndex: 10,
        width: "93%",
        borderTop: "1px solid",
        borderColor: "grey.300",
        backgroundColor: "white",
        p: 2,
      }}
    >
      <Box
        component="nav"
        sx={{
          display: "flex",
          justifyContent: "space-evenly",
          gap: 2,
          overflowX: "auto",
          color: "grey.400",
          scrollbarWidth: "none", // Hide scrollbar for Firefox
          "&::-webkit-scrollbar": {
            display: "none", // Hide scrollbar for Chrome, Safari, and Edge
          },
          "@media (min-width: 1536px)": {
            position: "sticky",
            top: 96, // 24px from top if viewed in larger screens (2xl)
            flexDirection: "column",
          },
        }}
      >
        <Link href="#summary" underline="none" sx={linkStyle}>
          <ArticleIcon fontSize="medium" sx={{ color: "black" }} />
          <Typography variant="subtitle1" sx={textStyle}>
            Voting
          </Typography>
        </Link>

        <Link href="#insights" underline="none" sx={linkStyle}>
          <HistoryIcon fontSize="medium" />
          <Typography variant="subtitle1" sx={textStyle}>
            History
          </Typography>
        </Link>

        <Link href="#graphs" underline="none" sx={linkStyle}>
          <QuestionMarkIcon fontSize="medium" />
          <Typography variant="subtitle1" sx={textStyle}>
            Information
          </Typography>
        </Link>
      </Box>
    </Box>
  );
}

const linkStyle = {
  display: "flex",
  alignItems: "center",
  gap: 1,
  borderRadius: 1,
  p: 1,
  color: "inherit",
  transition: "color 0.3s ease-in-out",
  "&:hover": {
    color: "text.primary",
  },
};

const textStyle = {
  display: { xs: "none", sm: "inline" }, // Hidden on extra-small screens, shown on small screens and up
  fontWeight: "600",
};

export default Sidebar;
