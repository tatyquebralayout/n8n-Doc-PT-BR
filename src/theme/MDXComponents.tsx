import React from 'react';
import MDXComponents from '@theme-original/MDXComponents';
import { Icon } from '@iconify/react';
import ReactBitsDemo from '@site/src/components/ReactBitsDemo';
import SvgIcon from '@site/src/components/SvgIcon';
import IonicIcon from '@site/src/components/IonicIcon';

export default {
  ...MDXComponents,
  Icon: Icon,
  SvgIcon,
  ReactBitsDemo,
  IonicIcon,
}; 