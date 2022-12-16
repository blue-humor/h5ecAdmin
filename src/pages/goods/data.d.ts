export type TableListPagination = {
  total?: number;
  pageSize?: number;
  current?: number;
};

export type TableListItem = {
  name: string;
  id: number;
  teamLogo: thumb;
  render: any;
};

export type EditProps = {
  isOpen: boolean;
  handleModal: (params: boolean) => void;
  row?: T;
  actionRef: any;
};
