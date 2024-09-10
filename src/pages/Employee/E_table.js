import { Box, Button, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from "@mui/material";

const E_table = ({ rows , selectedEmployee, deleteEmployee}) => {  //can write this also - const E_table = ({rows}) , in 16 row props should remove
    return(

      <TableContainer component={Paper}>
        <Table>
            <TableHead>
              <TableRow>
                  <TableCell>ID</TableCell>
                  <TableCell>Name</TableCell>
                  <TableCell>Role</TableCell>
                  <TableCell>Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
                {
                  rows.length > 0? rows.map(row => (
                    <TableRow key={row.id} sx={{'&:last-child td, &:last-child th' : {border: 0}}}>
                      <TableCell component='th' scope="row">{row.id}</TableCell>
                      <TableCell component='th' scope="row">{row.name}</TableCell>
                      <TableCell component='th' scope="row">{row.role}</TableCell>
                      <TableCell >
                        <Button
                          sx={{margin: '0px 10px'}}
                          onClick={() => selectedEmployee ({id : row.id , name : row.name, role : row.role})}
                        >
                          update

                        </Button>

                        <Button
                          sx={{margin: '0px 10px'}}
                          onClick={() => deleteEmployee ({ id : row.id})}
                        >
                          delete

                        </Button>
                      </TableCell>
                    </TableRow>
                      
                  )) : (
                    <TableRow sx={{'&:last-child td, &:last-child th' : {border: 0}}}>
                      <TableCell component='th' scope="row">No Data</TableCell>
                    </TableRow>
                  )
                }
            </TableBody>
        </Table>
       

    </TableContainer>

    


    )
    

}

export default E_table;