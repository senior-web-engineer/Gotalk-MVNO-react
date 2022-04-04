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

  const renderStatusColumn = (record) => {
    if(!record?.PlintronSim?.status || record.PlintronSim.status === 'NOT_ACTIVATED') {
      return <span style={{color: "#f00"}}>Not Active</span>
    }
    return <span style={{color: "#3cb043"}}>Active</span>;
  }

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
        <FunctionField label="Status" render={renderStatusColumn} />
        <DeleteButton label="" />
      </Datagrid>
    </List>
  );
};

export default OrderList;
