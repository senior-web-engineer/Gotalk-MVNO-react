import {
  Create,
  NumberInput,
  required,
  SelectInput,
  SimpleForm,
  TextInput,
} from "react-admin";

const PlansWholesalesCreate = (props) => {
  const planType = [
    {
      id: "Voice/MB/SMS",
      name: "Voice/MB/SMS",
    },
  ];

  return (
    <Create {...props}>
      <SimpleForm>
        <TextInput label="Name" source="planName" validate={[required()]} />
        <SelectInput
          label="Type"
          choices={planType}
          source="planType"
          validate={[required()]}
        />
        <NumberInput
          label="Unit Cap"
          source="unitCap"
          min="0"
          step="500"
          validate={[required()]}
        />
        <NumberInput label="Overage" source="overage" validate={[required()]} />
        <TextInput label="WPS" source="WPS" validate={[required()]} />
      </SimpleForm>
    </Create>
  );
};

export default PlansWholesalesCreate;
