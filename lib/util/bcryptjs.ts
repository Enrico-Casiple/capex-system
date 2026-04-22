import bcryptjs from 'bcryptjs';

export const hashPassword = async (password: string): Promise<string> => {
  try {
    return await bcryptjs.hash(password, 10);
  } catch (error) {
    if (error instanceof Error) {
      console.error(`Error hashing password: ${error.message}`);
    } else {
      console.error('Error hashing password:', error);
    }
    throw error;
  }
};

export const verifyPassword = async (hash: string, password: string): Promise<boolean> => {
  try {
    if (!hash || !password) {
      throw new Error('The password must be provided');
    }

    return await bcryptjs.compare(password, hash);
  } catch (error) {
    if (error instanceof Error) {
      console.error(`Error verifying password: ${error.message}`);
    } else {
      console.error('Error verifying password:', error);
    }
    return false;
  }
};

export const generate_password = (length: number) => {
  try {
    const charset = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*()';
    let password = '';
    for (let i = 0; i < length; i++) {
      const randomIndex = Math.floor(Math.random() * charset.length);
      password += charset[randomIndex];
    }
    return password;
  } catch (error) {
    return {
      success: false,
      code: 'PASSWORD_GENERATION_FAILED',
      message: `FAILED TO GENERATE PASSWORD: ${error instanceof Error ? error.message.toUpperCase() : 'UNKNOWN ERROR'}`,
    };
  }
};

export const generate_code = (length: number) => {
  try {
    const charset = '0123456789';
    let code = '';
    for (let i = 0; i < length; i++) {
      const randomIndex = Math.floor(Math.random() * charset.length);
      code += charset[randomIndex];
    }
    return code;
  } catch (error) {
    return {
      success: false,
      code: 'CODE_GENERATION_FAILED',
      message: `FAILED TO GENERATE CODE: ${error instanceof Error ? error.message.toUpperCase() : 'UNKNOWN ERROR'}`,
    };
  }
};

// Create a bcryptjs ustil with expirity time for 2FA code
export const bcryptjsWithExpiry = {
  hashWithExpiry: async (password: string, expiryTime: Date): Promise<string> => {
    try {
      const salt = await bcryptjs.genSalt(10);
      const hash = await bcryptjs.hash(password, salt);
      // Store the expiry time in a way that you can retrieve it later (e.g., in your database)
      // For example, you could concatenate the hash and expiry time and store them together
      return `${hash}:${expiryTime.getTime()}`;
    } catch (error) {
      if (error instanceof Error) {
        console.error(`Error hashing password with expiry: ${error.message}`);
      } else {
        console.error('Error hashing password with expiry:', error);
      }
      throw error;
    }
  },
  verifyWithExpiry: async (hashWithExpiry: string, password: string): Promise<boolean> => {
    try {
      const [hash, expiryTimeStr] = hashWithExpiry.split(':');
      const expiryTime = new Date(parseInt(expiryTimeStr, 10));
      if (new Date() > expiryTime) {
        console.warn('The code has expired.');
        return false;
      }
      return await bcryptjs.compare(password, hash);
    } catch (error) {
      if (error instanceof Error) {
        console.error(`Error verifying password with expiry: ${error.message}`);
      } else {
        console.error('Error verifying password with expiry:', error);
      }
      return false;
    }
  },
};
