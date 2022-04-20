import React from "react";
import {
    Edit,
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

const CouponsEdit = (props) => {
    return (
        <Edit {...props}>
            <SimpleForm>
                <TextInput label="Code" source="code" validate={[required()]} />
                <NumberInput label="Month Count" source="monthCount" validate={[required()]} />
                <NumberInput label="Discount Amount" source="discountAmount" validate={[required()]} />
                <BooleanInput label="Is Active?" source="isActive" validate={[required()]} />
                <DateInput label="Expire Date" source="expireDate" validate={[required()]} />
                <ReferenceInput label="Plan" source="planId" reference={RESOURCE_NAMES.PLANS} validate={[required()]}>
                    <SelectInput optionText="name" />
                </ReferenceInput>
            </SimpleForm>
        </Edit>
    );
}

export default CouponsEdit;
