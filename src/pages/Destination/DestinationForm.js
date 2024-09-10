import { Button, Grid, Input, Typography } from "@mui/material";
import { useState, useEffect } from "react";

const DestinationForm = ({ addDestination, updateDestination, submitted, data, isEdit }) => {
    const [id, setId] = useState(0);
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [url, setUrl] = useState(''); // New state for URL
    const [titleError, setTitleError] = useState('');

    useEffect(() => {
        if (!submitted) {
            setId(0);
            setTitle('');
            setDescription('');
            setUrl(''); // Reset URL as well
        }
    }, [submitted]);

    useEffect(() => {
        if (data && data.id && data.id !== 0) {
            setId(data.id);
            setTitle(data.title);
            setDescription(data.description);
            setUrl(data.url); // Set URL if available in data
        }
    }, [data]);

    const handleTitleChange = (e) => {
        const value = e.target.value;
        if (/^[a-zA-Z\s]*$/.test(value)) {
            setTitle(value);
            setTitleError('');
        } else {
            setTitleError('Title can only contain letters');
        }
    };

    return (
        <Grid
            container
            spacing={2}
            sx={{
                backgroundColor: '#f0f0f0',
                marginBottom: '3px',
                display: 'block',
                padding: '20px',
                borderRadius: '8px',
                boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
                marginBottom: '20px ',
                marginLeft: '-9px'
            }}
        >
            <Grid item xs={12}>
                <Typography component={'h1'} sx={{ color: '#000000' }}></Typography>
            </Grid>

            <Grid item xs={12} sm={6} sx={{ display: 'flex' }}>
                <Typography component={'label'} htmlFor="id" sx={{ color: '#000000', marginRight: '20px', fontSize: '16px', width: '100px', display: 'block' }}>ID</Typography>
                <Input
                    type="number"
                    id="id"
                    name="id"
                    sx={{ width: '400px' }}
                    value={id}
                    onChange={e => setId(e.target.value)}
                />
            </Grid>

            <Grid item xs={12} sm={6} sx={{ display: 'flex' }}>
                <Typography component={'label'} htmlFor="id" sx={{ color: '#000000', marginRight: '20px', fontSize: '16px', width: '100px', display: 'block' }}>Title</Typography>
                <Input
                    type="text"
                    id="title"
                    name="title"
                    sx={{ width: '400px' }}
                    value={title}
                    onChange={handleTitleChange}
                />
                {titleError && (
                    <Typography variant="caption" color="error">
                        {titleError}
                    </Typography>
                )}
            </Grid>

            <Grid item xs={12} sm={6} sx={{ display: 'flex' }}>
                <Typography component={'label'} htmlFor="id" sx={{ color: '#000000', marginRight: '20px', fontSize: '16px', width: '100px', display: 'block' }}>Description</Typography>
                <Input
                    type="text"
                    id="description"
                    name="description"
                    sx={{ width: '400px' }}
                    value={description}
                    onChange={e => setDescription(e.target.value)}
                />
            </Grid>

            <Grid item xs={12} sm={6} sx={{ display: 'flex' }}>
                <Typography component={'label'} htmlFor="id" sx={{ color: '#000000', marginRight: '20px', fontSize: '16px', width: '100px', display: 'block' }}>URL</Typography>
                <Input
                    type="text"
                    id="url"
                    name="url"
                    sx={{ width: '400px' }}
                    value={url}
                    onChange={e => setUrl(e.target.value)} // Handle URL change
                />
            </Grid>

            <Button
                sx={{
                    margin: 'auto',
                    marginBottom: '20px',
                    backgroundColor: '#00c6e6',
                    color: '#000000',
                    marginLeft: '15px',
                    marginTop: '20px',
                    '&:hover': {
                        opacity: '0.7',
                        backgroundColor: '00c6e6',
                    }
                }}
                onClick={() => isEdit ? updateDestination({ id, title, description, url }) : addDestination({ id, title, description, url })}
            >
                {isEdit ? 'Update' : 'Add'}
            </Button>
        </Grid>
    );
};

export default DestinationForm;