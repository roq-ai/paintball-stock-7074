const mapping: Record<string, string> = {
  inventories: 'inventory',
  sales: 'sales',
  stores: 'store',
  users: 'user',
};

export function convertRouteToEntityUtil(route: string) {
  return mapping[route] || route;
}
