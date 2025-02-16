import { useReducer, useCallback } from "react";
import axios from "axios";
import { AIR_QUALITY_DATA, API_URL, METADATA } from "../utils/constants";

const initialState = {
  metadata: null,
  airQualityData: null,
  loading: false,
  error: null,
};

const ACTION_TYPES = {
  SET_LOADING: "SET_LOADING",
  SET_ERROR: "SET_ERROR",
  SET_METADATA: "SET_METADATA",
  SET_AIR_QUALITY_DATA: "SET_AIR_QUALITY_DATA",
  RESET_ERROR: "RESET_ERROR",
};

const reducer = (state, action) => {
  switch (action.type) {
    case ACTION_TYPES.SET_LOADING:
      return { ...state, loading: true };
    case ACTION_TYPES.SET_ERROR:
      return { ...state, error: action.error, loading: false };
    case ACTION_TYPES.SET_METADATA:
      return { ...state, metadata: action.metadata, loading: false };
    case ACTION_TYPES.SET_AIR_QUALITY_DATA:
      return { ...state, airQualityData: action.data, loading: false };
    case ACTION_TYPES.RESET_ERROR:
      return { ...state, error: null };
    default:
      return state;
  }
};

// Custom hook for fetching data (metadata and air quality data)
export const useFetchData = () => {
  const [state, dispatch] = useReducer(reducer, initialState);

  const fetchMetadata = useCallback(async () => {
    dispatch({ type: ACTION_TYPES.SET_LOADING });
    try {
      const response = await axios.get(`${API_URL}${METADATA}`);
      const metadata = response.data?.data?.metadata;

      dispatch({
        type: ACTION_TYPES.SET_METADATA,
        metadata,
      });
    } catch (error) {
      dispatch({
        type: ACTION_TYPES.SET_ERROR,
        error: `API Error: ${error.message}`,
      });
    }
  }, []);

  const fetchAirQualityData = useCallback(async (params) => {
    dispatch({ type: ACTION_TYPES.SET_LOADING });
    try {
      const response = await axios.get(`${API_URL}${AIR_QUALITY_DATA}`, {
        params,
      });
      dispatch({
        type: ACTION_TYPES.SET_AIR_QUALITY_DATA,
        data: response.data?.data?.list,
      });
    } catch (error) {
      dispatch({
        type: ACTION_TYPES.SET_ERROR,
        error: `API Error: ${error.message}`,
      });
    }
  }, []);

  const handleCloseError = () => {
    dispatch({ type: ACTION_TYPES.RESET_ERROR });
  };

  return {
    state,
    fetchMetadata,
    fetchAirQualityData,
    handleCloseError,
  };
};
