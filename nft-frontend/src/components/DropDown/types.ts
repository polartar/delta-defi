export interface ItemProps {
  id: number | string,
  title: string
}

export interface DropDownProps {
  selectedItem: any;
  itemList: Array<ItemProps>;
  handleClick: any;
}
