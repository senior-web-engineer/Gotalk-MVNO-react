import { Toolbar, SaveButton } from "react-admin";
import orders from "../../../providers/orders";
import get from "lodash/get";

const OrderEditActions = ({
  status,
  ICCID,
  PINOne,
  PUKOne,
  PINTwo,
  PUKTwo,
  isPlintronSim,
  validateStatus,
  validateICCID,
  ...props
}) => {
  const handleSaveStatus = () => {
    const id = get(props, "record.Delivery.id", "");

    orders.updateDeliveryStatus({ status, id });
  };

  const handleSaveIccid = () => {
    const productId = get(props, "record.id", "");

    const data = {
      productId,
      sim: { ICCID, PINOne, PUKOne, PINTwo, PUKTwo },
    };

    orders.updateIccidDelivery(data);
  };

  return (
    <Toolbar {...props}>
      {isPlintronSim && (
        <SaveButton
          label="Сhange Status"
          onClick={handleSaveStatus}
          className="button-edit-some"
          disabled={!!validateStatus}
        />
      )}
      <SaveButton
        label="Сhange ICCID"
        onClick={handleSaveIccid}
        className="button-edit-some"
        disabled={!!validateICCID}
      />
    </Toolbar>
  );
};

export default OrderEditActions;
