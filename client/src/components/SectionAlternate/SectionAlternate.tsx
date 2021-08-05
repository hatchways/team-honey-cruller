import clsx from 'clsx';
import useStyles from './useStyles';

interface Props {
    className?: string;
    children?: JSX.Element;
    innerNarrowed?: boolean;
}

const SectionAlternate = ({ children, innerNarrowed, className }: Props): JSX.Element => {
    const classes = useStyles();

    return (
        <section
            className={clsx('section-alternate', classes.root, className)}
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