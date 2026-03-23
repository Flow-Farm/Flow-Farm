import { useState, useEffect } from "react";
import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  LineElement,
  CategoryScale,
  LinearScale,
  PointElement,
  Legend,
  Tooltip
} from "chart.js";

ChartJS.register(
  LineElement,
  CategoryScale,
  LinearScale,
  PointElement,
  Legend,
  Tooltip
);

export default function PerformanceChart() {
  // STATE MANAGEMENT
  // We initialize with empty arrays so the chart doesn't crash before data arrives
  const [chartData, setChartData] = useState({
    labels: [],
    datasets: []
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  //DATA FETCHING (INTEGRATION LAYER)
  useEffect(() => {
    // Calling live Azure Backend
    fetch("https://flowfarm-backend-e7e0b6bgdcbvf9be.switzerlandnorth-01.azurewebsites.net/api/sensors")
      .then((response) => {
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        return response.json();
      })
      .then((apiData) => {
        // MAPPING BACKEND DATA TO FRONTEND CHART
        setChartData({
          labels: apiData.labels, // Expected: ["9am", "10am", ...]
          datasets: [
            {
              label: "Temperature",
              data: apiData.tempData,
              borderColor: "#87aece",
              backgroundColor: "#87aece",
              tension: 0.4,
              borderWidth: 2,
              pointRadius: 4,
              pointHoverRadius: 6,
            },
            {
              label: "Water Level",
              data: apiData.waterData,
              borderColor: "#1d2a62",
              backgroundColor: "#1d2a62",
              tension: 0.4,
              borderWidth: 2,
              pointRadius: 4,
            },
            {
              label: "pH",
              data: apiData.phData,
              borderColor: "#afd063",
              backgroundColor: "#afd063",
              tension: 0.4,
              borderWidth: 2,
              pointRadius: 4,
            }
          ]
        });
        setLoading(false);
      })
      .catch((err) => {
        // ERROR HANDLING (.catch)
        console.error("Fetch error:", err);
        setError("⚠️ System Offline: Unable to load live sensor data.");
        setLoading(false);
      });
  }, []);

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: "top",
        align: "start",
        labels: {
          usePointStyle: true,
          pointStyle: "circle",
          padding: 20,
        }
      }
    },
    scales: {
      x: {
        grid: {
          display: false
        }
      },
      y: {
        grid: {
          color: "rgba(0,0,0,0.05)"
        },
        ticks: {
          display: false
        }
      }
    }
  };

  // CONDITIONAL RENDERING
  if (loading) {
    return (
      <div className="bg-[#ededed] p-6 rounded-2xl shadow-md flex justify-center items-center h-64">
        <p className="text-[#1d2a62] font-semibold animate-pulse">Connecting to SAFS Cloud...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-[#ededed] p-6 rounded-2xl shadow-md border-2 border-red-200">
        <h2 className="text-lg font-bold mb-4 text-[#1d2a62]">Performance</h2>
        <div className="flex flex-col items-center justify-center h-48 text-center">
          <p className="text-red-600 font-medium mb-2">{error}</p>
          <button 
            onClick={() => window.location.reload()}
            className="text-xs bg-[#1d2a62] text-white px-3 py-1 rounded-full hover:bg-opacity-80"
          >
            Retry Connection
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-[#ededed] p-6 rounded-2xl shadow-md">
      <h2 className="text-lg font-bold mb-4 text-[#1d2a62]">Performance</h2>
      <Line data={chartData} options={options} />
    </div>
  );
}
