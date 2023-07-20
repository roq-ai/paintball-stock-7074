interface AppConfigInterface {
  ownerRoles: string[];
  customerRoles: string[];
  tenantRoles: string[];
  tenantName: string;
  applicationName: string;
  addOns: string[];
}
export const appConfig: AppConfigInterface = {
  ownerRoles: ['Store Manager'],
  customerRoles: [],
  tenantRoles: ['Inventory Manager', 'Sales Associate', 'Store Manager'],
  tenantName: 'Store',
  applicationName: 'PAINTBALL STOCK MANAGEMENT ',
  addOns: [],
};
