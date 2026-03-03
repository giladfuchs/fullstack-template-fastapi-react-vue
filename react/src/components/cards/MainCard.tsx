import { CSSProperties, forwardRef, ReactNode, Ref } from 'react';
import { useTheme, SxProps, Theme } from '@mui/material/styles';
import { Card, CardContent, CardHeader, Divider, Typography, CardProps, CardHeaderProps, CardContentProps } from '@mui/material';

const headerSX = { '& .MuiCardHeader-action': { mr: 0 } };

export interface MainCardProps extends Omit<CardProps, 'content' | 'title' | 'children' | 'sx'> {
    border?: boolean;
    boxShadow?: boolean;
    children: ReactNode | string;
    style?: CSSProperties;
    content?: boolean;
    className?: string;
    contentClass?: string;
    contentSX?: CardContentProps['sx'];
    darkTitle?: boolean;
    sx?: SxProps<Theme>; // you said this is always an object
    secondary?: CardHeaderProps['action'] | ReactNode;
    shadow?: string;
    elevation?: number;
    title?: ReactNode | string;
}

const MainCard = forwardRef<HTMLDivElement, MainCardProps>(function MainCard(
    {
        border = true,
        boxShadow,
        children,
        content = true,
        contentClass = '',
        contentSX = {},
        darkTitle,
        secondary,
        shadow,
        sx = {},
        title,
        ...others
    },
    ref: Ref<HTMLDivElement>
) {
    const theme = useTheme();

    const baseSx = {
        border: border ? '1px solid' : 'none',
        borderColor: theme.palette.mode === 'dark' ? theme.palette.background.default : theme.palette.primary[200] + 75,
        ':hover': {
            boxShadow: boxShadow
                ? shadow || (theme.palette.mode === 'dark' ? '0 2px 14px 0 rgb(33 150 243 / 10%)' : '0 2px 14px 0 rgb(32 40 45 / 8%)')
                : 'inherit'
        }
    };

    const mergedSx: SxProps<Theme> = { ...baseSx, ...(sx as object) };

    return (
        <Card ref={ref} {...others} sx={mergedSx}>
            {!darkTitle && title && <CardHeader sx={headerSX} title={title} action={secondary as ReactNode} />}
            {darkTitle && title && (
                <CardHeader sx={headerSX} title={<Typography variant="h3">{title}</Typography>} action={secondary as ReactNode} />
            )}
            {title && <Divider />}
            {content ? (
                <CardContent sx={contentSX} className={contentClass}>
                    {children}
                </CardContent>
            ) : (
                <>{children}</>
            )}
        </Card>
    );
});

export default MainCard;
