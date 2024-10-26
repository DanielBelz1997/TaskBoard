import { Box, Typography, Container } from "@mui/material";
import { useTheme } from "@mui/material/styles";

export const FooterComponent = () => {
  const theme = useTheme();

  return (
    <Box
      component="footer"
      sx={{
        py: 3,
        px: 2,
        mt: "auto",
        backgroundColor:
          theme.palette.mode === "light"
            ? theme.palette.background.footer
            : theme.palette.background.footerDark,
        color:
          theme.palette.mode === "light"
            ? theme.palette.text.footer
            : theme.palette.text.footerDark,
      }}>
      <Container maxWidth="lg">
        <Typography variant="body1">
          © {new Date().getFullYear()} Daniel Belz
        </Typography>
      </Container>
    </Box>
  );
};
