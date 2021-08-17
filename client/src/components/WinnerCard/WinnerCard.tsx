import clsx from 'clsx';
import { Typography } from '@material-ui/core';
import Image from '../Image/Image';
import useStyles from './useStyles'


interface ViewComponentProps {
  className?: string;
  data?: any;
}

const WinnerCard = ({ data, className, ...rest }: ViewComponentProps): JSX.Element => {
    const classes = useStyles();

    const half = Math.ceil(data.length / 2);

    const leftGridData = data.slice(0, half);
    const rightGridData = data.slice(-half);

    return (
        <div className={clsx(classes.root, className)} {...rest}>
            <div className={classes.grid}>
                <div className={classes.leftGrid}>
                    {leftGridData.map((item: any, index: number) => (
                      <div className={classes.folioItem} key={index} data-aos="fade-up">
                          {console.log(item)}
                            <Image
                                src={item.winningPic}
                                alt={item.title}
                                className={clsx('folio__image', classes.image)}
                                lazy={false}
                            />
                            <div className={classes.folioInfoWrapper}>
                                <div>
                                    <Typography variant="h6" className={classes.folioTitle}>
                                        {item.title}
                                    </Typography>
                                    <Typography
                                        variant="subtitle1"
                                        className={classes.folioSubtitle}
                                    >
                                        {item.description}
                                    </Typography>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
                <div className={classes.rightGrid}>
                    {rightGridData.map((item: any, index: number) => (
                        <div className={classes.folioItem} key={index} data-aos="fade-up">
                            <Image
                                src={item.winningPic}
                                alt={item.title}
                                className={clsx('folio__image', classes.image)}
                                lazy={false}
                            />
                            <div className={classes.folioInfoWrapper}>
                                <div>
                                    <Typography variant="h6" className={classes.folioTitle}>
                                        {item.title}
                                    </Typography>
                                    <Typography
                                        variant="subtitle1"
                                        className={classes.folioSubtitle}
                                    >
                                        {item.description}
                                    </Typography>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default WinnerCard;
