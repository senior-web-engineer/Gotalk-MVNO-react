import React from "react";
import {
  AutocompleteArrayInput,
  Create,
  NullableBooleanInput,
  NumberInput,
  required,
  SimpleForm,
  TextInput,
} from "react-admin";

const PlansCreate = (props) => {
  const planDescriptionChoices = [
    {
      id: "Full management for you and your staff",
      name: "Full management for you and your staff",
    },
    { id: "3FA account safety", name: "3FA account safety" },
    { id: "Data privacy", name: "Data privacy" },
    { id: "Yubikey support", name: "Yubikey support" },
    {
      id: "Dedicated business account manager",
      name: "Dedicated business account manager",
    },
    {
      id: "Hardware support and discounts",
      name: "Hardware support and discounts",
    },
  ];

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
          label="Cost by plan"
          source="costBuyPlan"
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
        <NullableBooleanInput
          label="Is it Business plan?"
          source="isCompany"
          validate={[required()]}
        />
        <NullableBooleanInput
          label="Is hotspot?"
          source="hotspot"
          validate={[required()]}
        />
        <TextInput
          multiline={true}
          label="Description"
          source="description"
          allowNull={true}
        />
        <AutocompleteArrayInput
          source="props"
          choices={planDescriptionChoices}
          label="Plan description"
          allowEmpty={true}
        />
      </SimpleForm>
    </Create>
  );
};

export default PlansCreate;
