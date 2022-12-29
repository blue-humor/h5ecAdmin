export type TableListPagination = {
  total?: number;
  pageSize?: number;
  current?: number;
};

export type TableListItem = {
  name: string;
  id: number;
  teamLogo: string;
  teamName: string;
};

export type EditModalProps = {
  isOpen: boolean;
  handleModal: (params: boolean) => void;
  row?: T;
  actionRef: any;
};
