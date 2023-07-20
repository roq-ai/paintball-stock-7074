import * as yup from 'yup';

export const inventoryValidationSchema = yup.object().shape({
  paintballs_in_stock: yup.number().integer().required(),
  paintballs_used: yup.number().integer().required(),
  store_id: yup.string().nullable(),
});
