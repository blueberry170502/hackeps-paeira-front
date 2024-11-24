import React from 'react';
import Svg, { Path } from 'react-native-svg';

interface IconProps {
  width: number;
  height: number;
  fill: string;
}

export const ChartIcon: React.FC<IconProps> = ({ width, height, fill }) => (
  <Svg width={width} height={height} viewBox="0 0 24 24" fill="none">
    <Path d="M18 20V10M12 20V4M6 20V14" stroke={fill} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
  </Svg>
);

export const MapIcon: React.FC<IconProps> = ({ width, height, fill }) => (
  <Svg width={width} height={height} viewBox="0 0 24 24" fill="none">
    <Path d="M1 6V22L8 18L16 22L23 18V2L16 6L8 2L1 6Z" stroke={fill} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    <Path d="M8 2V18" stroke={fill} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    <Path d="M16 6V22" stroke={fill} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
  </Svg>
);

export const BellIcon: React.FC<IconProps> = ({ width, height, fill }) => (
  <Svg width={width} height={height} viewBox="0 0 24 24" fill="none">
    <Path d="M18 8C18 6.4087 17.3679 4.88258 16.2426 3.75736C15.1174 2.63214 13.5913 2 12 2C10.4087 2 8.88258 2.63214 7.75736 3.75736C6.63214 4.88258 6 6.4087 6 8C6 15 3 17 3 17H21C21 17 18 15 18 8Z" stroke={fill} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    <Path d="M13.73 21C13.5542 21.3031 13.3019 21.5547 12.9982 21.7295C12.6946 21.9044 12.3504 21.9965 12 21.9965C11.6496 21.9965 11.3054 21.9044 11.0018 21.7295C10.6982 21.5547 10.4458 21.3031 10.27 21" stroke={fill} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
  </Svg>
);

export const BellSlashIcon: React.FC<IconProps> = ({ width, height, fill }) => (
  <Svg width={width} height={height} viewBox="0 0 24 24" fill="none">
    <Path d="M13.73 21C13.5542 21.3031 13.3019 21.5547 12.9982 21.7295C12.6946 21.9044 12.3504 21.9965 12 21.9965C11.6496 21.9965 11.3054 21.9044 11.0018 21.7295C10.6982 21.5547 10.4458 21.3031 10.27 21" stroke={fill} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    <Path d="M18 8C18 6.4087 17.3679 4.88258 16.2426 3.75736C15.1174 2.63214 13.5913 2 12 2C10.4087 2 8.88258 2.63214 7.75736 3.75736C6.63214 4.88258 6 6.4087 6 8C6 15 3 17 3 17H21" stroke={fill} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    <Path d="M1 1L23 23" stroke={fill} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
  </Svg>
);

export const BackIcon: React.FC<IconProps> = ({ width, height, fill }) => (
    <Svg width={width} height={height} viewBox="0 0 24 24" fill="none">
      <Path d="M19 12H5M12 19L5 12L12 5" stroke={fill} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    </Svg>
);