import { ICellRendererParams } from 'ag-grid-community';
import { Button, Popper, Paper, TableBody, Typography, TableCell, TableRow } from '@mui/material';

import React, { useState, useRef } from 'react';
import { Assignment } from '../../../../types';

const AssignmentsHover = ({ assignments }: { assignments: Assignment[] }) => (
    <TableBody>
        {assignments?.length ? (
            assignments.map((assignment, index) => (
                <TableRow key={index}>
                    <TableCell sx={{ pl: 3 }}>
                        <Typography align="left" variant="subtitle1">
                            {assignment.title}
                        </Typography>
                        <Typography align="left" variant="body2">
                            {assignment.detail}
                        </Typography>
                    </TableCell>
                </TableRow>
            ))
        ) : (
            <Typography variant="body2" color="text.secondary" fontStyle="italic">
                No assignments
            </Typography>
        )}
    </TableBody>
);
const AssignmentsRenderer = ({ value }: ICellRendererParams) => {
    const [open, setOpen] = useState(false);
    const anchorRef = useRef<HTMLButtonElement>(null);

    return (
        <>
            <Button ref={anchorRef} variant="contained" size="small" onMouseEnter={() => setOpen(true)} onMouseLeave={() => setOpen(false)}>
                {value?.length || 0} Assignments
            </Button>

            <Popper
                open={open}
                anchorEl={anchorRef.current}
                placement="bottom-start"
                onMouseEnter={() => setOpen(true)}
                onMouseLeave={() => setOpen(false)}
            >
                <Paper sx={{ padding: 1, minWidth: 200, maxWidth: 800, boxShadow: 4 }}>
                    <AssignmentsHover assignments={value} />
                </Paper>
            </Popper>
        </>
    );
};

export default AssignmentsRenderer;
