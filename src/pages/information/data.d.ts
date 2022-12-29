export type TableListPagination = {
  total?: number;
  pageSize?: number;
  current?: number;
};

export type TableListItem = {
  title: string;
  thumb: any;
  type: string;
  video: any;
  content: string;
  id: number;
};

export type EditModalProps = {
  isOpen: boolean;
  activeKey: string;
  handleModal: (params: boolean) => void;
  row?: T;
  actionRef: actionRef;
};
