import sha256 from "crypto-js/sha256";
import base64Encoder from "crypto-js/enc-base64";

const getSHA256EncryptedBase64Wadh = (wadh: string): string => {
  const encryptedWadh = sha256(wadh);
  return base64Encoder.stringify(encryptedWadh);
};

export default getSHA256EncryptedBase64Wadh;
