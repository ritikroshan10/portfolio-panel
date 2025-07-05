import * as FaIcons from 'react-icons/fa';
import * as SiIcons from 'react-icons/si';
import * as MdIcons from 'react-icons/md';
import * as TbIcons from 'react-icons/tb';

const allIcons = {
  ...FaIcons,
  ...SiIcons,
  ...MdIcons,
  ...TbIcons,
};

export const getDynamicIcon = (iconName) => {
  return allIcons[iconName] || null;
};
