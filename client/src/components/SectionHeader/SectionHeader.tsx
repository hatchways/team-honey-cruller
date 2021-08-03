import clsx from 'clsx';
import useStyles from './useStyles';
import { Grid, Typography } from '@material-ui/core';

interface Props {
    className?: string;
    title: string | JSX.Element;
    subtitle?: string | JSX.Element;
    label?: string;
    overline?: JSX.Element;
    ctaGroup?: Array<JSX.Element>;
    fadeUp?: boolean;
    align?: 'right' | 'left' | 'center';
    disableGutter?: boolean;
    titleClasses?: string;
    titleVariant?: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6';
    subtitleVariant?: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6' | 'subtitle1' | 'subtitle2' | 'body1' | 'body2';
    subtitleColor?: 'textPrimary' | 'textSecondary' | 'primary' | 'secondary';
    [x: string]: any;
}

const SectionHeader = ({
    title,
    titleVariant = 'h4',
    subtitleVariant,
    subtitle,
    subtitleColor,
    label,
    overline,
    fadeUp,
    align,
    ctaGroup,
    disableGutter,
    titleClasses,
    className
    }: Props): JSX.Element => {
    const classes = useStyles();
    let justifyGrid: ('center' | 'flex-start' | 'flex-end' | 'space-between' | 'space-around' | 'space-evenly' | undefined) = 'center';
    if (align === 'left') {
        justifyGrid = 'flex-start';
    } else if (align === 'right') {
        justifyGrid = 'flex-end';
    }

    return (
        <Grid
            container
            spacing={2}
            data-aos={fadeUp ? 'fade-up' : ''}
            className={clsx(
                'section-header',
                classes.root,
                disableGutter ? classes.disableGutter : {},
                className,
            )}
        >
            {overline && (
                <Grid
                    item
                    container
                    justify={justifyGrid}
                    xs={12}
                    className="section-header__overline-wrapper"
                >
                    {overline}
                </Grid>
            )}
            {label && (
                <Grid item xs={12} className="section-header__label-wrapper">
                    <Typography
                        variant="overline"
                        color="primary"
                        component="p"
                        align={align || 'center'}
                    >
                        {label}
                    </Typography>
                </Grid>
            )}
            <Grid item xs={12} className="section-header__title-wrapper">
                <Typography
                    variant={titleVariant}
                    align={align || 'center'}
                    className={clsx(
                        'section-header__title',
                        classes.title,
                        titleClasses ? titleClasses : {},
                    )}
                    color="textPrimary"
                >
                    {title}
                </Typography>
            </Grid>
            {subtitle && (
                <Grid item xs={12} className="section-header__subtitle-wrapper">
                    <Typography
                        variant={subtitleVariant || 'h6'}
                        align={align || 'center'}
                        color={subtitleColor || 'textSecondary'}
                        className="section-header__subtitle"
                    >
                        {subtitle}
                    </Typography>
                </Grid>
            )}
            {ctaGroup && ctaGroup.length && (
                <Grid item xs={12} className="section-header__cta-wrapper">
                    <Grid
                        container
                        justify={justifyGrid}
                        alignItems="center"
                        wrap="nowrap"
                        className="section-header__cta-container"
                    >
                        {ctaGroup.map((item, index) => (
                            <div
                                key={index}
                                className={clsx(
                                    'section-header__cta-item-wrapper',
                                    classes.cta,
                                )}
                            >
                                {item}
                            </div>
                        ))}
                    </Grid>
                </Grid>
            )}
        </Grid>
    );
};

export default SectionHeader;