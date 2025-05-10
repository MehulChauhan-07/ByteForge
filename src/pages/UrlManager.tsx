import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  Box,
  Button,
  TextField,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Typography,
  IconButton,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Alert,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import ContentCopyIcon from "@mui/icons-material/ContentCopy";

const API_BASE_URL = "http://localhost:3001";

interface UrlData {
  _id: string;
  shortId: string;
  originalUrl: string;
  visitHistory: { timestamp: number }[];
  createdAt: string;
}

const UrlManager: React.FC = () => {
  const [urls, setUrls] = useState<UrlData[]>([]);
  const [originalUrl, setOriginalUrl] = useState("");
  const [editUrl, setEditUrl] = useState<{ id: string; originalUrl: string }>({
    id: "",
    originalUrl: "",
  });
  const [openDialog, setOpenDialog] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  // Fetch all URLs
  const fetchUrls = async () => {
    try {
      const response = await axios.get<UrlData[]>(`${API_BASE_URL}/url`);
      setUrls(response.data);
      setError("");
    } catch (error) {
      console.error("Error fetching URLs:", error);
      setError("Failed to fetch URLs");
    }
  };

  useEffect(() => {
    fetchUrls();
  }, []);

  // Create new short URL
  const handleCreateUrl = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await axios.post<UrlData>(`${API_BASE_URL}/url`, {
        originalUrl,
      });
      setUrls([...urls, response.data]);
      setOriginalUrl("");
      setError("");
      setSuccess("URL shortened successfully!");
      setTimeout(() => setSuccess(""), 3000);
    } catch (error) {
      console.error("Error creating URL:", error);
      setError("Failed to create short URL");
    }
  };

  // Update URL
  const handleUpdateUrl = async () => {
    try {
      const response = await axios.put<UrlData>(
        `${API_BASE_URL}/url/${editUrl.id}`,
        {
          originalUrl: editUrl.originalUrl,
        }
      );
      setUrls(
        urls.map((url) => (url._id === editUrl.id ? response.data : url))
      );
      setOpenDialog(false);
      setError("");
      setSuccess("URL updated successfully!");
      setTimeout(() => setSuccess(""), 3000);
    } catch (error) {
      console.error("Error updating URL:", error);
      setError("Failed to update URL");
    }
  };

  // Delete URL
  const handleDeleteUrl = async (id: string) => {
    try {
      await axios.delete(`${API_BASE_URL}/url/${id}`);
      setUrls(urls.filter((url) => url._id !== id));
      setError("");
      setSuccess("URL deleted successfully!");
      setTimeout(() => setSuccess(""), 3000);
    } catch (error) {
      console.error("Error deleting URL:", error);
      setError("Failed to delete URL");
    }
  };

  // Copy short URL to clipboard
  const handleCopyUrl = (shortUrl: string) => {
    navigator.clipboard.writeText(`${API_BASE_URL}/url/${shortUrl}`);
    setSuccess("URL copied to clipboard!");
    setTimeout(() => setSuccess(""), 3000);
  };

  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h4" gutterBottom>
        URL Manager
      </Typography>

      {error && (
        <Alert severity="error" sx={{ mb: 2 }}>
          {error}
        </Alert>
      )}

      {success && (
        <Alert severity="success" sx={{ mb: 2 }}>
          {success}
        </Alert>
      )}

      {/* Create URL Form */}
      <Box component="form" onSubmit={handleCreateUrl} sx={{ mb: 4 }}>
        <TextField
          fullWidth
          label="Enter URL to shorten"
          value={originalUrl}
          onChange={(e) => setOriginalUrl(e.target.value)}
          sx={{ mb: 2 }}
          required
        />
        <Button variant="contained" type="submit">
          Create Short URL
        </Button>
      </Box>

      {/* URLs Table */}
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Original URL</TableCell>
              <TableCell>Short URL</TableCell>
              <TableCell>Created At</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {urls.map((url) => (
              <TableRow key={url._id}>
                <TableCell>{url.originalUrl}</TableCell>
                <TableCell>
                  {`${API_BASE_URL}/url/${url.shortId}`}
                  <IconButton
                    size="small"
                    onClick={() => handleCopyUrl(url.shortId)}
                  >
                    <ContentCopyIcon />
                  </IconButton>
                </TableCell>
                <TableCell>
                  {new Date(url.createdAt).toLocaleDateString()}
                </TableCell>
                <TableCell>
                  <IconButton
                    onClick={() => {
                      setEditUrl({ id: url._id, originalUrl: url.originalUrl });
                      setOpenDialog(true);
                    }}
                  >
                    <EditIcon />
                  </IconButton>
                  <IconButton onClick={() => handleDeleteUrl(url._id)}>
                    <DeleteIcon />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      {/* Edit Dialog */}
      <Dialog open={openDialog} onClose={() => setOpenDialog(false)}>
        <DialogTitle>Edit URL</DialogTitle>
        <DialogContent>
          <TextField
            fullWidth
            label="Original URL"
            value={editUrl.originalUrl}
            onChange={(e) =>
              setEditUrl({ ...editUrl, originalUrl: e.target.value })
            }
            sx={{ mt: 2 }}
            required
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenDialog(false)}>Cancel</Button>
          <Button onClick={handleUpdateUrl} variant="contained">
            Save
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default UrlManager;
