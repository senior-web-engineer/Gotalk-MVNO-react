import React from "react";
import {
  List,
  Datagrid,
  TextField,
  SimpleList,
  NumberField,
  DateField,
  DeleteButton,
  TopToolbar,
  CreateButton,
} from "react-admin";
import { useMediaQuery } from "@material-ui/core";

const PlansWholesales = (props, source, label) => {
  const isSmall = useMediaQuery((theme) => theme.breakpoints.down("sm"));

  const ActionsButton = (props) => (
    <TopToolbar>
      <CreateButton label="Create new" />
    </TopToolbar>
  );

  return (
    <List {...props} actions={<ActionsButton />} bulkActionButtons={false}>
      {isSmall ? (
        <SimpleList
          primaryText={(record) => record.planName}
          tertiaryText={(record) => record.planType}
          linkType={(record) => (record.canEdit ? "edit" : "show")}
        />
      ) : (
        <Datagrid rowClick="show">
          <TextField source="planName" />
          <TextField source="planType" />
          <NumberField source="unitCap" />
          <DateField source="createdAt" />
          <DateField source="updatedAt" />
          <DeleteButton label="" />
        </Datagrid>
      )}
    </List>
  );
};
export default PlansWholesales;
