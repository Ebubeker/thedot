import jwt from "jsonwebtoken";

const firebasePublicKeyUrl = "https://www.googleapis.com/robot/v1/metadata/x509/securetoken@system.gserviceaccount.com";

export async function verifyToken(idToken: string) {
  try {
    const response = await fetch(firebasePublicKeyUrl);
    const publicKeys = await response.json();
    const decodedToken = jwt.decode(idToken, { complete: true });

    if (!decodedToken || !decodedToken.header || !decodedToken.header.kid) {
      throw new Error("Invalid token");
    }

    const publicKey = publicKeys[decodedToken.header.kid];
    if (!publicKey) {
      throw new Error("Public key not found");
    }

    const verifiedToken = jwt.verify(idToken, publicKey, {
      algorithms: ["RS256"],
    });

    return verifiedToken;
  } catch (error) {
    console.error("Token verification failed:", error);
    return null;
  }
}
