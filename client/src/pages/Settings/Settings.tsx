import { useState } from 'react';
import { Box, Typography, Tabs, Tab } from '@material-ui/core';
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
    <div className={classes.root}>
      <Tabs
      orientation='vertical'
      variant='fullWidth'
      indicatorColor='primary'
      textColor='primary'
      value={value}
      onChange={handleChange}
      classes={{indicator: classes.indicator}}
      className={classes.tabs}>
        <Tab label='Profile' {...tabProps(0)} className={classes.tab} />
        <Tab label='Personal Information' {...tabProps(1)} className={classes.tab} />
        <Tab label='Payment Details' {...tabProps(2)} className={classes.tab} />
        <Tab label='Notification' {...tabProps(3)} className={classes.tab} />
        <Tab label='Password' {...tabProps(4)} className={classes.tab} />
      </Tabs>
      <TabPanel value={value} index={0}>
        Profile
      </TabPanel>
      <TabPanel value={value} index={1}>
        Personal Information
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
    </div>
  );
};
