export const API_URL = "https://air-quality-charts-api.onrender.com/api";

export const METADATA = "/air-quality-metadata";
export const AIR_QUALITY_DATA = "/air-quality-data";

export const AIR_QUALITY_PARAMETER_DESCRIPTION = {
  co_concentration:
    "CO(GT) - concentration of carbon monoxide in the air (µg/m³)",
  co_sensor_value: "PT08.S1(CO) - sensor value for carbon monoxide",
  hydrocarbons_concentration:
    "NMHC(GT) - concentration of non-methane hydrocarbons in the air (µg/m³)",
  benzene_concentration:
    "C6H6(GT) - concentration of benzene in the air (µg/m³)",
  hydrocarbons_sensor_value:
    "PT08.S2(NMHC) - sensor value for non-methane hydrocarbons",
  no_concentration:
    "NOx(GT) - concentration of nitrogen oxides in the air (µg/m³)",
  nitro_oxides_sensor_value: "PT08.S3(NOx) - sensor value for nitrogen oxides",
  nitro_oxides_concentration:
    "NO2(GT) - concentration of nitrogen dioxide in the air (µg/m³)",
  nitro_dioxide_sensor_value:
    "PT08.S4(NO2) - sensor value for nitrogen dioxide",
  ozone_sensor_value: "PT08.S5(O3) - sensor value for ozone",
  temperature: "T - temperature at the time of measurement (celsius)",
  relative_humidity: "RH - relative humidity in the air (as a percentage)",
  absolute_humidity: "AH - absolute humidity (in grams per cubic meter)",
};

export const AIR_QUALITY_PARAMETERS = [
  "co_concentration",
  "co_sensor_value",
  "hydrocarbons_concentration",
  "benzene_concentration",
  "hydrocarbons_sensor_value",
  "no_concentration",
  "nitro_oxides_sensor_value",
  "nitro_oxides_concentration",
  "nitro_dioxide_sensor_value",
  "ozone_sensor_value",
  "temperature",
  "relative_humidity",
  "absolute_humidity",
];
