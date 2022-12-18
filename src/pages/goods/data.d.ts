export type TableListPagination = {
  total?: number;
  pageSize?: number;
  current?: number;
};

export type TableListItem = {
  thumb: string;
  id: number;
  title: string;
  soldNum: string | number;
  price: string | number;
  originPrice: string | number;
};

export type EditProps = {
  isOpen: boolean;
  handleModal: (params: boolean) => void;
  row?: T;
  actionRef: any;
};

export type Option = {
  value: string | number;
  label: string;
  children?: Option[];
};
