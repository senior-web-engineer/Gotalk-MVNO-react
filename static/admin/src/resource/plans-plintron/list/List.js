import React from "react";
import {
  List,
  Datagrid,
  TextField,
  SimpleList,
  BooleanField,
  NumberField,
  DeleteButton,
  TopToolbar,
  CreateButton,
} from "react-admin";
import { useMediaQuery } from "@material-ui/core";

const PlansPlintron = (props, source, label) => {
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
          primaryText={(record) => record.name}
          tertiaryText={(record) => `Expiry ${record.expiry}`}
          linkType={(record) => (record.canEdit ? "edit" : "show")}
        />
      ) : (
        <Datagrid rowClick="show">
          <TextField source="id" />
          <TextField source="name" />
          <NumberField source="costPerMonth" />
          <TextField source="expiry" />
          <BooleanField source="autoRenewal" />
          <BooleanField source="midcycleRateChange" />
          <DeleteButton label="" />
        </Datagrid>
      )}
    </List>
  );
};
export default PlansPlintron;
