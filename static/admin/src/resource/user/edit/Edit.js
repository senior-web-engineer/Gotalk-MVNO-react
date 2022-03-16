import * as React from 'react';
import {
  Edit,
  SimpleForm,
  SaveButton,
  Toolbar,
  SelectInput,
  useDataProvider,
  maxLength,
  TextInput,
  useNotify,
  number,
  required,
  regex,
} from 'react-admin';
import users from './../../../providers/users';
import '../edit/Edit.scss';
import RESOURCE_NAMES from '../../resource-names';

const UserEdit = (props, record) => {
  const [inputValue, setInputValue] = React.useState();
  const [delivery, setDelivery] = React.useState();
  const [newSim, setNewSim] = React.useState();
  const [ICCID, setICCID] = React.useState();
  const [PINOne, setPINOne] = React.useState();
  const [PUKOne, setPUKOne] = React.useState();
  const [PINTwo, setPINTwo] = React.useState();
  const [PUKTwo, setPUKTwo] = React.useState();
  const [onlyICCID, setOnlyICCID] = React.useState(false);
  const [firstName, setFirstName] = React.useState();
  const [lastName, setLastName] = React.useState();
  const [country, setCountry] = React.useState();
  const [city, setCity] = React.useState();
  const [street, setStreet] = React.useState();
  const [apartment, setApartment] = React.useState();
  const [zip, setZip] = React.useState();
  const [status, setStatus] = React.useState();
  const [isPhysics, setIsPhysics] = React.useState(false);

  const notify = useNotify();
  const dataProvider = useDataProvider();

  const url = window.location.href;
  let idPlan = url.split('=').pop();
  const typePlanSim = url.includes('esim');

  React.useEffect(() => {
    if (typePlanSim === true) {
      setInputValue('esim');
    } else {
      setInputValue('physical');
    }
  }, [typePlanSim]);

  React.useEffect(() => {
    dataProvider.getOne(RESOURCE_NAMES.USER, {
      idPlan,
      isEdit: true,
    });
  }, [dataProvider, idPlan]);

  const OnUpdateClick = () => {
    users
      .updateTypeSim({ type: inputValue })
      .then((res) =>
        notify(`Comment: ${res.data.payload.message}`, { type: 'success' })
      )
      .catch((error) =>
        notify(`Comment: ${error.response.data.payload.message}`, {
          type: 'warning',
        })
      );
  };

  const OnUpdateClickAll = () => {
    setIsPhysics(true);
  };

  const OnUpdateClickIccid = () => {
    setIsPhysics(true);
    setOnlyICCID(true);
  };

  const changedPhysics = () => {
    const delivery = {
      firstName,
      lastName,
      country,
      city,
      street,
      apartment,
      zip,
      status,
    };
    const newSim = {
      ICCID,
      PINOne,
      PUKOne,
      PINTwo,
      PUKTwo,
    };
    setDelivery(delivery);
    setNewSim(newSim);
    if (onlyICCID === true) {
      users
        .updateIccid({ newSim, delivery })
        .then((res) =>
          notify(`Success! Updates will appear in 10-20 min`, {
            type: 'success',
          })
        )
        .catch((error) =>
          notify(`Comment: ${error.response.data.payload.message}`, {
            type: 'warning',
          })
        );
    } else {
      users
        .updateAll({ type: inputValue, newSim, delivery })
        .then((res) =>
          notify(`Success! Updates will appear in 10-20 min`, {
            type: 'success',
          })
        )
        .catch((error) =>
          notify(`Comment: ${error.response.data.payload.message}`, {
            type: 'warning',
          })
        );
    }
  };

  const updateIccidEsim = () => {
    users
      .updateIccid({ type: inputValue, newSim, delivery })
      .then((res) =>
        notify(`Success! Updates will appear in 10-20 min`, { type: 'success' })
      )
      .catch((error) =>
        notify(`Comment: ${error.response.data.payload.message}`, {
          type: 'warning',
        })
      );
  };

  const updateAllEsim = () => {
    users
      .updateAll({ type: inputValue })
      .then((res) =>
        notify(`Success! Updates will appear in 10-20 min`, { type: 'success' })
      )
      .catch((error) =>
        notify(`Comment: ${error.response.data.payload.message}`, {
          type: 'warning',
        })
      );
  };

  const SimEditToolbar = (props) => {
    if (isPhysics === true) {
      return (
        <Toolbar {...props}>
          <SaveButton
            label="Okay"
            onClick={changedPhysics}
            className="button-edit-some"
          />
        </Toolbar>
      );
    } else
      return (
        <Toolbar {...props}>
          <SaveButton
            label="Change only type"
            onClick={() => OnUpdateClick(props.record.id)}
            className="button-edit-some"
          />
          {typePlanSim === true ? (
            <SaveButton
              label="Change only ICCID"
              onClick={() => updateIccidEsim()}
              className="button-edit-some"
            />
          ) : (
            <button className="button" onClick={() => OnUpdateClickIccid()}>
              Change only Iccid
            </button>
          )}
          {inputValue === 'esim' ? (
            <SaveButton
              label="Change ALL"
              onClick={() => updateAllEsim()}
              className="button-edit-some"
            />
          ) : (
            <button
              className="button"
              label="Change ALL"
              onClick={() => OnUpdateClickAll(props.record.id)}
            >
              Changed All
            </button>
          )}
        </Toolbar>
      );
  };

  const changeStatus = (event) => {
    setStatus(event.target.value);
  };

  const changeInput = (event) => {
    setInputValue(event.target.value);
  };

  const validateNewSim = [
    required(),
    maxLength(19, 'Must be a valid ICCID'),
    number('Must be a number'),
  ];

  const validateZipCode = [
    regex(/^\d{5}$/, 'Must be a valid Zip Code'),
    required(),
  ];
  return (
    <Edit {...props} actions={false}>
      <SimpleForm toolbar={<SimEditToolbar />}>
        {!isPhysics && (
          <SelectInput
            value={inputValue}
            onChange={changeInput}
            source="type"
            label={inputValue}
            choices={[
              { id: 'esim', name: 'esim' },
              { id: 'physical', name: 'physical' },
            ]}
          />
        )}
        {isPhysics && (
          <>
            <h1 className="title-change">
              Change type from esim to physical sim and iccid
            </h1>
            <div className="block-flex">
              <TextInput
                value={ICCID}
                onChange={(e) => setICCID(e.target.value)}
                className="user-edit__item"
                label="ICCID"
                source="Delivery.ICCID"
                validate={validateNewSim}
              />
              <TextInput
                value={PINOne}
                onChange={(e) => setPINOne(e.target.value)}
                className="user-edit__item"
                label="PINOne"
                source="Delivery.PINOne"
                validate={validateNewSim}
              />
              <TextInput
                value={PUKOne}
                onChange={(e) => setPUKOne(e.target.value)}
                className="user-edit__item"
                label="PUKOne"
                source="Delivery.PUKOne"
                validate={validateNewSim}
              />
              <TextInput
                value={PINTwo}
                onChange={(e) => setPINTwo(e.target.value)}
                className="user-edit__item"
                label="PINTwo"
                source="Delivery.PINTwo"
                validate={validateNewSim}
              />
              <TextInput
                value={PUKTwo}
                onChange={(e) => setPUKTwo(e.target.value)}
                className="user-edit__item"
                label="PUKTwo"
                source="Delivery.PUKTwo"
                validate={validateNewSim}
              />
              <TextInput
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
                className="user-edit__item"
                label="First name"
                source="FirstName"
                validate={required()}
              />
              <TextInput
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
                className="user-edit__item"
                label="Last name"
                source="LastName"
                validate={required()}
              />
              <TextInput
                value={country}
                onChange={(e) => setCountry(e.target.value)}
                className="user-edit__item"
                label="Country"
                source="Country"
                validate={required()}
              />
              <TextInput
                value={city}
                onChange={(e) => setCity(e.target.value)}
                className="user-edit__item"
                label="City"
                source="City"
                validate={required()}
              />
              <TextInput
                value={street}
                onChange={(e) => setStreet(e.target.value)}
                className="user-edit__item"
                label="Street"
                source="Street"
                validate={required()}
              />
              <TextInput
                value={apartment}
                onChange={(e) => setApartment(e.target.value)}
                className="user-edit__item"
                label="Apartment"
                source="Apartment"
                validate={required()}
              />
              <TextInput
                className="user-edit__item"
                onChange={(e) => setZip(e.target.value)}
                value={zip}
                label="Zip"
                source="Zip"
                validate={validateZipCode}
              />
              <SelectInput
                className="user-edit__item"
                onChange={changeStatus}
                label="Status"
                source="Status"
                optionValue="name"
                choices={[
                  { id: 'Acceptance', name: 'Acceptance' },
                  { id: 'Dispatch', name: 'Dispatch' },
                  { id: 'Sent', name: 'Sent' },
                  { id: 'Delivered', name: 'Delivered' },
                ]}
                validate={required()}
              />
            </div>
          </>
        )}
      </SimpleForm>
    </Edit>
  );
};
export default UserEdit;
