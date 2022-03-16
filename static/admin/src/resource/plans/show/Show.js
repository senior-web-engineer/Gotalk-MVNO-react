import * as React from "react";
import {
  Show,
  SimpleShowLayout,
  TextField,
  BooleanField,
  RichTextField,
} from "react-admin";

const PlansShow = (props) => (
  <Show {...props}>
    <SimpleShowLayout>
      <TextField emptyText="missing" source="name" label="Plan name" />
      <TextField emptyText="missing" source="SMSCount" label="SMS Count" />
      <TextField
        emptyText="missing"
        source="internetFormatted"
        label="Internet Count"
      />
      <TextField
        emptyText="missing"
        source="minuteCount"
        label="Minute Count"
      />
      <TextField emptyText="missing" source="costBuyPlan" label="Price plan" />
      <BooleanField source="isCompany" label="Company" />
      <RichTextField source="description" />
      <RichTextField source="props.info" label="List" />
    </SimpleShowLayout>
  </Show>
);

export default PlansShow;
