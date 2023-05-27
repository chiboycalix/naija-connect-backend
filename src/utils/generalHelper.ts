import crypto from "crypto";

export const generalHelper = {
  generateToken: (length: number): string => {
    const buffer = crypto.randomBytes(length);
    return buffer.toString("hex");
  },
};
