import _ from 'lodash';

export function activeAccordionItemIndex(accordionConfigs, currentPath) {
  return _.findIndex(accordionConfigs, (item) => {
    if (item.path === currentPath || item.path + '/' === currentPath) {
      return true;
    }

    if (
      _.findIndex(item?.children, (child) => {
        if (child.path === currentPath || child.path + '/' === currentPath) {
          return true;
        }

        return false;
      }) !== -1
    ) {
      return true;
    }

    return false;
  });
}
