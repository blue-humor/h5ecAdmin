export type TableListPagination = {
  total?: number;
  pageSize?: number;
  current?: number;
};

export type TableListItem = {
  headimg: string;
  id: number;
};

export type EditModalProps = {
  isOpen: boolean;
  handleModal: (params: boolean) => void;
  row?: T;
};
