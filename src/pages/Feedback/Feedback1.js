import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  TextField,
  Typography,
  CircularProgress,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  FormHelperText,
  Rating,
} from "@mui/material";
import { Link } from "react-router-dom";
import "./Feedback.css";

const Feedback1 = () => {
  const [feedbacks, setFeedbacks] = useState([]);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    travelguide: "",
    rating: "",
    feedback: "",
  });
  const [isUpdate, setIsUpdate] = useState(false);
  const [updateId, setUpdateId] = useState(null);
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [formErrors, setFormErrors] = useState({});
  const [touchedFields, setTouchedFields] = useState({});

  const travelGuideOptions = [
    "Mr.R.K.Karunarathna",
    "Mr.R.K.Karu",
    "Mr.R.K.rathna",
    "Mr.R.K.thna",
  ];

  const validateForm = () => {
    const errors = {};
    if (!formData.name) {
      errors.name = "Name is required";
    }
    if (!formData.email) {
      errors.email = "Email is required";
    } else if (!/^\S+@\S+\.\S+$/.test(formData.email)) {
      errors.email = "Invalid email format";
    }
    if (!formData.travelguide) {
      errors.travelguide = "Travel Guide is required";
    }
    if (!formData.rating) {
      errors.rating = "Rating is required";
    } else if (
      isNaN(formData.rating) ||
      formData.rating < 1 ||
      formData.rating > 5
    ) {
      errors.rating = "Rating must be a number between 1 and 5";
    }
    if (!formData.feedback) {
      errors.feedback = "Feedback is required";
    }
    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleFieldChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    setTouchedFields({ ...touchedFields, [name]: true });
  };

  const handleBlur = (e) => {
    const { name, value } = e.target;
    if (value.trim() === "") {
      setFormErrors({
        ...formErrors,
        [name]: `${name.charAt(0).toUpperCase() + name.slice(1)} is required`,
      });
    } else {
      setFormErrors({ ...formErrors, [name]: undefined });
    }
  };

  const getFeedbacks = async () => {
    setLoading(true);
    try {
      const response = await axios.get("http://localhost:3001/api/feedbacks");
      if (Array.isArray(response.data.response)) {
        setFeedbacks(response.data.response);
      } else {
        console.error("Received data is not an array:", response.data.response);
      }
    } catch (error) {
      console.error("Error fetching feedbacks:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getFeedbacks();
  }, []);

  const handleCreateOrUpdate = async () => {
    if (!validateForm()) {
      return;
    }
    setLoading(true);
    try {
      if (isUpdate) {
        await axios.post("http://localhost:3001/api/updatefeedback", {
          ...formData,
          id: updateId,
        });
      } else {
        await axios.post("http://localhost:3001/api/createfeedback", formData);
      }
      getFeedbacks();
      setFormData({
        name: "",
        email: "",
        travelguide: "",
        rating: "",
        feedback: "",
      });
      setIsUpdate(false);
      setUpdateId(null);
      handleClose();
    } catch (error) {
      console.error("Error creating/updating feedback:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = (id, name, email, travelguide, rating, feedback) => {
    setFormData({ name, email, travelguide, rating, feedback });
    setIsUpdate(true);
    setUpdateId(id);
    handleOpen();
  };

  const handleDelete = async (id) => {
    setLoading(true);
    try {
      await axios.post("http://localhost:3001/api/deletefeedback", { id });
      getFeedbacks();
    } catch (error) {
      console.error("Error deleting feedback:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setFormData({
      name: "",
      email: "",
      travelguide: "",
      rating: "",
      feedback: "",
    });
    setIsUpdate(false);
    setFormErrors({});
    setTouchedFields({});
  };

  return (
    <div className="feedback-container">
      <Button style={{marginRight:"90%"}} component={Link} to="/" variant="contained" color="primary">
        Back to Home
        
      </Button>
      
      
      
      <Typography variant="h4" className="feedback-title">
        <b>Feedback List</b>
      </Typography>
   
      {loading ? (
        <CircularProgress />
      ) : (
        <TableContainer component={Paper}style={{marginTop:"20px"}} className="feedback-table">
          <Table>
            <TableHead>
              <TableRow>
                <TableCell align="center">Name</TableCell>
                <TableCell align="center">Email</TableCell>
                <TableCell align="center">Travel Guide</TableCell>
                <TableCell align="center">Rating</TableCell>
                <TableCell align="center">Feedback</TableCell>
                <TableCell align="center">Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {feedbacks.length > 0 ? (
                feedbacks.map((feedback) => (
                  <TableRow key={feedback._id}>
                    <TableCell align="center">{feedback.name}</TableCell>
                    <TableCell align="center">{feedback.email}</TableCell>
                    <TableCell align="center">{feedback.travelguide}</TableCell>
                    <TableCell align="center">
                      <Rating
                        name="read-only"
                        value={feedback.rating}
                        readOnly
                      />
                    </TableCell>
                    <TableCell align="center">{feedback.feedback}</TableCell>
                    <TableCell align="center">
                      <Button
                        variant="contained"
                        color="primary"
                        onClick={() =>
                          handleEdit(
                            feedback.id,
                            feedback.name,
                            feedback.email,
                            feedback.travelguide,
                            feedback.rating,
                            feedback.feedback
                          )
                        }
                      >
                        Edit
                      </Button>
                      <Button
                        variant="contained"
                        color="secondary"
                        style={{backgroundColor:"red"}}
                        onClick={() => handleDelete(feedback.id)}
                      >
                        Delete
                      </Button>
                    </TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={6} align="center">
                    <Typography variant="body1">No feedbacks found</Typography>
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </TableContainer>
      )}
      <div className="feedback-button-container">
        <Button
          variant="contained"
          color="primary"
          onClick={handleOpen}
          className="feedback-button"
        >
          Add Feedbacks
        </Button>
      </div>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>{isUpdate ? "Edit Feedback" : "Add Feedback"}</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            id="name"
            name="name"
            label="Name"
            fullWidth
            value={formData.name}
            onChange={handleFieldChange}
            onBlur={handleBlur}
            error={!!(formErrors.name && touchedFields.name)}
            helperText={formErrors.name}
          />
          <TextField
            margin="dense"
            id="email"
            name="email"
            label="Email"
            fullWidth
            value={formData.email}
            onChange={handleFieldChange}
            onBlur={handleBlur}
            error={!!(formErrors.email && touchedFields.email)}
            helperText={formErrors.email}
          />
          <FormControl
            fullWidth
            error={!!(formErrors.travelguide && touchedFields.travelguide)}
          >
            <InputLabel id="travelguide-label">Travel Guide</InputLabel>
            <Select
              labelId="travelguide-label"
              id="travelguide"
              name="travelguide"
              value={formData.travelguide}
              onChange={handleFieldChange}
              onBlur={handleBlur}
            >
              {travelGuideOptions.map((option, index) => (
                <MenuItem key={index} value={option}>
                  {option}
                </MenuItem>
              ))}
            </Select>
            {formErrors.travelguide && touchedFields.travelguide && (
              <FormHelperText>{formErrors.travelguide}</FormHelperText>
            )}
          </FormControl>
          <TextField
            margin="dense"
            id="rating"
            name="rating"
            label="Rating"
            fullWidth
            value={formData.rating}
            onChange={handleFieldChange}
            onBlur={handleBlur}
            error={!!(formErrors.rating && touchedFields.rating)}
            helperText={formErrors.rating}
          />
          <TextField
            margin="dense"
            id="feedback"
            name="feedback"
            label="Feedback"
            fullWidth
            value={formData.feedback}
            onChange={handleFieldChange}
            onBlur={handleBlur}
            error={!!(formErrors.feedback && touchedFields.feedback)}
            helperText={formErrors.feedback}
          />
        </DialogContent>
        <div className="form-actions">
          <Button
            onClick={handleClose}
            className="feedback-button"
            color="secondary"
          >
            Cancel
          </Button>
          <Button
            onClick={handleCreateOrUpdate}
            className="feedback-button"
            color="primary"
          >
            {isUpdate ? "Update" : "Add"}
          </Button>
        </div>
      </Dialog>
    </div>
  );
};

export default Feedback1;
