import {
  Box,
  Card,
  Grid,
  TextField,
  Typography,
  InputAdornment,
  Button,
} from "@mui/material";
import axios from "axios";
import React, { useEffect, useState } from "react";
import SearchIcon from "@mui/icons-material/Search";
import { Link } from "react-router-dom";

const Feed = () => {
  const [query, setQuery] = useState("");
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const fetchPosts = async () => {
      const response = await axios.get(`http://localhost:8080/posts/${query}`);
      setPosts(response.data);
    };
    const fetchInitialPosts = async () => {
      const response = await axios.get(`http://localhost:8080/allPosts`);
      setPosts(response.data);
    };
    if (query.length === 0) fetchInitialPosts();
    if (query.length > 2) fetchPosts();
  }, [query]);

  return (
    <Grid container spacing={2} style={{ margin: "2%" }}>
      <Grid item xs={12} sm={12} md={12} lg={12}>
        <Button style={{ margin: "1% 2%" }} variant="outlined">
          <Link to="/">Home</Link>
        </Button>
        <Box>
          <TextField
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <SearchIcon />
                </InputAdornment>
              ),
            }}
            placeholder="Search..."
            style={{ width: "75%", padding: "2% auto" }}
            fullWidth
            onChange={(e) => setQuery(e.target.value)}
          />
        </Box>
      </Grid>

      {posts.map((post) => (
        <Grid key={post.id} item xs={12} sm={6} md={4} lg={4}>
          <Card style={{ padding: "3%", overflow: "hidden", width: "84%" }}>
            <Typography
              variant="h5"
              style={{ fontSize: "2rem", fontWeight: "600" }}
            >
              {post.name}
            </Typography>
            <br></br>
            <Typography
              style={{ color: "#585858", marginTop: "2%" }}
              variant="body"
            >
              Title: {post.title}
            </Typography>
            <br></br>
            <Typography
              style={{ color: "#585858", marginTop: "2%" }}
              variant="body"
            >
              Description: {post.desc}
            </Typography>
            <br></br>
            <Typography
              style={{ color: "#585858", marginTop: "2%" }}
              variant="body"
            >
              Project Link:{" "}
              <a
                href={post.projectLink}
                target="_blank"
                rel="noopener noreferrer"
              >
                {post.projectLink}
              </a>
            </Typography>
            <br></br>
            <Typography
              style={{ color: "#585858", marginTop: "2%" }}
              variant="body"
            >
              Feedback: {post.feedback}
            </Typography>
          </Card>
        </Grid>
      ))}
    </Grid>
  );
};

export default Feed;
