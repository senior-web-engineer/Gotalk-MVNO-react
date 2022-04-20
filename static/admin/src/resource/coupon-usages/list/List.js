import React from "react";
import {
    List,
    Datagrid,
    TextField,
    SimpleList,
    DeleteButton,
} from "react-admin";
import { useMediaQuery } from "@material-ui/core";

const CouponUsagesList = (props, source, label) => {
    const isSmall = useMediaQuery((theme) => theme.breakpoints.down("sm"));

    return (
        <List
            {...props}
            title="Coupon Usages"
            bulkActionButtons={false}
        >
            {isSmall ? (
                <SimpleList
                    primaryText={(record) => record.user.name}
                    tertiaryText={(record) => record.coupon.code}
                />
            ) : (
                <Datagrid rowClick="show">
                    <TextField emptyText="missing" source="user.name" label="User Name" />
                    <TextField emptyText="missing" source="coupon.code" label="Coupon Code" />
                    <DeleteButton label="" />
                </Datagrid>
            )}
        </List>
    );
};
export default CouponUsagesList;
