import React, { useState, useEffect } from "react";
import { parse } from "date-fns";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import {
  AppBar,
  Toolbar,
  Typography,
  Container,
  TextField,
  MenuItem,
  Button,
  Card,
  CardContent,
  CircularProgress,
  Snackbar,
} from "@mui/material";
import { LocalizationProvider, DateTimePicker } from "@mui/x-date-pickers";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { useFetchData } from "./hooks/useFetchData";
import { parseToDate } from "./utils/common-utility";
import {
  AIR_QUALITY_PARAMETER_DESCRIPTION,
  AIR_QUALITY_PARAMETERS,
} from "./utils/constants";

export default function AirQualityDashboard() {
  const { state, fetchMetadata, fetchAirQualityData, handleCloseError } =
    useFetchData();
  const { metadata, airQualityData, loading, error } = state;

  const [selectedParam, setSelectedParam] = useState(AIR_QUALITY_PARAMETERS[0]);
  const [startDate, setStartDate] = useState(
    parse("2004-03-10", "yyyy-MM-dd", new Date()) // starting start date
  );
  const [endDate, setEndDate] = useState(
    parse("2004-04-10", "yyyy-MM-dd", new Date()) // starting end date
  );

  useEffect(() => {
    fetchMetadata();
  }, [fetchMetadata]);

  useEffect(() => {
    if (startDate && endDate) {
      fetchAirQualityData({
        from_date_time: startDate,
        to_date_time: endDate,
        field: selectedParam,
      });
    }
  }, [selectedParam, startDate, endDate, fetchAirQualityData]);

  return (
    <LocalizationProvider dateAdapter={AdapterDateFns}>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" sx={{ flexGrow: 1 }}>
            Air Quality Dashboard
          </Typography>
        </Toolbar>
      </AppBar>
      <Container sx={{ marginTop: 4 }}>
        {error && (
          <Snackbar
            open={Boolean(error)}
            message={error}
            onClose={handleCloseError}
            autoHideDuration={2000}
          />
        )}
        <Card sx={{ maxWidth: 800, margin: "auto", padding: 2 }}>
          <CardContent>
            <div
              style={{ display: "flex", flexDirection: "column", gap: "16px" }}
            >
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  gap: "16px",
                  flexWrap: "wrap",
                }}
              >
                <DateTimePicker
                  label="Start Date"
                  value={startDate}
                  minDate={parseToDate(metadata?.min_date)}
                  maxDate={parseToDate(metadata?.max_date)}
                  onChange={setStartDate}
                  renderInput={(params) => <TextField {...params} fullWidth />}
                />

                <DateTimePicker
                  label="End Date"
                  value={endDate}
                  minDate={
                    startDate ? startDate : parseToDate(metadata?.min_date)
                  }
                  maxDate={parseToDate(metadata?.max_date)}
                  onChange={setEndDate}
                  renderInput={(params) => <TextField {...params} fullWidth />}
                />
                <TextField
                  select
                  label="Parameter"
                  value={selectedParam}
                  onChange={(e) => setSelectedParam(e.target.value)}
                  fullWidth
                >
                  {AIR_QUALITY_PARAMETERS.map((param) => (
                    <MenuItem value={param} key={param}>
                      {AIR_QUALITY_PARAMETER_DESCRIPTION[param]}
                    </MenuItem>
                  ))}
                </TextField>
              </div>
              <Button
                variant="contained"
                color="primary"
                onClick={() => {
                  setStartDate(null);
                  setEndDate(null);
                }}
              >
                Reset Dates
              </Button>
            </div>
            <ResponsiveContainer width="100%" height={400}>
              {loading ? (
                <div
                  style={{
                    display: "flex",
                    justifyContent: "center",
                    padding: "20px",
                  }}
                >
                  <CircularProgress />
                </div>
              ) : (
                <LineChart
                  data={airQualityData}
                  margin={{ top: 20, right: 30, left: 0, bottom: 5 }}
                >
                  <XAxis dataKey="date_time" stroke="#8884d8" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Line
                    type="monotone"
                    dataKey={selectedParam}
                    label={AIR_QUALITY_PARAMETER_DESCRIPTION[selectedParam]}
                    stroke="#82ca9d"
                    strokeWidth={2}
                  />
                </LineChart>
              )}
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </Container>
      <footer
        style={{
          textAlign: "center",
          padding: "20px",
          marginTop: "20px",
          backgroundColor: "#f1f1f1",
        }}
      >
        <Typography variant="body2">
          &copy; 2025 Air Quality Dashboard
        </Typography>
      </footer>
    </LocalizationProvider>
  );
}
