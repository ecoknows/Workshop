import {Dimensions} from 'react-native';

export const colors = {
  accent: '#F68025',
  peach: '#FFF0DA',
  gray: '#4F4F4F',
  blue: '#3488CC',
  yellow: '#939004',
  red: '#F43737',
  green: '#148D00',
};

export const font = {
  h1: 25,
};

export const size = {
  padding: 8,

  x_large: 300,
  large: 200,
  meduim: 120,
  small: 100,
};
export const tabs = {
  employerTabs: ['Messages', 'Workers', 'Applicants'],
  workerTabs: ['Employers', 'Messages', 'Applications'],
};
export const {width, height} = Dimensions.get('window');

export const jobsIcons = [
  {image: require('../assets/icons/profile/job_icons/icon_0.png')},
  {image: require('../assets/icons/profile/job_icons/icon_1.png')},
  {image: require('../assets/icons/profile/job_icons/icon_2.png')},
  {image: require('../assets/icons/profile/job_icons/icon_3.png')},
  {image: require('../assets/icons/profile/job_icons/icon_4.png')},
  {image: require('../assets/icons/profile/job_icons/icon_5.png')},
];
