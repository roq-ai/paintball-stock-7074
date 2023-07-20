import {
  FormControl,
  FormLabel,
  Input,
  Button,
  Text,
  Box,
  Spinner,
  FormErrorMessage,
  Switch,
  Flex,
} from '@chakra-ui/react';
import Breadcrumbs from 'components/breadcrumb';
import DatePicker from 'components/date-picker';
import { Error } from 'components/error';
import { FormWrapper } from 'components/form-wrapper';
import { NumberInput } from 'components/number-input';
import { SelectInput } from 'components/select-input';
import { AsyncSelect } from 'components/async-select';
import { TextInput } from 'components/text-input';
import AppLayout from 'layout/app-layout';
import { FormikHelpers, useFormik } from 'formik';
import { useRouter } from 'next/router';
import { FunctionComponent, useState } from 'react';
import * as yup from 'yup';
import { AccessOperationEnum, AccessServiceEnum, requireNextAuth, withAuthorization } from '@roq/nextjs';
import { compose } from 'lib/compose';

import { createSales } from 'apiSdk/sales';
import { salesValidationSchema } from 'validationSchema/sales';
import { StoreInterface } from 'interfaces/store';
import { getStores } from 'apiSdk/stores';
import { SalesInterface } from 'interfaces/sales';

function SalesCreatePage() {
  const router = useRouter();
  const [error, setError] = useState(null);

  const handleSubmit = async (values: SalesInterface, { resetForm }: FormikHelpers<any>) => {
    setError(null);
    try {
      await createSales(values);
      resetForm();
      router.push('/sales');
    } catch (error) {
      setError(error);
    }
  };

  const formik = useFormik<SalesInterface>({
    initialValues: {
      number_of_players: 0,
      paintballs_per_player: 0,
      store_id: (router.query.store_id as string) ?? null,
    },
    validationSchema: salesValidationSchema,
    onSubmit: handleSubmit,
    enableReinitialize: true,
    validateOnChange: false,
    validateOnBlur: false,
  });

  return (
    <AppLayout
      breadcrumbs={
        <Breadcrumbs
          items={[
            {
              label: 'Sales',
              link: '/sales',
            },
            {
              label: 'Create Sales',
              isCurrent: true,
            },
          ]}
        />
      }
    >
      <Box rounded="md">
        <Box mb={4}>
          <Text as="h1" fontSize={{ base: '1.5rem', md: '1.875rem' }} fontWeight="bold" color="base.content">
            Create Sales
          </Text>
        </Box>
        {error && (
          <Box mb={4}>
            <Error error={error} />
          </Box>
        )}
        <FormWrapper onSubmit={formik.handleSubmit}>
          <NumberInput
            label="Number Of Players"
            formControlProps={{
              id: 'number_of_players',
              isInvalid: !!formik.errors?.number_of_players,
            }}
            name="number_of_players"
            error={formik.errors?.number_of_players}
            value={formik.values?.number_of_players}
            onChange={(valueString, valueNumber) =>
              formik.setFieldValue('number_of_players', Number.isNaN(valueNumber) ? 0 : valueNumber)
            }
          />

          <NumberInput
            label="Paintballs Per Player"
            formControlProps={{
              id: 'paintballs_per_player',
              isInvalid: !!formik.errors?.paintballs_per_player,
            }}
            name="paintballs_per_player"
            error={formik.errors?.paintballs_per_player}
            value={formik.values?.paintballs_per_player}
            onChange={(valueString, valueNumber) =>
              formik.setFieldValue('paintballs_per_player', Number.isNaN(valueNumber) ? 0 : valueNumber)
            }
          />

          <AsyncSelect<StoreInterface>
            formik={formik}
            name={'store_id'}
            label={'Select Store'}
            placeholder={'Select Store'}
            fetcher={getStores}
            labelField={'name'}
          />
          <Flex justifyContent={'flex-start'}>
            <Button
              isDisabled={formik?.isSubmitting}
              bg="state.info.main"
              color="base.100"
              type="submit"
              display="flex"
              height="2.5rem"
              padding="0rem 1rem"
              justifyContent="center"
              alignItems="center"
              gap="0.5rem"
              mr="4"
              _hover={{
                bg: 'state.info.main',
                color: 'base.100',
              }}
            >
              Submit
            </Button>
            <Button
              bg="neutral.transparent"
              color="neutral.main"
              type="button"
              display="flex"
              height="2.5rem"
              padding="0rem 1rem"
              justifyContent="center"
              alignItems="center"
              gap="0.5rem"
              mr="4"
              onClick={() => router.push('/sales')}
              _hover={{
                bg: 'neutral.transparent',
                color: 'neutral.main',
              }}
            >
              Cancel
            </Button>
          </Flex>
        </FormWrapper>
      </Box>
    </AppLayout>
  );
}

export default compose(
  requireNextAuth({
    redirectTo: '/',
  }),
  withAuthorization({
    service: AccessServiceEnum.PROJECT,
    entity: 'sales',
    operation: AccessOperationEnum.CREATE,
  }),
)(SalesCreatePage);
