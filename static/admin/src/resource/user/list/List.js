import React from 'react';
import {
  List,
  Datagrid,
  TextField,
  SimpleList,
  FunctionField,
  DeleteButton,
  SimpleForm,
  SelectInput,
  Button,
  useNotify,
} from 'react-admin';
import users from './../../../providers/users';
import '../list/List.scss';
import { useMediaQuery } from '@material-ui/core';

export const UserList = (props, source, label) => {
  const isSmall = useMediaQuery((theme) => theme.breakpoints.down('sm'));
  const notify = useNotify();

  const UserRole = ({ id, record, resource }) => {
    const [valueRole, setValueRole] = React.useState(record.role);
    const onClick = () => {
      users
        .updateRoleUser(record.id, valueRole)
        .then((res) => notify(`successfully! refresh the page`, { type: 'success' }))
        .catch((error) =>
          notify(`Comment: ${error.response.data.payload.message}`, {
            type: 'warning',
          })
        );
    };

    const changeRole = (event) => {
      setValueRole(event.target.value);
    };

    return (
      <SimpleForm toolbar={false}>
        <SelectInput
          value={valueRole}
          onChange={changeRole}
          className="user-edit__item"
          label={valueRole}
          source="role"
          choices={[
            { id: 'Owner', name: 'Owner' },
            { id: 'Customer', name: 'Customer' },
          ]}
        />
        <Button label="Change" onClick={onClick} className="btn-change" />
      </SimpleForm>
    );
  };

  return (
    <List {...props} actions={false} bulkActionButtons={false}>
      {isSmall ? (
        <SimpleList
          primaryText={(record) => record.firstName}
          secondaryText={(record) => record.balance}
          tertiaryText={(record) => record.phone}
          linkType={(record) => (record.canEdit ? 'edit' : 'show')}
        />
      ) : (
        <Datagrid rowClick="show" expand={<UserRole />}>
          <FunctionField
            label="Name"
            render={(record) => `${record.firstName} ${record.lastName}`}
          />
          <TextField emptyText="missing" source="phone" label="Phone number" />
          <TextField
            emptyText="missing"
            source="status"
            label="Status activate"
          />
          <TextField
            emptyText="missing"
            source="balance"
            label="Balance user"
          />
          <TextField emptyText="missing" source="role" label="Role" />
          <DeleteButton label="" />
        </Datagrid>
      )}
    </List>
  );
};
