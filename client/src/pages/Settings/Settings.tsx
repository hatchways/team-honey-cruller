import { useState, Fragment } from 'react';
import { useHistory } from 'react-router-dom';
import AuthHeader from '../../components/AuthHeader/AuthHeader';
import { Box, Typography, Tabs, Tab, Button, Hidden, Drawer } from '@material-ui/core';
import { loadStripe } from '@stripe/stripe-js';
import { Elements } from '@stripe/react-stripe-js';
import TourContent from '../../components/TourContent/TourContent';
import Payment from '../../components/Payment/Payment';
import PersonalInfo from '../../components/PersonalInfo/PersonalInfo';
import Password from '../../components/Password/Password';
import Profile from '../Profile/Profile';
import Notifications from '../Notifications/Notifications';
import useStyles from './useStyles';

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}
const stripeKey = loadStripe(
  'pk_test_51JEJJrK3QVx74yV9vYujCrOpA8KwLKEE7uKSjHmUO0GGxUYSa5uxMlgaCZAbflwU9U0Npb2k4a86JEJBGmuBOfbw00CU3LpL8W',
);

function TabPanel(props: TabPanelProps) {
  const classes = useStyles();
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`tabpanel-${index}`}
      aria-labelledby={`tab-${index}`}
      {...other}
      className={classes.tabPanel}
      data-tour={value === 3 ? 'payment' : ''}
    >
      {value === index && (
        <Box p={2}>
          <Box>{children}</Box>
        </Box>
      )}
    </div>
  );
}

function tabProps(index: number) {
  return {
    id: `tab-${index}`,
    'aria-controls': `tabpanel-${index}`,
  };
}

export default function Settings(): JSX.Element {
  const [value, setValue] = useState<number>(0);
  const [expanded, setExpanded] = useState<boolean>(false);
  const classes = useStyles();
  const history = useHistory();

  const steps = [
    {
      selector: '[data-tour="settings"]',
      content: {
        words:
          "This is your settings page. You can add all of your personal information here as well as change your password. Don't forget to submit your payment information. If you want to create a contest with placeholder credit card information enter 4242-4242-4242-4242",
        theme: 'primary',
      },
      style: {
        padding: 20,
        minWidth: '40%',
        maxWidth: '80vw',
      },
    },
    {
      selector: '[data-tour="settings"]',
      content: {
        words:
          "This is your settings page. You can add all of your personal information here as well as change your password. Don't forget to submit your payment information. If you want to create a contest with placeholder credit card information enter 4242-4242-4242-4242",
        theme: 'primary',
      },
      style: {
        padding: 20,
        minWidth: '40%',
        maxWidth: '80vw',
      },
      action: () => history.push('/messages'),
    },
  ];

  const handleChange = (event: React.ChangeEvent<Record<string, unknown>>, val: number) => {
    setValue(val);
    setExpanded(false);
  };

  return (
    <>
      <AuthHeader linkTo="/create-contest" btnText="create contest" />
      <Box className={classes.root}>
        <Hidden smUp={true}>
          <Fragment>
            <Box display="flex" justifyContent="center" width="100%">
              <Button
                onClick={(): void => setExpanded(!expanded)}
                color="primary"
                size="large"
                variant="contained"
                className={classes.expandBtn}
              >
                Show Settings Tab
              </Button>
            </Box>
            <Drawer
              className={classes.drawer}
              anchor={'left'}
              open={expanded}
              onClose={(): void => setExpanded(!expanded)}
            >
              <div data-tour="settings">
                <Tabs
                  orientation="vertical"
                  indicatorColor="primary"
                  textColor="primary"
                  value={value}
                  TabIndicatorProps={{
                    style: {
                      height: 20,
                      marginTop: 15,
                    },
                  }}
                  onChange={handleChange}
                  classes={{
                    indicator: classes.indicator,
                  }}
                  className={classes.tabs}
                >
                  <Tab label="Personal Info" {...tabProps(0)} className={classes.label} />
                  <Tab label="Notification" {...tabProps(1)} className={classes.label} />
                  <Tab label="Payment Info" {...tabProps(2)} className={classes.label} />
                  <Tab label="Profile" {...tabProps(3)} className={classes.label} />
                  <Tab label="Password" {...tabProps(4)} className={classes.label} />
                </Tabs>
              </div>
            </Drawer>
          </Fragment>
        </Hidden>
        <Hidden xsDown={true}>
          <div data-tour="settings">
            <Tabs
              orientation="vertical"
              indicatorColor="primary"
              textColor="primary"
              value={value}
              TabIndicatorProps={{
                style: {
                  height: 20,
                  marginTop: 15,
                },
              }}
              onChange={handleChange}
              className={classes.tabs}
              classes={{
                indicator: classes.indicator,
              }}
            >
              <Tab label="Personal Info" {...tabProps(0)} className={classes.label} />
              <Tab label="Notification" {...tabProps(1)} className={classes.label} />
              <Tab label="Payment Info" {...tabProps(2)} className={classes.label}></Tab>
              <Tab label="Profile" {...tabProps(3)} className={classes.label} />
              <Tab label="Password" {...tabProps(4)} className={classes.label} />
            </Tabs>
          </div>
        </Hidden>
        <TabPanel value={value} index={0}>
          <Box display="flex" justifyContent="center">
            <PersonalInfo />
          </Box>
        </TabPanel>
        <TabPanel value={value} index={1}>
          <Notifications header={false} />
        </TabPanel>
        <TabPanel value={value} index={2}>
          <Typography className={classes.paymentDetails}>Payment Details</Typography>
          <Elements stripe={stripeKey}>
            <Box display="flex" justifyContent="center">
              <Payment />
            </Box>
          </Elements>
        </TabPanel>
        <TabPanel value={value} index={3}>
          <Profile header={false} />
        </TabPanel>
        <TabPanel value={value} index={4}>
          <Password />
        </TabPanel>
      </Box>
      <TourContent steps={steps} />
    </>
  );
}
