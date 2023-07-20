import * as yup from 'yup';

export const salesValidationSchema = yup.object().shape({
  number_of_players: yup.number().integer().required(),
  paintballs_per_player: yup.number().integer().required(),
  store_id: yup.string().nullable(),
});
