import clsx from 'clsx';
import NoSsr from '@material-ui/core/NoSsr';
import useStyles from './useStyles';

interface Props {
    className?: string;
    fontIconClass: string;
    size?: 'extraSmall' | 'small' | 'medium' | 'large';
    fontIconColor?: string;
    // All other props
    [x: string]: any;
}

const Icon = ({ fontIconClass, size = 'small', fontIconColor, className, ...rest }: Props): JSX.Element => {
    const classes = useStyles();

    return (
        <NoSsr>
            <i
                className={clsx(
                    'icon',
                    fontIconClass,
                    classes[size],
                    className,
                )}
                style={{ color: fontIconColor }}
                {...rest}
            />
        </NoSsr>
    );
};

export default Icon;
