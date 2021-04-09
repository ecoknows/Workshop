import {createStore, applyMiddleware, combineReducers} from 'redux';
import thunk from 'redux-thunk';
import {
  bottomDrawerReducer,
  drawerReducer,
} from './reducers/navigation.reducer';
import {userSignInReducer} from './reducers/user.reducer';
import {
  jobsListReducer,
  jobCreateReducer,
  jobsSelectReducer,
  jobsListAllReducer,
} from './reducers/jobs.reducer';
import {
  applicantsReducerType,
  selectedApplicantReducerType,
} from './reducers/applicants.reducer';

import {
  messagesReducerType,
  chatReducerType,
} from './reducers/messages.reducer';
import {
  notificationsReducerType,
  selectedNotificationsReducerType,
} from './reducers/notifications.reducer';
import {
  singleWorkersReducerType,
  workersReducerType,
} from './reducers/workers.reducer';
import {tasksReducerType} from './reducers/tasks.reducer';

const RootReducer = combineReducers({
  userDetails: userSignInReducer,
  drawerState: drawerReducer,
  bottomDrawerState: bottomDrawerReducer,

  applicantsState: applicantsReducerType,
  selectedApplicantState: selectedApplicantReducerType,

  workersState: workersReducerType,
  singleWorkerState: singleWorkersReducerType,
  taskState: tasksReducerType,

  messagesState: messagesReducerType,
  chatState: chatReducerType,

  notificationsState: notificationsReducerType,
  selectedNotificationState: selectedNotificationsReducerType,

  jobsListState: jobsListReducer,
  jobsAllListState: jobsListAllReducer,
  jobCreateState: jobCreateReducer,
  jobsSelectedState: jobsSelectReducer,
});

export type RootState = ReturnType<typeof RootReducer>;
const middleWare = applyMiddleware(thunk);
export const store = createStore(RootReducer, middleWare);
