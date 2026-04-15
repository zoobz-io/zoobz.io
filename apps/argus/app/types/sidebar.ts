export type SidebarOption = {
  label: string;
  path: string;
};

export type SidebarOptionGroup = {
  label: string;
  options: Link[];
  icon?: IconAlias;
};
