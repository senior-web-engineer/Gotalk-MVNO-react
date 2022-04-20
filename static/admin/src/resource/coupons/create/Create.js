import React from "react";
import {
    Create,
    NumberInput,
    required,
    SimpleForm,
    TextInput,
    BooleanInput,
    DateInput,
    ReferenceInput,
    SelectInput
} from "react-admin";
import RESOURCE_NAMES from "../../resource-names";

const CouponsCreate = (props) => {
    return (
        <Create {...props}>
            <SimpleForm>
                <TextInput label="Code" source="code" validate={[required()]} />
                <NumberInput label="Month Count" source="monthCount" validate={[required()]} />
                <BooleanInput label="Is Active?" source="isActive" validate={[required()]} />
                <DateInput label="Expire Date" source="expireDate" validate={[required()]} />
                <ReferenceInput label="Plan" source="plan.id" reference={RESOURCE_NAMES.PLANS} validate={[required()]}>
                    <SelectInput optionText="name" />
                </ReferenceInput>
            </SimpleForm>
        </Create>
    );
}

export default CouponsCreate;
