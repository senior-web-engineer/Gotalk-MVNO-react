import {
  Edit,
  NumberInput,
  required,
  SelectInput,
  SimpleForm,
  TextInput,
} from "react-admin";

const PlansWholesalesEdit = (props) => {
  return (
    <Edit {...props}>
      <SimpleForm>
        <TextInput label="Name" source="planName" validate={[required()]} />
        <SelectInput
          label="Type"
          choices={[
            {
              id: "Voice/MB/SMS",
              name: "Voice/MB/SMS",
            },
          ]}
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
    </Edit>
  );
};

export default PlansWholesalesEdit;
