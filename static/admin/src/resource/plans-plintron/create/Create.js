import {
  Create,
  NullableBooleanInput,
  NumberInput,
  required,
  SimpleForm,
  TextInput,
} from "react-admin";

const PlansPlintronCreate = (props) => {
  return (
    <Create {...props}>
      <SimpleForm>
        <TextInput label="Name" source="name" validate={[required()]} />
        <NumberInput
          label="Cost per month"
          source="costPerMonth"
          validate={[required()]}
        />
        <NumberInput
          label="Minute count"
          source="minuteCount"
          validate={[required()]}
        />
        <NumberInput
          label="SMS count"
          source="SMSCount"
          validate={[required()]}
        />
        <NumberInput
          label="Internet count"
          source="internetCount"
          validate={[required()]}
        />
        <TextInput label="Expiry" source="expiry" validate={[required()]} />
        <NumberInput label="Plan ID" source="planId" validate={[required()]} />
        <NullableBooleanInput
          label="Auto renewal"
          source="autoRenewal"
          validate={[required()]}
        />
        <NullableBooleanInput
          label="Midcycle rate change"
          source="midcycleRateChange"
          validate={[required()]}
        />
      </SimpleForm>
    </Create>
  );
};

export default PlansPlintronCreate;
