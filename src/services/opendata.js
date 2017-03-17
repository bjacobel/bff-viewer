import 'isomorphic-fetch';
import 'core-js/fn/object/entries';

import config from '../constants/config';

const getFromSocrata = (violation) => {
  return fetch(`${config.SocrataURL}/${violation}.json`)
    .then((response) => {
      return response.json();
    })
    .then((viol) => {
      return viol;
    });
};

const getFromCkan = (violation) => {
  const query = `{"_id": ${violation}}`;

  return fetch(`${config.ckanURL}${encodeURI(query)}`)
    .then((response) => {
      return response.json();
    })
    .then((viol) => {
      const record = viol.result.records[0];
      return Object.entries(record).reduce((obj, [key, value]) => ({ ...obj, [key.toLowerCase()]: value }), {});
    });
};

export const getViolation = (violation) => {
  const ckanId = parseInt(violation, 10);

  if (ckanId) {
    return getFromCkan(violation);
  } else {
    return getFromSocrata(violation);
  }
};
