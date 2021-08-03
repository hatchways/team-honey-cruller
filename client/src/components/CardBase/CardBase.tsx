import clsx from 'clsx';
import { Card, CardContent } from '@material-ui/core';
import useStyles from './useStyles';

interface Props {
    className?: string;
    children: JSX.Element;
    withShadow?: boolean;
    noShadow?: boolean;
    noBorder?: boolean;
    noBg?: boolean;
    liftUp?: boolean;
    align?: 'left' | 'right' | 'center';
    cardContentProps?: Record<string, unknown>;
    [x: string]: any;
}

const CardBase = ({
    withShadow,
    noShadow,
    noBorder,
    noBg,
    liftUp,
    children,
    align = 'center',
    className,
    cardContentProps = {},
    ...rest
}: Props): JSX.Element => {
    const classes = useStyles();

    return (
        <Card
            className={clsx(
                'card-base',
                classes.root,
                withShadow ? classes.withShadow : {},
                noShadow ? classes.noShadow : {},
                noBorder ? classes.noBorder : {},
                noBg ? classes.noBg : {},
                liftUp ? classes.liftUp : {},
                className,
            )}
            {...rest}
        >
            <CardContent
                className={clsx('card-base__content', classes.content, classes[align])}
                {...cardContentProps}
            >
                {children}
            </CardContent>
        </Card>
    );
};

export default CardBase;