import React, { useState } from "react";
import { Typography, TextField, Button, Paper, Box } from "@mui/material";
import { useNavigate } from "react-router-dom";

const initial = {
  name: "",
  title: "",
  desc: "",
  projectLink: "",
  feedback: "",
};

const Create = () => {
  const navigate = useNavigate();
  const [form, setForm] = useState(initial);

  const handleSubmit = (e) => {
    e.preventDefault();
    fetch("http://localhost:8080/post", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(form),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log("Success:", data);
        navigate("/employee/feed"); // Move navigation here
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  };

  const handleChange = (e, field) => {
    setForm({ ...form, [field]: e.target.value });
  };

  const { name, title, desc, projectLink, feedback } = form;

  return (
    <Paper sx={{ padding: "2%", maxWidth: 600, margin: "auto" }} elevation={3}>
      <Typography sx={{ margin: "2% auto" }} align="center" variant="h5">
        Create New Project
      </Typography>
      <form autoComplete="off" noValidate onSubmit={handleSubmit}>
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            gap: "16px",
          }}
        >
          <TextField
            required
            onChange={(e) => handleChange(e, "name")}
            label="Name"
            variant="outlined"
            value={name}
            fullWidth
          />
          <TextField
            required
            onChange={(e) => handleChange(e, "title")}
            label="Title"
            variant="outlined"
            value={title}
            fullWidth
          />
          <TextField
            required
            onChange={(e) => handleChange(e, "desc")}
            label="Description"
            variant="outlined"
            value={desc}
            multiline
            rows={4}
            fullWidth
          />
          <TextField
            required
            onChange={(e) => handleChange(e, "projectLink")}
            label="Project Link"
            variant="outlined"
            type="url"
            value={projectLink}
            fullWidth
          />
          <TextField
            required
            onChange={(e) => handleChange(e, "feedback")}
            label="Feedback"
            variant="outlined"
            value={feedback}
            multiline
            rows={4}
            fullWidth
          />
          <Button variant="contained" type="submit" fullWidth>
            Submit
          </Button>
        </Box>
      </form>
    </Paper>
  );
};

export default Create;
