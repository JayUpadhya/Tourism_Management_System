import { Button, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from "@mui/material";
import { green } from "@mui/material/colors";

const DestinationTable = ({ destinations, selectedDestination, deleteDestination }) => {
    return (
        <div style={{ overflowX: 'auto' }}>
            <TableContainer component={Paper}>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell style={{ borderRight: '1px solid rgba(224, 224, 224, 1)', borderBottom: '1px solid rgba(224, 224, 224, 1)', Width: '100px' }}>ID</TableCell>
                            <TableCell style={{ borderRight: '1px solid rgba(224, 224, 224, 1)', borderBottom: '1px solid rgba(224, 224, 224, 1)', minWidth: '100px' }}>Title</TableCell>
                            <TableCell style={{ borderRight: '1px solid rgba(224, 224, 224, 1)', borderBottom: '1px solid rgba(224, 224, 224, 1)', minWidth: '200px' }}>Description</TableCell>
                            <TableCell style={{ borderRight: '1px solid rgba(224, 224, 224, 1)', borderBottom: '1px solid rgba(224, 224, 224, 1)', minWidth: '200px'  }}>URL</TableCell>
                            <TableCell style={{ borderBottom: '1px solid rgba(224, 224, 224, 1)', minWidth: '150px' }}>Action</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {destinations.length > 0 ? (
                            destinations.map(destination => (
                                <TableRow key={destination.id} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                                    <TableCell style={{ borderRight: '1px solid rgba(224, 224, 224, 1)', borderBottom: '1px solid rgba(224, 224, 224, 1)', Width: '100px' }}>{destination.id}</TableCell>
                                    <TableCell style={{ borderRight: '1px solid rgba(224, 224, 224, 1)', borderBottom: '1px solid rgba(224, 224, 224, 1)', minWidth: '100px' }}>{destination.title}</TableCell>
                                    <TableCell style={{ borderRight: '1px solid rgba(224, 224, 224, 1)', borderBottom: '1px solid rgba(224, 224, 224, 1)', minWidth: '200px' }}>{destination.description}</TableCell>
                                    <TableCell style={{ borderRight: '1px solid rgba(224, 224, 224, 1)', borderBottom: '1px solid rgba(224, 224, 224, 1)', minWidth: '200px' }}>{destination.url}</TableCell>
                                    <TableCell style={{ borderBottom: '1px solid rgba(224, 224, 224, 1)', minWidth: '150px' }}>
                                        <Button sx={{ margin: '0px 10px' ,
                                                      backgroundColor: '#69f0ae',
                                                      color: 'black',
                                                      marginBottom:  '5px',
                                                      '&:hover': {
                                                          backgroundColor: '#4caf50', // New color on hover
                                                      }
                                        }} onClick={() => selectedDestination(destination)}>
                                            Update
                                        </Button>
                                        <Button sx={{ margin: '0px 10px',
                                                      backgroundColor: '#ff5252',
                                                      color: 'black',
                                                      '&:hover': {
                                                          backgroundColor: '#f44336', // New color on hover
                                                      }
                                         }} onClick={() => deleteDestination(destination)}>
                                            Delete
                                        </Button>
                                    </TableCell>
                                </TableRow>
                            ))
                        ) : (
                            <TableRow sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                                <TableCell colSpan={4} style={{ borderBottom: '1px solid rgba(224, 224, 224, 1)' }}>No Data</TableCell>
                            </TableRow>
                        )}
                    </TableBody>
                </Table>
            </TableContainer>
        </div>
    );
};

export default DestinationTable;
