import React, { useState } from "react";
import {
  ThemeProvider,
  createTheme,
  Container,
  Typography,
  Alert,
  Paper,
  Box,
  CssBaseline,
} from "@mui/material";
import EmailInputForm from "./components/EmailInputForm";
import ReplyViewer from "./components/ReplyViewer";
import { generateEmailReply } from "./services/api";
import "./App.css";

const theme = createTheme({
  palette: {
    mode: "light",
    primary: {
      main: "#4f46e5", // Indigo accent
      light: "#6366f1",
      dark: "#4338ca",
    },
    secondary: {
      main: "#ec4899",
    },
    background: {
      default: "#f8fafc",
      paper: "#ffffff",
    },
    text: {
      primary: "#0f172a",
      secondary: "#64748b",
    },
  },
  typography: {
    fontFamily: [
      "Inter",
      "-apple-system",
      "BlinkMacSystemFont",
      '"Segoe UI"',
      "Roboto",
      "sans-serif",
    ].join(","),
    button: {
      textTransform: "none",
      fontWeight: 600,
    },
  },
  shape: {
    borderRadius: 14,
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 10,
          boxShadow: "none",
          "&:hover": {
            boxShadow: "0 4px 12px rgba(79, 70, 229, 0.25)",
          },
        },
      },
    },
    MuiPaper: {
      styleOverrides: {
        root: {
          borderRadius: 16,
        },
      },
    },
    MuiOutlinedInput: {
      styleOverrides: {
        root: {
          borderRadius: 10,
          backgroundColor: "#ffffff",
        },
      },
    },
  },
});

function App() {
  const [emailContent, setEmailContent] = useState("");
  const [tone, setTone] = useState("");
  const [generatedReply, setGeneratedReply] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const reply = await generateEmailReply(emailContent, tone);
      setGeneratedReply(reply);
    } catch (err) {
      setError(err.message || "Failed to generate reply. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Container maxWidth="md" sx={{ px: { xs: 2, sm: 3 } }}>
        <Paper
          elevation={0}
          sx={{
            p: { xs: 3, sm: 5 },
            background: "#ffffff",
            boxShadow: "0 20px 40px -15px rgba(0, 0, 0, 0.08), 0 0 1px 1px rgba(0, 0, 0, 0.04)",
            border: "1px solid rgba(226, 232, 240, 0.8)",
          }}
        >
          {/* Header */}
          <Box sx={{ mb: 4, textAlign: "center" }}>
            <Box
              sx={{
                display: "inline-block",
                px: 2,
                py: 0.5,
                mb: 1.5,
                borderRadius: 5,
                bgcolor: "#eef2ff",
                color: "#4f46e5",
                fontSize: "0.85rem",
                fontWeight: 600,
                letterSpacing: "0.04em",
              }}
            >
              AI-POWERED ASSISTANT
            </Box>
            <Typography
              variant="h3"
              component="h1"
              sx={{
                fontSize: { xs: "2rem", sm: "2.6rem" },
                fontWeight: 800,
                color: "#0f172a",
                letterSpacing: "-0.03em",
                mb: 1,
              }}
            >
              GmailGenie <Box component="span" sx={{ color: "#4f46e5" }}>AI</Box>
            </Typography>
            <Typography variant="body1" color="text.secondary" sx={{ maxWidth: 520, mx: "auto" }}>
              Your intelligent AI email assistant. Draft polished, contextual replies effortlessly.
            </Typography>
          </Box>

          {error && (
            <Alert severity="error" sx={{ mb: 3, borderRadius: 2 }}>
              {error}
            </Alert>
          )}

          <EmailInputForm
            emailContent={emailContent}
            setEmailContent={setEmailContent}
            tone={tone}
            setTone={setTone}
            onSubmit={handleSubmit}
            loading={loading}
          />

          <ReplyViewer reply={generatedReply} />
        </Paper>

        {/* Golden Watermark */}
        <Box
          sx={{
            mt: 3,
            textAlign: "center",
          }}
        >
          <Typography
            variant="body2"
            sx={{
              fontWeight: 600,
              letterSpacing: "0.06em",
              fontSize: "0.875rem",
              color: "#D4AF37",
            }}
          >
            Made by UK ⭐
          </Typography>
        </Box>
      </Container>

    </ThemeProvider>
  );
}

export default App;
