import { ElementType, useEffect, useState, useCallback } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { FormattedMessage, useIntl } from 'react-intl';
import {
    School as SchoolIcon,
    AddBox as AddBoxIcon,
    PhonelinkRingTwoTone as PhonelinkRingTwoToneIcon,
    Delete as DeleteIcon,
    Edit as EditIcon
} from '@mui/icons-material';
import { Divider, Grid, IconButton, List, ListItem, ListItemIcon, ListItemText, Typography } from '@mui/material';
import MainCard from '@/components/cards/MainCard';
import SubCard from '@/components/cards/SubCard';
import { fetchRowById } from '@/lib/utils/api';
import { array_obj_to_obj_with_key } from '@/lib/utils/transformation';
import { Assignment, ModelType, Student } from '@/lib/types';
import { useAppDispatch, setUserAndStudentId, useAppSelector } from '@/lib/store';
import { deleteRowById } from '@/lib/utils/api';

const StudentProfile = ({ student }: { student: Student }) => {
    const intl = useIntl();
    const navigate = useNavigate();

    const handleDelete = async (id: number) => {
        await deleteRowById({
            model: ModelType.student,
            id,
            message: intl.formatMessage({ id: `success.delete.${ModelType.student}` })
        });
        navigate(`/${ModelType.student}`);
    };

    return (
        <Grid size={{ xs: 12, lg: 3 }}>
            <SubCard
                title={
                    <Grid container spacing={2} alignItems="center">
                        <Grid size={12}>
                            <Typography align="left" variant="subtitle1">
                                {student.name}
                            </Typography>
                        </Grid>
                    </Grid>
                }
                secondary={
                    <>
                        <IconButton
                            size="small"
                            color="secondary"
                            component={Link as ElementType}
                            to={`/form/${ModelType.student}/${student.id}`}
                        >
                            <EditIcon fontSize="small" />
                        </IconButton>
                        <IconButton size="small" color="error" onClick={() => handleDelete(student.id)}>
                            <DeleteIcon fontSize="small" />
                        </IconButton>
                    </>
                }
            >
                <List component="nav" aria-label="grade">
                    <ListItem
                        secondaryAction={
                            <Typography variant="subtitle2" align="right">
                                {student.grade}
                            </Typography>
                        }
                    >
                        <ListItemIcon>
                            <SchoolIcon sx={{ fontSize: '1.3rem' }} />
                        </ListItemIcon>
                        <ListItemText
                            primary={
                                <Typography variant="subtitle1">
                                    <FormattedMessage id="grade" />
                                </Typography>
                            }
                        />
                    </ListItem>

                    <Divider />

                    <ListItem
                        secondaryAction={
                            <Typography variant="subtitle2" align="right">
                                {student.phone}
                            </Typography>
                        }
                    >
                        <ListItemIcon>
                            <PhonelinkRingTwoToneIcon sx={{ fontSize: '1.3rem' }} />
                        </ListItemIcon>
                        <ListItemText
                            primary={
                                <Typography variant="subtitle1">
                                    <FormattedMessage id="phone" />
                                </Typography>
                            }
                        />
                    </ListItem>
                </List>
            </SubCard>
        </Grid>
    );
};

const AssignmentCard = ({ assignments }: { assignments: Assignment[] }) => {
    const intl = useIntl();
    const [localAssignments, setLocalAssignments] = useState<Assignment[]>(assignments);

    useEffect(() => {
        setLocalAssignments(assignments);
    }, [assignments]);

    const handleDelete = async (id: number) => {
        await deleteRowById({
            model: ModelType.assignment,
            id,
            message: intl.formatMessage({ id: `success.delete.${ModelType.assignment}` })
        });

        setLocalAssignments((prev) => prev.filter((a) => a.id !== id));
    };

    return (
        <MainCard
            title={<FormattedMessage id={`${ModelType.assignment}_table`} />}
            sx={{ height: '100%' }}
            secondary={
                <IconButton size="medium" color="primary" component={Link as ElementType} to={`/form/${ModelType.assignment}/add`}>
                    <AddBoxIcon fontSize="medium" />
                </IconButton>
            }
        >
            <Grid container spacing={2}>
                {localAssignments.map((assignment) => (
                    <Grid key={assignment.id} size={{ xs: 12, sm: 6, md: 4 }}>
                        <SubCard contentSX={{ p: 2 }}>
                            <Typography variant="h3" color="textPrimary" sx={{ fontWeight: 'bold' }}>
                                {assignment.title}
                            </Typography>
                            <Divider sx={{ p: 1 }} />
                            <Typography variant="body2" color="textPrimary">
                                {assignment.detail}
                            </Typography>
                            <Grid container spacing={2} justifyContent="center" sx={{ mt: 0.2 }}>
                                <Grid size="auto">
                                    <IconButton size="small" color="error" onClick={() => handleDelete(assignment.id)}>
                                        <DeleteIcon fontSize="small" />
                                    </IconButton>
                                </Grid>
                                <Grid size="auto">
                                    <IconButton
                                        size="small"
                                        color="secondary"
                                        component={Link as ElementType}
                                        to={`/form/${ModelType.assignment}/${assignment.id}`}
                                    >
                                        <EditIcon fontSize="small" />
                                    </IconButton>
                                </Grid>
                            </Grid>
                        </SubCard>
                    </Grid>
                ))}
            </Grid>
        </MainCard>
    );
};

const StudentView = () => {
    const dispatch = useAppDispatch();
    const { id } = useParams() as { id: string };
    const students: Student[] = useAppSelector((state) => state.general.models[ModelType.student]);
    const [student, setStudent] = useState<Student | null>(array_obj_to_obj_with_key(students ?? [], Number(id), 'id') ?? null);
    const navigate = useNavigate();

    const fetchStudent = useCallback(async () => {
        try {
            const student: Student = (await fetchRowById({
                model: ModelType.student,
                id,
                relation: true
            })) as Student;

            setStudent(student);
            dispatch(
                setUserAndStudentId({
                    user_id: student.teacher_id,
                    student_id: student.id
                })
            );
        } catch {
            navigate('/error', { replace: true });
        }
    }, [id, dispatch, navigate]);

    useEffect(() => {
        void fetchStudent();
    }, [fetchStudent]);

    return (
        student && (
            <MainCard>
                <Grid container spacing={3}>
                    <StudentProfile student={student} />
                    <Grid size={{ xs: 12, md: 9 }}>
                        <AssignmentCard assignments={student.assignments} />
                    </Grid>
                </Grid>
            </MainCard>
        )
    );
};

export default StudentView;
