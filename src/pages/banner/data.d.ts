export type TableListPagination = {
  total?: number;
  pageSize?: number;
  current?: number;
};

export type TableListItem = {
  fileName: string;
  id: number;
  row?: any;
  fileUrl: any;
};

export type EditModalProps = {
  isOpen: boolean;
  handleModal: (params: boolean) => void;
  row?: T;
  actionRef?: any;
};
