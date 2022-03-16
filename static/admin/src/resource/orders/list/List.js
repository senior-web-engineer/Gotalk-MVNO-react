import {
  List,
  Datagrid,
  TextField,
  FunctionField,
  DateField,
  DeleteButton,
} from "react-admin";

const OrderList = (props) => {
  const renderUsernameColumn = (record) => {
    return (
      <div>
        {record.user?.firstName ?? "missing"} {record.user?.lastName ?? ""}
      </div>
    );
  };

  return (
    <List {...props} actions={false} bulkActionButtons={false}>
      <Datagrid rowClick="show">
        <DateField label="Created" source="pay.createdAt" emptyText="missing" />
        <FunctionField
          render={renderUsernameColumn}
          label="User"
          source="user"
        />
        <TextField label="Plan name" source="planName" />
        <TextField
          label="Payment Type"
          source="pay.paymentType"
          emptyText="missing"
        />
        <TextField label="Sim Type" source="simType" emptyText="missing" />
        <TextField label="Sum" source="pay.sum" emptyText="missing" />
        <DeleteButton label="" />
      </Datagrid>
    </List>
  );
};

export default OrderList;
