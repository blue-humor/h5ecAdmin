export type TableListPagination = {
  total?: number;
  pageSize?: number;
  current?: number;
};

export type TableListItem = {
  name: string;
  id: number;
  actionRef: any;
};

export type EditModalProps = {
  row?: T;
  actionRef: any;
  isOpen: boolean;
  handleModal: (params: boolean) => void;
};
