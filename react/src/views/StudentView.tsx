import { useEffect, useState } from 'react';
import { FormattedMessage, useIntl } from 'react-intl';
import MainCard from 'ui-component/cards/MainCard';
import SubCard from 'ui-component/cards/SubCard';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import {
    Divider,
    Grid,
    IconButton,
    List,
    ListItemButton,
    ListItemIcon,
    ListItemSecondaryAction,
    ListItemText,
    Typography
} from '@mui/material';
import SchoolIcon from '@mui/icons-material/School';
import AddBoxIcon from '@mui/icons-material/AddBox';
import PhonelinkRingTwoToneIcon from '@mui/icons-material/PhonelinkRingTwoTone';

import { Assignment, DefaultRootStateProps, ModelType, Student } from '../types';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { deleteRowById, setAssignments, setUserAndStudentId } from '../store/generalSlice';
import { AppDispatch } from 'store';
import API from '../utils/axios';
import { array_obj_to_obj_with_key } from '../utils/transformation';

const StudentProfile = ({ student }: { student: Student }) => {
    const intl = useIntl();
    const dispatch = useDispatch<AppDispatch>(); // use your typed dispatch
    const navigate = useNavigate();

    const handleDelete = async (id: number) => {
        try {
            await dispatch(
                deleteRowById({
                    model: ModelType.student,
                    id,
                    message: intl.formatMessage({ id: `success.delete.${ModelType.student}` })
                })
            ).unwrap();
            console.log('Assignment deleted successfully');
            navigate(`/${ModelType.student}`);
        } catch (error) {
            console.error('Failed to delete assignment', error);
        }
    };
    return (
        <Grid item lg={3} xs={12}>
            <SubCard
                title={
                    <Grid container spacing={2} alignItems="center">
                        <Grid item xs zeroMinWidth>
                            <Typography align="left" variant="subtitle1">
                                {student.name}
                            </Typography>
                        </Grid>
                    </Grid>
                }
                secondary={
                    <>
                        <IconButton size="small" color="secondary" component={Link} to={`/form/${ModelType.student}/${student.id}`}>
                            <EditIcon fontSize="small" />
                        </IconButton>
                        <IconButton size="small" color="error" onClick={() => handleDelete(student.id)}>
                            <DeleteIcon fontSize="small" />
                        </IconButton>
                    </>
                }
            >
                <List component="nav" aria-label="grade">
                    <ListItemButton>
                        <ListItemIcon>
                            <SchoolIcon sx={{ fontSize: '1.3rem' }} />
                        </ListItemIcon>
                        <ListItemText primary={<Typography variant="subtitle1">Grade</Typography>} />
                        <ListItemSecondaryAction>
                            <Typography variant="subtitle2" align="right">
                                {student.grade}
                            </Typography>
                        </ListItemSecondaryAction>
                    </ListItemButton>
                    <Divider />
                    <ListItemButton>
                        <ListItemIcon>
                            <PhonelinkRingTwoToneIcon sx={{ fontSize: '1.3rem' }} />
                        </ListItemIcon>
                        <ListItemText primary={<Typography variant="subtitle1">Phone</Typography>} />
                        <ListItemSecondaryAction>
                            <Typography variant="subtitle2" align="right">
                                {student.phone}
                            </Typography>
                        </ListItemSecondaryAction>
                    </ListItemButton>
                </List>
            </SubCard>
        </Grid>
    );
};

const AssignmentCard = ({ assignments }: { assignments: Assignment[] }) => {
    const intl = useIntl();
    const dispatch = useDispatch<AppDispatch>();
    const [localAssignments, setLocalAssignments] = useState<Assignment[]>(assignments);

    useEffect(() => {
        setLocalAssignments(assignments);
    }, [assignments]);

    const handleDelete = async (id: number) => {
        try {
            await dispatch(
                deleteRowById({
                    model: ModelType.assignment,
                    id,
                    message: intl.formatMessage({ id: `success.delete.${ModelType.assignment}` })
                })
            ).unwrap();
            setLocalAssignments(localAssignments.filter((assignment) => assignment.id !== id));
        } catch (error) {
            console.error('Failed to delete assignment', error);
        }
    };
    return (
        <MainCard
            title={<FormattedMessage id={`${ModelType.assignment}_table`} />}
            sx={{ height: '100%' }}
            secondary={
                <IconButton size="medium" color="primary" component={Link} to={`/form/${ModelType.assignment}/add`}>
                    <AddBoxIcon fontSize="medium" />
                </IconButton>
            }
        >
            <Grid container spacing={2}>
                {localAssignments.map((assignment: Assignment) => (
                    <Grid item xs={12} sm={6} md={4} key={assignment.id}>
                        <SubCard contentSX={{ p: 2 }}>
                            <Typography variant="h3" color="textPrimary" sx={{ fontWeight: 'bold' }}>
                                {assignment.title}
                            </Typography>
                            <Divider sx={{ p: 1 }} />
                            <Typography variant="body2" color="textPrimary">
                                {assignment.detail}
                            </Typography>
                            <Grid container spacing={2} justifyContent="center" sx={{ mt: 0.2 }}>
                                <Grid item>
                                    <IconButton size="small" color="error" onClick={() => handleDelete(assignment.id)}>
                                        <DeleteIcon fontSize="small" />
                                    </IconButton>
                                </Grid>
                                <Grid item>
                                    <IconButton
                                        size="small"
                                        color="secondary"
                                        component={Link}
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
    const dispatch = useDispatch();
    const { id } = useParams() as { id: string };
    const students = useSelector((state: DefaultRootStateProps) => state.general.models[ModelType.student]);
    const [student, setStudent] = useState<Student | null>(array_obj_to_obj_with_key(students ?? [], Number(id), 'id') ?? null);

    useEffect(() => {
        const fetchStudent = async () => {
            const response = await API.post(`/${ModelType.student}`, {
                query: [{ key: 'id', value: Number(id), opt: 'eq' }],
                relation_model: true
            });
            const student_obj = response.data?.[0];
            if (student_obj) {
                setStudent(student_obj);
                dispatch(setAssignments(student_obj.assignments ?? []));
                dispatch(
                    setUserAndStudentId({
                        user_id: student_obj.teacher_id,
                        student_id: student_obj.id
                    })
                );
            }
        };

        fetchStudent().catch((err) => {
            console.error('Failed to fetch student', err);
        });
    }, [id, dispatch]);

    return (
        student && (
            <MainCard>
                <Grid container spacing={3}>
                    <StudentProfile student={student} />
                    <Grid item xs={12} md={9}>
                        <AssignmentCard assignments={student.assignments} />
                    </Grid>
                </Grid>
            </MainCard>
        )
    );
};

export default StudentView;
