import { useState } from 'react';
import AuthHeader from '../../components/AuthHeader/AuthHeader';
import { Box, Typography, Tabs, Tab } from '@material-ui/core';
import { loadStripe } from '@stripe/stripe-js';
import { Elements } from '@stripe/react-stripe-js';
import Payment from '../../components/Payment/Payment';
import PersonalInfo from '../../components/PersonalInfo/PersonalInfo';
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
  const classes = useStyles();

  const handleChange = (event: React.ChangeEvent<Record<string, unknown>>, val: number) => {
    setValue(val);
  };

  return (
    <>
      <AuthHeader linkTo="/create-contest" btnText="create contest" />
      <Box className={classes.root}>
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
          classes={{
            indicator: classes.indicator,
          }}
          onChange={handleChange}
          className={classes.tabs}
        >
          <Tab label="Profile" {...tabProps(0)} className={classes.label} />
          <Tab label="Personal Information" {...tabProps(1)} className={classes.label} />
          <div data-tour="payment">
            <Tab label="Payment Details" {...tabProps(2)} className={classes.label} />
          </div>
          <Tab label="Notification" {...tabProps(3)} className={classes.label} />
          <Tab label="Password" {...tabProps(4)} className={classes.label} />
        </Tabs>
        <TabPanel value={value} index={0}>
          Profile
        </TabPanel>
        <TabPanel value={value} index={1}>
          <PersonalInfo />
        </TabPanel>
        <TabPanel value={value} index={2}>
          <Typography className={classes.paymentDetails}>Payment Details</Typography>
          <Elements stripe={stripeKey}>
            <Payment />
          </Elements>
        </TabPanel>
        <TabPanel value={value} index={3}>
          <Notifications header={false} />
        </TabPanel>
        <TabPanel value={value} index={4}>
          Password
        </TabPanel>
      </Box>
    </>
  );
}
