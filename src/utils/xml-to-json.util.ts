const XMLParser = require('react-xml-parser');

const convertXmlToJson = (xmlString: string) => {
  return new XMLParser().parseFromString(xmlString);
};

export default convertXmlToJson;
