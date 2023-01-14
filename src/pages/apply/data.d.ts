export type TableListPagination = {
  total?: number;
  pageSize?: number;
  current?: number;
};

export type TableListItem = {
  teamLogo: string | undefined;
  teamName: string | string[] | null;
  intro: string;
  id: number;
  thumb: any;
  title: string;
  status: string;
  thumbList: any;
};

export type EditModalProps = {
  isOpen: boolean;
  handleModal: (params: boolean) => void;
  row?: T;
  actionRef: any;
};
