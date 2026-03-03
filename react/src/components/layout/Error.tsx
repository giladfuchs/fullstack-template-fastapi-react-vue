import { Link } from 'react-router-dom';

import { useTheme, styled } from '@mui/material/styles';
import { Button, Card, CardContent, CardMedia, Grid, Typography } from '@mui/material';

import config from '@/lib/utils/config';

import HomeTwoToneIcon from '@mui/icons-material/HomeTwoTone';

import imageBackground from '../../assets/images/maintenance/img-error-bg.svg';
import imageDarkBackground from '../../assets/images/maintenance/img-error-bg-dark.svg';
import imageBlue from '../../assets/images/maintenance/img-error-blue.svg';
import imageText from '../../assets/images/maintenance/img-error-text.svg';
import imagePurple from '../../assets/images/maintenance/img-error-purple.svg';

const CardMediaWrapper = styled('div')({
    maxWidth: 720,
    margin: '0 auto',
    position: 'relative'
});

const ErrorWrapper = styled('div')({
    maxWidth: 350,
    margin: '0 auto',
    textAlign: 'center'
});

const ErrorCard = styled(Card)({
    minHeight: '100vh',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center'
});

const CardMediaBlock = styled('img')({
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    animation: '3s bounce ease-in-out infinite'
});

const CardMediaBlue = styled('img')({
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    animation: '15s wings ease-in-out infinite'
});

const CardMediaPurple = styled('img')({
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    animation: '12s wings ease-in-out infinite'
});

const Error = () => {
    const theme = useTheme();

    return (
        <ErrorCard>
            <CardContent>
                <Grid container justifyContent="center">
                    <Grid size={12}>
                        <CardMediaWrapper>
                            <CardMedia
                                component="img"
                                image={theme.palette.mode === 'dark' ? imageDarkBackground : imageBackground}
                                title="Slider5 image"
                            />
                            <CardMediaBlock src={imageText} title="Slider 1 image" />
                            <CardMediaBlue src={imageBlue} title="Slider 2 image" />
                            <CardMediaPurple src={imagePurple} title="Slider 3 image" />
                        </CardMediaWrapper>
                    </Grid>
                    <Grid size={12}>
                        <ErrorWrapper>
                            <Grid container gap={2}>
                                <Grid size={12}>
                                    <Typography variant="h1" component="div">
                                        Something is wrong
                                    </Typography>
                                </Grid>
                                <Grid size={12}>
                                    <Typography variant="body2">
                                        The page you are looking was moved, removed, renamed, or might never exist!{' '}
                                    </Typography>
                                </Grid>
                                <Grid size={12}>
                                    <Button variant="contained" size="large" component={Link} to={config.defaultPath}>
                                        <HomeTwoToneIcon sx={{ fontSize: '1.3rem', mr: 0.75 }} /> Home
                                    </Button>
                                </Grid>
                            </Grid>
                        </ErrorWrapper>
                    </Grid>
                </Grid>
            </CardContent>
        </ErrorCard>
    );
};

export default Error;
