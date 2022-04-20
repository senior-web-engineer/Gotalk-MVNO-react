import React from "react";
import {
    List,
    Datagrid,
    TextField,
    SimpleList,
    BooleanField,
    DeleteButton,
    TopToolbar,
    CreateButton,
} from "react-admin";
import { useMediaQuery } from "@material-ui/core";

const CouponsList = (props, source, label) => {
    const isSmall = useMediaQuery((theme) => theme.breakpoints.down("sm"));

    const ActionsButton = (props) => (
        <TopToolbar>
            <CreateButton label="Create new" />
        </TopToolbar>
    );

    return (
        <List
            {...props}
            title="Coupons"
            actions={<ActionsButton />}
            bulkActionButtons={false}
        >
            {isSmall ? (
                <SimpleList
                    primaryText={(record) => record.code}
                    tertiaryText={(record) => record.isActive ? 'Active' : 'Not Active'}
                    linkType={(record) => record.monthCount}
                />
            ) : (
                <Datagrid rowClick="show">
                    <TextField emptyText="missing" source="code" label="Coupon Code" />
                    <BooleanField emptyText="missing" source="isActive" label="Is Active?" />
                    <TextField emptyText="missing" source="monthCount" label="Month Count" />
                    <TextField emptyText="missing" source="plan.name" label="Plan Name" />
                    <DeleteButton label="" />
                </Datagrid>
            )}
        </List>
    );
};
export default CouponsList;
