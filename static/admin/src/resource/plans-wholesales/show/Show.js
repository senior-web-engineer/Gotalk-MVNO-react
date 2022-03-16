import * as React from 'react';
import {
  Show,
  SimpleShowLayout,
  TextField,
  NumberField,
  DateField,
} from 'react-admin';

const PlansWholesalesShow = (props) => (
  <Show {...props}>
    <SimpleShowLayout>
      <TextField source="id" />
      <TextField source="planName" />
      <TextField source="planType" />
      <NumberField source="unitCap" />
      <NumberField source="overage" />
      <TextField source="WPS" />
      <DateField source="createdAt" />
      <DateField source="updatedAt" />
    </SimpleShowLayout>
  </Show>
);

export default PlansWholesalesShow;
