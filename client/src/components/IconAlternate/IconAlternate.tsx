import clsx from 'clsx';
import { Avatar } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import useStyles from './useStyles';
import Icon from '../Icon/Icon'

interface Props {

    className?: string;

    fontIconClass: string;

    size?: 'extraSmall' | 'small' | 'medium' | 'large';
    color?: any;

    shape?: 'circle' | 'square';

    iconProps?: Record<string, unknown>;
    [x: string]: any;
}


const IconAlternate = ({
    iconProps,
    fontIconClass,
    size = 'medium',
    color = [],
    shape = 'square',
    className,
    ...rest
}: Props): JSX.Element => {
    const classes = useStyles();
    const useBackgroundStyles = makeStyles(() => ({
        background: {
            background: color[50],
        },
    }));
    const backgroundClasses = useBackgroundStyles();

    return (
        <Avatar
            className={clsx(
                'icon-alternate',
                classes[size],
                classes[shape],
                backgroundClasses.background,
                className,
            )}
            {...rest}
        >
            <Icon
                size={size}
                fontIconClass={fontIconClass}
                fontIconColor={color[500]}
                className="icon-alternate__icon"
                {...iconProps}
            />
        </Avatar>
    );
};

export default IconAlternate;