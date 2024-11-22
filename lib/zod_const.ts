// ./lib/zod_const.ts
// zod constants

// common const
export const NAME_MIN_LENGTH = 2;
export const NAME_MAX_LENGTH = 18;
export const PHONE_MIN_LENGTH = 9;
export const PHONE_MAX_LENGTH = 11;

// Staff Form const
export const STAFF_BIRTH_YEAR_MIN_VALUE = 1900;
export const STAFF_BIRTH_YEAR_MAX_VALUE = new Date().getFullYear();

// Owner Form const
export const OWNER_STORE_NAME_MIN_LENGTH = 2;
export const OWNER_STORE_NAME_MAX_LENGTH = 20;
export const OWNER_STORE_ADDRESS_MIN_LENGTH = 5;
export const OWNER_STORE_ADDRESS_MAX_LENGTH = 50;
export const OWNER_STORE_DETAIL_ADDRESS_MAX_LENGTH = 50;
