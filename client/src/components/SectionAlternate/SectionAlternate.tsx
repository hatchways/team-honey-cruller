import clsx from 'clsx';
import useStyles from './useStyles';

interface SectionAlternateProps {
    className?: string;
    children?: JSX.Element;
    innerNarrowed?: boolean;
    [x: string]: any;
}

const SectionAlternate = ({ children, innerNarrowed, className, ...rest }: SectionAlternateProps): JSX.Element => {
    const classes = useStyles();

    return (
        <section
            className={clsx('section-alternate', classes.root, className)}
            {...rest}
        >
            <div
                className={clsx(
                    'section-alternate__content',
                    classes.inner,
                    innerNarrowed ? classes.innerNarrowed : {},
                )}
            >
                {children}
            </div>
        </section>
    );
};

export default SectionAlternate;