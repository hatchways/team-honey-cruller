import clsx from 'clsx';
import useStyles from './useStyles';
import Section from '../../Section/Section';
import Divider from '@material-ui/core/Divider'

interface HeroShapedProps {
    className?: string;
    rightSide: JSX.Element;
    leftSide: JSX.Element;
    [x: string]: any;
}

const HeroShaped = ({ leftSide, rightSide, className, ...rest }: HeroShapedProps): JSX.Element => {
    const classes = useStyles();
    return (
        <div className={clsx(classes.root, 'hero-shaped', className)} {...rest}>
            <div className={clsx('hero-shaped__wrapper', classes.hero)}>
                <Section
                    className={clsx('hero-shaped__left-side', classes.heroLeftSide)}
                >
                    {leftSide}
                </Section>
                <div className={clsx('hero-shaped__right-side', classes.heroRightSide)}>
                    <div className={clsx('hero-shaped__cover', classes.heroCover)}>
                        <div
                            className={clsx(
                                'hero-shaped__image-container',
                                classes.heroImageContainer,
                            )}
                        >
                            <div className={clsx('hero-shaped__image', classes.heroImage)}>
                                {rightSide}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <Divider />
        </div>
    );
};

export default HeroShaped;
