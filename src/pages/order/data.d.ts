export type TableListPagination = {
  total?: number;
  pageSize?: number;
  current?: number;
};

export type TableListItem = {
  name: string;
  orderId: string | number;
  id: number;
  sum?: number;
  paynum: number | string;
};

export type EditModalProps = {
  row?: T;
  actionRef: any;
  isOpen: boolean;
  handleModal: (params: boolean) => void;
};
