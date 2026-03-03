import { useState, useRef } from 'react';
import { FormattedMessage } from 'react-intl';
import type { ICellRendererParams } from 'ag-grid-community';
import { Button, Popper, Paper, Box, Typography, List, ListItem, Divider } from '@mui/material';
import { Assignment } from '@/lib/types';

const AssignmentsHover = ({ assignments }: { assignments: Assignment[] }) => (
    <Box sx={{ p: 1, minWidth: 200, maxWidth: 800 }}>
        {assignments?.length ? (
            <List dense disablePadding>
                {assignments.map((a, i) => (
                    <ListItem key={i} disableGutters sx={{ display: 'block', py: 0.5 }}>
                        <Typography variant="subtitle1">{a.title}</Typography>
                        <Typography variant="body2">{a.detail}</Typography>
                        <Divider sx={{ py: 0.3 }} />
                    </ListItem>
                ))}
            </List>
        ) : (
            <Typography variant="body2" color="text.secondary" fontStyle="italic">
                <FormattedMessage id="no_assignments" />
            </Typography>
        )}
    </Box>
);

const AssignmentsRenderer = ({ value }: ICellRendererParams<Assignment[]>) => {
    const [open, setOpen] = useState(false);
    const anchorRef = useRef<HTMLButtonElement>(null);

    return (
        <>
            <Button
                ref={anchorRef}
                variant="contained"
                size="small"
                sx={{ mb: '0.3rem' }}
                onMouseEnter={() => setOpen(true)}
                onMouseLeave={() => setOpen(false)}
            >
                {value?.length ?? 0} <FormattedMessage id="ag.header.assignments" />
            </Button>

            <Popper
                open={open}
                anchorEl={anchorRef.current}
                placement="bottom-start"
                onMouseEnter={() => setOpen(true)}
                onMouseLeave={() => setOpen(false)}
            >
                <Paper elevation={4}>
                    <AssignmentsHover assignments={value ?? []} />
                </Paper>
            </Popper>
        </>
    );
};

export default AssignmentsRenderer;
