export const handleStatus = (params: string | number): any => {
  switch (params) {
    case '-1':
      return 'default';
    case '5':
      return 'default';
    case '10':
      return 'error';
    case '40':
      return 'processing';
    case '50':
      return 'success';
  }
};
