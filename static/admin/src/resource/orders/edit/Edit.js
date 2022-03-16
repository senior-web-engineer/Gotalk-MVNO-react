import { useEffect } from "react";
import { useSelector } from "react-redux";
import { Edit, SimpleForm, SelectInput, TextInput } from "react-admin";
import OrderEditActions from "./EditActions";
import { useState } from "react";
import validator from "validator";
import "./Edit.scss";

const OrderEdit = (props) => {
  const [status, setStatus] = useState("");
  const [ICCID, setICCID] = useState("");
  const [PINOne, setPINOne] = useState("");
  const [PUKOne, setPUKOne] = useState("");
  const [PINTwo, setPINTwo] = useState("");
  const [PUKTwo, setPUKTwo] = useState("");

  const [validateStatus, setValidateStatus] = useState("");
  const [validateICCID, setValidateICCID] = useState("");

  const { id } = props;
  const selectedOrder = useSelector((state) => state.admin.resources.orders.data);
  const isPlintronSim = !!selectedOrder[id]?.PlintronSim;

  const checkValidateStatus = (value = "") => {
    if (!value) {
      setValidateStatus("Requred field");

      return;
    }

    setValidateStatus("");
  };

  const checkValidateICCID = (value = "") => {
    if (!value) {
      setValidateICCID("Requred field");

      return;
    }

    if (value?.length !== 19) {
      setValidateICCID("The string must be 19 characters long");

      return;
    }

    if (!validator.isNumeric(value)) {
      setValidateICCID("ICCID must be numeric");

      return;
    }

    setValidateICCID("");
  };

  const changeStatus = (e) => {
    setStatus(e.target.value.toLowerCase());

    checkValidateStatus(e.target.value);
  };

  const changeICCID = (e) => {
    setICCID(e.target.value);

    checkValidateICCID(e.target.value);
  };

  useEffect(() => {
    checkValidateStatus("");
    checkValidateICCID("");
  }, []);

  return (
    <Edit {...props} title="Edit delivery">
      <SimpleForm
        variant="filled"
        validate={() => true}
        toolbar={
          <OrderEditActions
            status={status}
            ICCID={ICCID}
            PINOne={PINOne}
            PUKOne={PUKOne}
            PINTwo={PINTwo}
            PUKTwo={PUKTwo}
            validateStatus={validateStatus}
            validateICCID={validateICCID}
            isPlintronSim={isPlintronSim}
          />
        }
      >
        {isPlintronSim && (
          <SelectInput
            source="Delivery.status"
            label="Status"
            optionText="name"
            optionValue="id"
            choices={[
              { id: "Acceptance", name: "Acceptance" },
              { id: "Dispatch", name: "Dispatch" },
              { id: "Sent", name: "Sent" },
              { id: "Delivered", name: "Delivered" },
            ]}
            onChange={changeStatus}
          />
        )}
        {isPlintronSim && <p className="orders-text-error">{validateStatus}</p>}

        <TextInput
          label="ICCID"
          source="Delivery.ICCID"
          placeholder="ICCID"
          value={ICCID}
          onChange={changeICCID}
        />
        <p className="orders-text-error">{validateICCID}</p>
        <TextInput
          label="PINOne"
          source="Delivery.PINOne"
          placeholder="PINOne"
          value={PINOne}
          onChange={(e) => setPINOne(e.target.value)}
        />
        <TextInput
          label="PUKOne"
          source="Delivery.PUKOne"
          placeholder="PUKOne"
          value={PUKOne}
          onChange={(e) => setPUKOne(e.target.value)}
        />
        <TextInput
          label="PINTwo"
          source="Delivery.PINTwo"
          placeholder="PINTwo"
          value={PINTwo}
          onChange={(e) => setPINTwo(e.target.value)}
        />
        <TextInput
          label="PUKTwo"
          source="Delivery.PUKTwo"
          placeholder="PUKTwo"
          value={PUKTwo}
          onChange={(e) => setPUKTwo(e.target.value)}
        />
      </SimpleForm>
    </Edit>
  );
};

export default OrderEdit;
