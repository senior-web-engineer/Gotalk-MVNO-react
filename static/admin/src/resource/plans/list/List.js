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

const Plans = (props, source, label) => {
  const isSmall = useMediaQuery((theme) => theme.breakpoints.down("sm"));

  const ActionsButton = (props) => (
    <TopToolbar>
      <CreateButton label="Create new" />
    </TopToolbar>
  );

  return (
    <List
      {...props}
      title="Plans"
      actions={<ActionsButton />}
      bulkActionButtons={false}
    >
      {isSmall ? (
        <SimpleList
          primaryText={(record) => record.name}
          tertiaryText={(record) => record.costBuyPlan}
          linkType={(record) => (record.canEdit ? "edit" : "show")}
        />
      ) : (
        <Datagrid rowClick="show">
          <TextField emptyText="missing" source="name" label="Plan name" />
          <TextField
            emptyText="missing"
            source="costBuyPlan"
            label="Price plan"
          />
          <BooleanField source="isCompany" label="Company" />
          <DeleteButton label="" />
        </Datagrid>
      )}
    </List>
  );
};
export default Plans;
