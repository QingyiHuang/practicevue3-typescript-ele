import CryptoJS from "crypto-js";

export default function useAES() {
  /**
   * AES加密
   * @param plaintext 明文
   * @param key 加密密钥
   * @returns Base64格式密文
   */
  const encrypt = (plaintext: string, key: string): string => {
    return CryptoJS.AES.encrypt(plaintext, key).toString();
  };

  /**
   * AES解密
   * @param ciphertext Base64格式密文
   * @param key 解密密钥（需与加密密钥一致）
   * @returns UTF-8编码明文
   */
  const decrypt = (ciphertext: string, key: string): string => {
    const bytes = CryptoJS.AES.decrypt(ciphertext, key);
    return bytes.toString(CryptoJS.enc.Utf8);
  };

  return {
    encrypt,
    decrypt,
  };
}
