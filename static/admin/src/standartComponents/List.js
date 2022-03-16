import React from "react";
import { List, Datagrid, TextField, SimpleList } from "react-admin";
import { useMediaQuery } from "@material-ui/core";

export const UserList = (props) => {
  const isSmall = useMediaQuery((theme) => theme.breakpoints.down("sm"));

  return (
    <List {...props} actions={false} bulkActionButtons={false}>
      {isSmall ? (
        <SimpleList
          primaryText={(record) => record.name}
          secondaryText={(record) => `${record.views} views`}
          tertiaryText={(record) => record.costBuyPlan}
          linkType={(record) => (record.canEdit ? "edit" : "show")}
        />
      ) : (
        <Datagrid rowClick="show">
          <TextField source="id" />
          <TextField source="name" />
        </Datagrid>
      )}
    </List>
  );
};
