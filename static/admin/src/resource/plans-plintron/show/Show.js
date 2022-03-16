import * as React from "react";
import {
  Show,
  SimpleShowLayout,
  TextField,
  BooleanField,
  NumberField,
} from "react-admin";

const PlansPlintronShow = (props) => (
  <Show {...props}>
    <SimpleShowLayout>
      <TextField source="id" />
      <TextField source="name" />
      <NumberField source="costPerMonth" label="Price plan first month" />
      <TextField source="minuteCount" label="Minute Count" />
      <TextField source="SMSCount" label="SMS Count" />
      <TextField source="internetFormatted" label="Internet Count" />
      <TextField source="expiry" label="Expiry" />
      <BooleanField source="autoRenewal" />
      <BooleanField source="midcycleRateChange" />
    </SimpleShowLayout>
  </Show>
);

export default PlansPlintronShow;
