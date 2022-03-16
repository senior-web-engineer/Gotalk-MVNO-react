import * as React from 'react';
import {
  Show,
  SimpleShowLayout,
  TextField,
  FunctionField,
  TabbedShowLayout,
  Tab,
  Datagrid,
  ArrayField,
  DateField,
  useRedirect,
  Button,
  useNotify,
} from 'react-admin';
import './Show.scss';
import { Typography } from '@material-ui/core';
import { Remove, Check } from '@material-ui/icons';
import usersProvider from '../../../providers/users.js';

export const UserShow = (props) => {
  const redirect = useRedirect();
  const notify = useNotify();
  const [loading, setLoading] = React.useState({});

  const EditClick = (record) => {
    const recordObj = JSON.parse(record);
    redirect(
      `/users/${recordObj.userId}?${recordObj.PlintronSim.type}id=${recordObj.PlintronSim.id}`
    );
  };

  const PlintronLinkLabel = (record) => {
    const onPlanClick = () => {
      redirect(`/plans_plintron/${record.PlintronPlan.id}/show`);
    };

    return (
      <Typography onClick={onPlanClick} color="primary" variant="inherit">
        {record.PlintronPlan.name}
      </Typography>
    );
  };

  const WholesaleLinkLabel = (record) => {
    const onPlanClick = () => {
      redirect(`/plans_wholesales/${record.WholesalePlan.id}/show`);
    };

    return (
      <Typography onClick={onPlanClick} color="primary" variant="inherit">
        {record.WholesalePlan.planName}
      </Typography>
    );
  };

  const CommentEditButton = (record) => {
    if (record.PlintronSim === null) {
      return;
    } else {
      return <div className="edit-text">EDIT</div>;
    }
  };

  const types = {
    ACTIVATE: 'A',
    DEACTIVATE: 'B',
  };

  const ActionToggleButton = (record) => {
    const makeUpdateSimRequest = (action) => {
      setLoading({
        ...loading,
        [record.id]: true,
      });

      return usersProvider
        .updateSimStatus(record.id, record.userId, action)
        .finally(() => {
          setLoading({
            ...loading,
            [record.id]: false,
          });
        });
    };

    const onActivateButtonClick = () => {
      record.status = 'deactivate';

      makeUpdateSimRequest(types.ACTIVATE)
        .then(() => {
          usersProvider.getOne({
            id: record.userId,
          });
        })
        .catch((error) => {
          notify(
            `Error while activate request: ${error.response.data?.payload?.message}`,
            {
              type: 'error',
            }
          );
        });
    };
    const onDeactivateButtonClick = () => {
      makeUpdateSimRequest(types.DEACTIVATE)
        .then(() => {
          usersProvider.getOne({
            id: record.userId,
          });
        })
        .catch((error) =>
          notify(
            `Error while deactivate request: ${error.response.data?.payload?.message}`,
            {
              type: 'error',
            }
          )
        );
    };

    const activateIcon = <Check />;
    const removeIcon = <Remove />;

    return (
      record.PlintronSim &&
      (record.status === 'active' ? (
        <Button
          children={removeIcon}
          onClick={onDeactivateButtonClick}
          color="primary"
          label="Deactivate"
          disabled={loading[record.id]}
        />
      ) : (
        <Button
          children={activateIcon}
          onClick={onActivateButtonClick}
          color="secondary"
          label="Activate"
          disabled={loading[record.id]}
        />
      ))
    );
  };

  const fieldPayment = (record) => {
    if (record.paymentType === 'strip') {
      return 'stripe';
    } else {
      return record.paymentType;
    }
  };

  return (
    <Show {...props} actions={false}>
      <TabbedShowLayout>
        <Tab label="Personal data">
          <SimpleShowLayout>
            <FunctionField
              label="Name"
              render={(record) => `${record.firstName} ${record.lastName}`}
            />
            <TextField
              emptyText="missing"
              source="phone"
              label="Phone number"
            />
            <TextField emptyText="missing" source="email" label="Email" />
            <TextField emptyText="missing" source="role" label="Role" />
            <TextField emptyText="missing" source="country" label="Country" />
            <TextField emptyText="missing" source="city" label="City" />
            <TextField emptyText="missing" source="street" label="street" />
            <TextField
              emptyText="missing"
              source="apartment"
              label="Apartment"
            />
            <TextField
              emptyText="missing"
              source="status"
              label="Status activate"
            />
            <TextField emptyText="missing" source="zip" label="ZIP" />
          </SimpleShowLayout>
        </Tab>
        <Tab label="User plans">
          <ArrayField source="UserSimPlans" label="Plans user">
            <Datagrid rowClick={(record) => EditClick(record)}>
              <TextField
                emptyText="missing"
                source="plan.name"
                label="Name plan"
              />
              <FunctionField label="Plintron plan" render={PlintronLinkLabel} />
              <FunctionField
                label="Wholesale plan"
                render={WholesaleLinkLabel}
              />
              <TextField
                emptyText="missing"
                source="PlintronSim.type"
                label="Sim Type"
              />
              <TextField
                emptyText="missing"
                source="PlintronSim.MSISDN"
                label="Connected number"
              />
              <TextField
                emptyText="missing"
                source="PlintronSim.ICCID"
                label="ICCID"
              />
              <FunctionField
                onClick={(event) => event.stopPropagation()}
                render={ActionToggleButton}
                label="Action"
              />
              <DateField source="expireDate" label="Expire Date" />
              <FunctionField render={CommentEditButton} />;
            </Datagrid>
          </ArrayField>
        </Tab>
        <Tab label="Balance">
          <SimpleShowLayout>
            <FunctionField
              label="Name"
              render={(record) => `${record.firstName} ${record.lastName}`}
            />
            <TextField
              emptyText="missing"
              source="phone"
              label="Phone number"
            />
            <TextField
              emptyText="missing"
              source="balance"
              label="Balance user"
            />
            <ArrayField source="UserPays" label="Payment history">
              <Datagrid>
                <TextField emptyText="missing" source="action" label="Action" />
                <FunctionField
                  label="Payment Type"
                  render={(record) => fieldPayment(record)}
                />
                <TextField emptyText="missing" source="status" label="Status" />
                <TextField emptyText="missing" source="sum" label="Sum" />
                <DateField
                  emptyText="missing"
                  source="createdAt"
                  showTime={true}
                  label="Date"
                />
              </Datagrid>
            </ArrayField>
          </SimpleShowLayout>
        </Tab>
      </TabbedShowLayout>
    </Show>
  );
};
