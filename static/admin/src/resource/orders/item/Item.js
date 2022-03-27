import {
  Show,
  SimpleShowLayout,
  TextField,
  DateField,
  FunctionField,
  Tab,
  TabbedShowLayout
} from "react-admin";
import get from "lodash/get";

const OrderItem = (props) => {

  const getDiliveryEmail = (record) => {
    const deliveryEmail = get(record, "Delivery.email");
    const userEmail = get(record, "User.email", "");

    return deliveryEmail || userEmail || "missing";
  };

  const getDiliveryAdress = (record) => {
    const deliveryCountry = get(record, "Delivery.country", "");
    const deliveryCity = get(record, "Delivery.city", "");
    const deliveryStreet = get(record, "Delivery.street", "");
    const deliveryApartment = get(record, "Delivery.apartment", "");
    const deliveryZip = get(record, "Delivery.zip", "");

    if (!deliveryCountry && !deliveryCity && !deliveryStreet && !deliveryApartment && !deliveryZip)
      return "missing";

    return `${deliveryCountry} ${deliveryCity} ${deliveryStreet} ${deliveryApartment} ${deliveryZip}`;
  };

  const getPortRequest = (record) => {
    if(record.UserSimPort) {
      return 'User has a PORT request';
    }
    
    return <b style={{color: 'red'}}>User doesn't have a PORT request</b>;
  }

  return (
    <Show {...props}>
      <TabbedShowLayout>
        <Tab label="user">
          <SimpleShowLayout>
            <TextField label="First name" source="User.firstName" emptyText="missing" />
            <TextField label="Last name" source="User.lastName" emptyText="missing" />
            <TextField label="Telephone number" source="User.phone" emptyText="missing" />
            <TextField label="E-mail address" source="User.email" emptyText="missing" />
            <TextField label="Street address" source="User.street" emptyText="missing" />
            <TextField label="Apartment, suite, unit" source="User.apartment" emptyText="missing" />
            <TextField label="State " source="User.country" emptyText="missing" />
            <TextField label="Zip" source="User.zip" emptyText="missing" />
            <TextField label="Town / City" source="User.city" emptyText="missing" />
          </SimpleShowLayout>
        </Tab>

        <Tab label="delivery">
          <TextField label="Iccid" source="PlintronSim.ICCID" emptyText="missing" />
          <TextField label="First name" source="Delivery.firstName" emptyText="missing" />
          <TextField label="Last name" source="Delivery.lastName" emptyText="missing" />
          <FunctionField label="Email" render={getDiliveryEmail} emptyText="missing" />
          <FunctionField label="Address" render={getDiliveryAdress} emptyText="missing" />
          <TextField label="Status" source="Delivery.status" emptyText="missing" />
          <DateField
            label="Date created of order"
            source="Delivery.createdAt"
            emptyText="missing"
          />
          <DateField
            label="Date updated of order"
            source="Delivery.updatedAt"
            emptyText="missing"
          />
        </Tab>

        <Tab label="Port Request">
          <FunctionField label="PORT" render={getPortRequest} emptyText="..." />
          <TextField label="Status" source="UserSimPort.status" emptyText="missing" />
          <TextField label="Phone number" source="UserSimPort.phoneNumber" emptyText="missing" />
          <TextField label="Account number" source="UserSimPort.accountNumber" emptyText="missing" />
          <TextField label="First name" source="UserSimPort.firstName" emptyText="missing" />
          <TextField label="Pin number" source="UserSimPort.pinNumber" emptyText="missing" />
          <TextField label="Address line" source="UserSimPort.addressLine" emptyText="missing" />
          <TextField label="State" source="UserSimPort.state" emptyText="missing" />
          <TextField label="City" source="UserSimPort.addressLine2" emptyText="missing" />
          <TextField label="Zip" source="UserSimPort.zip" emptyText="missing" />
          <DateField
            label="Date created of PORT"
            source="UserSimPort.createdAt"
            emptyText="missing"
          />
          <DateField
            label="Date updated of PORT"
            source="UserSimPort.updatedAt"
            emptyText="missing"
          />
        </Tab>
      </TabbedShowLayout>
    </Show>
  );
};

export default OrderItem;
