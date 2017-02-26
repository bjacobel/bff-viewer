const socrataId = '427a-3cn5';
const ckanId = '4582bec6-2b4f-4f9e-bc55-cbaa73117f4c';

const baseConfig = {
  SocrataURL: `https://data.cityofboston.gov/resource/${socrataId}`,
  ckanURL: `https://data.boston.gov/api/action/datastore_search?resource_id=${ckanId}&filters=`
};

const configSwitch = {};

configSwitch.prod = Object.assign({}, baseConfig, {
  ShowReduxDevTools: false,
  HotReload: false
});

configSwitch.dev = Object.assign({}, baseConfig, {
  ShowReduxDevTools: true,
  HotReload: true
});

const env = process.env.NODE_ENV === 'production' ? 'prod' : 'dev';
const config = configSwitch[env];
export default config;
