import * as React from "react";
import {
    Show,
    SimpleShowLayout,
    TextField,
    TabbedShowLayout,
    Tab, DateField,
    Datagrid,
    ReferenceManyField, BooleanField
} from "react-admin";

const CouponsShow = (props) => {

    function renderUserName(record) {
        return `${record.User.firstName} ${record.User.lastName}`;
    }

    return (
        <Show {...props}>
            <TabbedShowLayout>
                <Tab label="Coupon">
                    <SimpleShowLayout>
                        <TextField emptyText="missing" source="code" label="Coupon Code" />
                        <BooleanField emptyText="missing" source="isActive" label="Is Active?" />
                        <TextField emptyText="missing" source="monthCount" label="Month Count" />
                        <TextField emptyText="missing" source="plan.name" label="Plan Name" />
                        <DateField
                            label="Expire Date"
                            source="expireDate"
                            emptyText="missing"
                        />
                        <DateField
                            label="Created At"
                            source="createdAt"
                            emptyText="missing"
                        />
                        <DateField
                            label="Updated At"
                            source="updatedAt"
                            emptyText="missing"
                        />
                    </SimpleShowLayout>
                </Tab>
                <Tab label="Coupon Usages">
                    <ReferenceManyField label="Coupon Usages" reference="couponUsages" target="couponId">
                        <Datagrid>
                            <TextField emptyText="missing" render={renderUserName} label="User"/>
                            <TextField emptyText="missing" source="usedMonthCount" label="Used Month Count" />
                            <DateField
                                label="Created At"
                                source="createdAt"
                                emptyText="missing"
                            />
                            <DateField
                                label="Updated At"
                                source="updatedAt"
                                emptyText="missing"
                            />
                        </Datagrid>
                    </ReferenceManyField>
                </Tab>
            </TabbedShowLayout>
        </Show>
    );
}

export default CouponsShow;
