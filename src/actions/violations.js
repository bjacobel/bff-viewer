import { getViolation } from '../services/opendata';

export const REQUEST_VIOLATION = 'REQUEST_VIOLATION';
export const RECEIVED_VIOLATION = 'RECEIVED_VIOLATION';
export const REQUEST_VIOLATION_FAILED = 'REQUEST_VIOLATION_FAILED';

export const requestViolation = () => {
  return { type: REQUEST_VIOLATION };
};

export const receivedViolation = (violation) => {
  return { type: RECEIVED_VIOLATION, payload: { violation } };
};

export const requestViolationFailed = (error) => {
  return { type: REQUEST_VIOLATION_FAILED, payload: { error }, error: true };
};

export const fetchViolation = () => {
  return (dispatch) => {
    dispatch(requestViolation());

    return getViolation(window.location.hash.slice(2))
      .then((data) => {
        dispatch(receivedViolation(data));
      })
      .catch((err) => {
        dispatch(requestViolationFailed(err));
      });
  };
};
