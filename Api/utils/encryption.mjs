
// my own customm encryption function , i would use it in the future
import { generateKeyPairSync, publicEncrypt, privateDecrypt } from 'crypto';

export const generateKeyPair = () => {
    const { publicKey, privateKey } = generate
    KeyPairSync('rsa', {
        modulusLength: 4096,
        publicKeyEncoding: {
            type: 'spki',
            format: 'pem'
        },
        privateKeyEncoding: {
            type: 'pkcs8',
            format: 'pem'
        }
    });

    return {
        publicKey,
        privateKey
    };

};

export const encrypt = (data, publicKey) => {
    return publicEncrypt(publicKey, Buffer.from(data));
}

export const decrypt = (data, privateKey) => {
    return privateDecrypt(privateKey, data).toString();
}
