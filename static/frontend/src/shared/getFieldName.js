const getFieldName = (name, parentFieldName = null) => (parentFieldName
  ? `${parentFieldName}.${name}`
  : name);

export default getFieldName;
