import { Box, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import DestinationForm from "./DestinationForm";
import DestinationTable from "./DestinationTable";
import Axios from "axios";

const Destination = () => {
    const [destinations, setDestinations] = useState([]);
    const [selectedDestination, setSelectedDestination] = useState({});
    const [isEdit, setIsEdit] = useState(false);
    const [submitted, setSubmitted] = useState(false);

    useEffect(() => {
        getDestinations();
    }, []);

    const getDestinations = () => {
        Axios.get('http://localhost:3001/api/destination')
            .then(response => {
                setDestinations(response.data?.response || []);
            })
            .catch(error => {
                console.error("Axios Error : ", error);
            });
    };

    const addDestination = (data) => {
        setSubmitted(true);

        const payload = {
            id: data.id,
            title: data.title,
            description: data.description,
            url: data.url 
        };

        Axios.post('http://localhost:3001/api/createdestination', payload)
            .then(response => {
                getDestinations();
                setSubmitted(false);
                setIsEdit(false);
            })
            .catch(error => {
                console.error("Axios Error : ", error);
            });
    };

    const updateDestination = (data) => {
        setSubmitted(true);

        const payload = {
            id: data.id,
            title: data.title,
            description: data.description,
            url: data.url
        };

        Axios.post('http://localhost:3001/api/updatedestination', payload)
            .then(response => {
                getDestinations();
                setSubmitted(false);
                setIsEdit(false);
            })
            .catch(error => {
                console.error("Axios Error : ", error);
            });
    };

    const deleteDestination = (data) => {
        Axios.post('http://localhost:3001/api/deletedestination', data)
            .then(() => {
                getDestinations();
            })
            .catch(error => {
                console.error("Axios Error : ", error);
            });
    };

    return (
        <Box
        sx={{
            width: 'calc(100% - 100px)',
            margin: 'auto',
            marginTop: '100px',
            backgroundColor: '#f0f0f0',
            padding: '20px',
            borderRadius: '8px',
            boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)'
        }}
        >
            <Typography variant="h3" align="center" gutterBottom>
                Destination Manager
            </Typography>
            <DestinationForm
                addDestination={addDestination}
                updateDestination={updateDestination}
                submitted={submitted}
                data={selectedDestination}
                isEdit={isEdit}
            />
            <DestinationTable
                destinations={destinations}
                selectedDestination={(data) => {
                    setSelectedDestination(data);
                    setIsEdit(true);
                }}
                deleteDestination={(data) => window.confirm('Are you sure?') && deleteDestination(data)}
            />
        </Box>
    );
};

export default Destination;