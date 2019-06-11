import { DateTime } from 'luxon';
import Database from './Database';

import {
  BYTE_IN_MEGABYTE,
} from './constants';

export const imageValidator = (size, value) => {
  let error = null;

  if (value && (value.length * 0.75) > (BYTE_IN_MEGABYTE * size)) {
    error = `Image too large, expected maximum of ${size} megabyte`;
  }

  return error;
};

export const requiredValidator = (value) => {
  let error = null;

  if (!value) {
    error = `Field is required`;
  }

  return error;
};

export const maxLengthValidator = (length, value) => {
  let error = null;

  if (value && value.length > length) {
    error = `To many symbols, expected ${length}`;
  }

  return error;
};

export const requiredItemValidator = (amount, value) => {
  let error = null;

  if (!value || (value && value.length < amount)) {
    error = `Field is required and need select ${amount} options`;
  }

  return error;
};

export const uniqueValidator = async (initialValue, table, field, name, value) => {
  let error = null;

  if (requiredValidator(value)) {
    return requiredValidator(value);
  }

  const user = await Database
    .table(table)
    .where(item => item[field].toLowerCase() === (value && value.toLowerCase()))
    .first();

  if (user && initialValue !== value) {
    error = `${name} already used`;
  }

  return error;
};

export const confirmationValidator = (comparingValue, name, value) => {
  let error = null;

  if (value !== comparingValue) {
    error = `Field not equal with ${name}`;
  }

  return error;
};

export const ageValidator = (minAge, value) => {
  let error = null;

  if (value) {
    const age = Number(DateTime.local().diff(DateTime.fromJSDate(value)).toFormat('y'));

    if (minAge > age) {
      error = `Your age must be greater than or equal to ${minAge}`;
    }
  }

  return error;
};

export const emailValidator = async (initialValue, table, field, name, value) => {
  // eslint-disable-next-line
  if (value && !/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(String(value).toLowerCase())) {
    return `Email is wrong`;
  }

  return uniqueValidator(initialValue, table, field, name, value);
};

export const phoneValidator = async (name, value) => {
  let error = null;

  if (value && ! /^\+\d\s\(\d{3}\)\s\d{3}-\d{2}-\d{2}$/g.test(value)) {
    return `${name} is wrong`;
  }

  return error;
};
