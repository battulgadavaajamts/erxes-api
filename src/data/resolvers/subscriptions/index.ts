import activityLogs from './activityLogs';
import checklists from './checklists';
import conversations from './conversations';
import customers from './customers';
import deals from './deals';
import importHistory from './importHistory';
import notifications from './notifications';
import robot from './robot';

let subscriptions: any = {
  ...conversations,
  ...customers,
  ...activityLogs,
  ...importHistory,
  ...notifications,
  ...robot,
  ...deals,
  ...checklists,
};

const { NODE_ENV } = process.env;

// disable subscriptions in test mode
if (NODE_ENV === 'test') {
  subscriptions = {};
}

export default subscriptions;
