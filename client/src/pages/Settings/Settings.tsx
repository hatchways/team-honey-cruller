import { useState } from 'react';
import { Box, Typography, Tabs, Tab } from '@material-ui/core';
import PersonalInfo from '../../components/PersonalInfo/PersonalInfo';
import useStyles from "./useStyles";

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

function TabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`tabpanel-${index}`}
      aria-labelledby={`tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box p={3}>
          <Typography>{children}</Typography>
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
    <Box className={classes.root}>
      <Tabs
      orientation='vertical'
      indicatorColor='primary'
      textColor='primary'
      value={value}
      TabIndicatorProps={{
        style: {
          height: 20,
          marginTop: 15,
        }
      }}
      classes={{
        indicator: classes.indicator,
      }}
      onChange={handleChange}
      className={classes.tabs}>
        <Tab label='Profile' {...tabProps(0)} className={classes.label} />
        <Tab label='Personal Information' {...tabProps(1)} className={classes.label} />
        <Tab label='Payment Details' {...tabProps(2)} className={classes.label} />
        <Tab label='Notification' {...tabProps(3)} className={classes.label} />
        <Tab label='Password' {...tabProps(4)} className={classes.label} />
      </Tabs>
      <TabPanel value={value} index={0}>
        Profile
      </TabPanel>
      <TabPanel value={value} index={1}>
        <PersonalInfo />
      </TabPanel>
      <TabPanel value={value} index={2}>
        Payment Details
      </TabPanel>
      <TabPanel value={value} index={3}>
        Notification
      </TabPanel>
      <TabPanel value={value} index={4}>
        Password
      </TabPanel>
    </Box>
  );
};
