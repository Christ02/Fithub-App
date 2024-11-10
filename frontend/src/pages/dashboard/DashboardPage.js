// src/pages/dashboard/DashboardPage.js
import React, { useEffect, useState, useMemo } from 'react';
import Navbar from '../../components/Navbar/Navbar';
import { getNutritionRecords } from '../../api/nutritionApi';
import { getExerciseRecords } from '../../api/exerciseApi';
import { getAllSleepRecords } from '../../api/sleepApi';
import { Bar, Line, Doughnut } from 'react-chartjs-2';
import 'chart.js/auto';
import './DashboardPage.css';
import dayjs from 'dayjs';
import PropTypes from 'prop-types';

// Componente Reutilizable para las Tarjetas de Resumen
const SummaryCard = ({ title, ChartComponent, data, options }) => (
  <div className="card" aria-labelledby={`${title}-title`}>
    <h2 id={`${title}-title`}>{title}</h2>
    <div className="chart-container">
      <ChartComponent data={data} options={options} aria-label={title} />
    </div>
  </div>
);

SummaryCard.propTypes = {
  title: PropTypes.string.isRequired,
  ChartComponent: PropTypes.elementType.isRequired,
  data: PropTypes.object.isRequired,
  options: PropTypes.object.isRequired,
};

const DashboardPage = () => {
  // Definir el userId estáticamente aquí
  const userId = 1; // Reemplaza esto con el userId actual

  const [nutritionData, setNutritionData] = useState([]);
  const [exerciseData, setExerciseData] = useState([]);
  const [sleepData, setSleepData] = useState([]);
  // const [weightData, setWeightData] = useState([]); // Descomenta si tienes datos de peso

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const lastWeekDate = useMemo(() => dayjs().subtract(7, 'day').format('YYYY-MM-DD'), []);

  // Función para obtener los datos del usuario
  const fetchData = async () => {
    setLoading(true);
    setError(null);
    try {
      const [nutrition, exercise, sleep /*, weight */] = await Promise.all([
        getNutritionRecords(userId),
        getExerciseRecords(userId),
        getAllSleepRecords(userId),
        // getWeightRecords(userId), // Descomenta si tienes una API para peso
      ]);

      console.log('Datos de Nutrición:', nutrition);
      console.log('Datos de Ejercicio:', exercise);
      console.log('Datos de Sueño:', sleep);

      const filteredNutrition = nutrition.filter(record => dayjs(record.date).isAfter(lastWeekDate));
      const filteredExercise = exercise.filter(record => dayjs(record.date).isAfter(lastWeekDate));
      const filteredSleep = sleep.filter(record => dayjs(record.date).isAfter(lastWeekDate));
      // const filteredWeight = weight.filter(record => dayjs(record.date).isAfter(lastWeekDate));

      setNutritionData(filteredNutrition);
      setExerciseData(filteredExercise);
      setSleepData(filteredSleep);
      // setWeightData(filteredWeight);
    } catch (error) {
      console.error('Error fetching data:', error);
      if (error.response) {
        // El servidor respondió con un status fuera del rango 2xx
        setError(`Error ${error.response.status}: ${error.response.data.message || 'Error al obtener los datos.'}`);
      } else if (error.request) {
        // La solicitud fue hecha pero no se recibió respuesta
        setError('No se recibió respuesta del servidor. Verifica tu conexión a Internet.');
      } else {
        // Algo pasó al configurar la solicitud
        setError(`Error: ${error.message}`);
      }
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Definir los datos de los gráficos
  const calorieChartData = useMemo(() => ({
    labels: nutritionData.map(item => dayjs(item.date).format('DD/MM/YYYY')),
    datasets: [
      {
        label: 'Calorías Consumidas',
        data: nutritionData.map(item => item.calories),
        backgroundColor: 'rgba(75, 192, 192, 0.6)',
        borderColor: 'rgba(75, 192, 192, 1)',
        borderWidth: 1,
      },
    ],
  }), [nutritionData]);

  const exerciseChartData = useMemo(() => ({
    labels: exerciseData.map(item => dayjs(item.date).format('DD/MM/YYYY')),
    datasets: [
      {
        label: 'Calorías Quemadas (Ejercicio)',
        data: exerciseData.map(item => item.caloriesBurned),
        backgroundColor: 'rgba(54, 162, 235, 0.6)',
        borderColor: 'rgba(54, 162, 235, 1)',
        borderWidth: 1,
        fill: false,
      },
    ],
  }), [exerciseData]);

  const sleepChartData = useMemo(() => ({
    labels: sleepData.map(item => dayjs(item.date).format('DD/MM/YYYY')),
    datasets: [
      {
        label: 'Horas de Sueño',
        data: sleepData.map(item => item.sleepDuration),
        backgroundColor: 'rgba(255, 206, 86, 0.6)',
        borderColor: 'rgba(255, 206, 86, 1)',
        borderWidth: 1,
      },
    ],
  }), [sleepData]);

  // Datos para Macronutrientes
  const macroTotals = useMemo(() => {
    const totalProtein = nutritionData.reduce((sum, item) => sum + item.protein, 0);
    const totalCarbs = nutritionData.reduce((sum, item) => sum + item.carbohydrates, 0);
    const totalFats = nutritionData.reduce((sum, item) => sum + item.fats, 0);
    return { totalProtein, totalCarbs, totalFats };
  }, [nutritionData]);

  const macroChartData = useMemo(() => ({
    labels: ['Proteínas', 'Carbohidratos', 'Grasas'],
    datasets: [
      {
        data: [macroTotals.totalProtein, macroTotals.totalCarbs, macroTotals.totalFats],
        backgroundColor: ['#36A2EB', '#FF6384', '#FFCE56'],
        hoverBackgroundColor: ['#36A2EB', '#FF6384', '#FFCE56'],
      },
    ],
  }), [macroTotals]);

  // Calorías Netas
  const netCalories = useMemo(() => {
    const net = {};
    nutritionData.forEach(item => {
      const date = dayjs(item.date).format('DD/MM/YYYY');
      net[date] = (net[date] || 0) + item.calories;
    });
    exerciseData.forEach(item => {
      const date = dayjs(item.date).format('DD/MM/YYYY');
      net[date] = (net[date] || 0) - item.caloriesBurned;
    });
    return net;
  }, [nutritionData, exerciseData]);

  const netCalorieChartData = useMemo(() => ({
    labels: Object.keys(netCalories),
    datasets: [
      {
        label: 'Calorías Netas',
        data: Object.values(netCalories),
        backgroundColor: 'rgba(255, 99, 132, 0.6)',
        borderColor: 'rgba(255, 99, 132, 1)',
        borderWidth: 1,
      },
    ],
  }), [netCalories]);

  // Datos para Calidad del Sueño (Distribución)
  const sleepQuality = useMemo(() => {
    const quality = {
      averageDuration: 0,
      countExcellent: 0,
      countGood: 0,
      countRegular: 0,
      countBad: 0,
    };
    if (sleepData.length === 0) return quality;
    
    sleepData.forEach(item => {
      quality.averageDuration += item.sleepDuration;
      switch(item.sleepQuality) {
        case 'Excelente':
          quality.countExcellent += 1;
          break;
        case 'Buena':
          quality.countGood += 1;
          break;
        case 'Regular':
          quality.countRegular += 1;
          break;
        case 'Mala':
          quality.countBad += 1;
          break;
        default:
          break;
      }
    });
    
    quality.averageDuration /= sleepData.length;
    
    return quality;
  }, [sleepData]);

  const sleepQualityDistribution = useMemo(() => ({
    labels: ['Excelente', 'Buena', 'Regular', 'Mala'],
    datasets: [
      {
        label: 'Calidad del Sueño',
        data: [
          sleepQuality.countExcellent,
          sleepQuality.countGood,
          sleepQuality.countRegular,
          sleepQuality.countBad,
        ],
        backgroundColor: ['#36A2EB', '#FF6384', '#FFCE56', '#E74C3C'],
        hoverBackgroundColor: ['#36A2EB', '#FF6384', '#FFCE56', '#E74C3C'],
      },
    ],
  }), [sleepQuality]);

  // Datos para Calorías Consumidas vs Quemadas
  const combinedCalorieChartData = useMemo(() => {
    const labels = [...new Set([
      ...nutritionData.map(item => dayjs(item.date).format('DD/MM/YYYY')),
      ...exerciseData.map(item => dayjs(item.date).format('DD/MM/YYYY')),
    ])].sort((a, b) => dayjs(a, 'DD/MM/YYYY').isBefore(dayjs(b, 'DD/MM/YYYY')) ? -1 : 1);

    const consumed = labels.map(label => {
      const record = nutritionData.find(item => dayjs(item.date).format('DD/MM/YYYY') === label);
      return record ? record.calories : 0;
    });

    const burned = labels.map(label => {
      const record = exerciseData.find(item => dayjs(item.date).format('DD/MM/YYYY') === label);
      return record ? record.caloriesBurned : 0;
    });

    return {
      labels,
      datasets: [
        {
          type: 'bar',
          label: 'Calorías Consumidas',
          data: consumed,
          backgroundColor: 'rgba(75, 192, 192, 0.6)',
          borderColor: 'rgba(75, 192, 192, 1)',
          borderWidth: 1,
        },
        {
          type: 'line',
          label: 'Calorías Quemadas',
          data: burned,
          backgroundColor: 'rgba(255, 99, 132, 0.6)',
          borderColor: 'rgba(255, 99, 132, 1)',
          borderWidth: 2,
          fill: false,
        },
      ],
    };
  }, [nutritionData, exerciseData]);

  const chartOptions = useMemo(() => ({
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: true,
        position: 'top',
      },
      tooltip: {
        enabled: true,
      },
    },
    scales: {
      y: {
        beginAtZero: true,
        title: {
          display: true,
          text: 'Calorías',
        },
      },
      x: {
        ticks: {
          autoSkip: true,
          maxTicksLimit: 7,
        },
      },
    },
  }), []);

  // Renderizado de Estado de Carga
  if (loading) {
    return (
      <div className="dashboard-container">
        <Navbar />
        <div className="loading" role="status">
          <span className="spinner"></span> Cargando datos...
        </div>
      </div>
    );
  }

  // Renderizado de Estado de Error
  if (error) {
    return (
      <div className="dashboard-container">
        <Navbar />
        <div className="error-message" role="alert">
          {error}
        </div>
      </div>
    );
  }

  // Renderizado Principal
  return (
    <div className="dashboard-container">
      <Navbar />
      <header>
        <h1>Resumen Histórico (Última Semana)</h1>
      </header>

      <div className="summary-cards">
        <SummaryCard
          title="Calorías Consumidas"
          ChartComponent={Bar}
          data={calorieChartData}
          options={{
            ...chartOptions,
            plugins: {
              ...chartOptions.plugins,
              legend: { display: false },
            },
          }}
        />

        <SummaryCard
          title="Calorías Quemadas (Ejercicio)"
          ChartComponent={Line}
          data={exerciseChartData}
          options={{
            ...chartOptions,
            plugins: {
              ...chartOptions.plugins,
              legend: { display: false },
            },
          }}
        />

        <SummaryCard
          title="Horas de Sueño"
          ChartComponent={Bar}
          data={sleepChartData}
          options={{
            ...chartOptions,
            plugins: {
              ...chartOptions.plugins,
              legend: { display: false },
            },
          }}
        />

        {/* Gráfico de Distribución de Macronutrientes */}
        <SummaryCard
          title="Distribución de Macronutrientes"
          ChartComponent={Doughnut}
          data={macroChartData}
          options={{
            ...chartOptions,
            plugins: {
              ...chartOptions.plugins,
              legend: { display: true, position: 'bottom' },
            },
          }}
        />

        {/* Gráfico de Calorías Netas */}
        <SummaryCard
          title="Calorías Netas"
          ChartComponent={Bar}
          data={netCalorieChartData}
          options={{
            ...chartOptions,
            plugins: {
              ...chartOptions.plugins,
              legend: { display: false },
            },
            scales: {
              y: {
                ...chartOptions.scales.y,
                title: {
                  display: true,
                  text: 'Calorías',
                },
              },
            },
          }}
        />

        {/* Gráfico de Tendencia de Peso */}
        {/* Descomenta si tienes datos de peso
        <SummaryCard
          title="Tendencia de Peso"
          ChartComponent={Line}
          data={weightChartData}
          options={{
            ...chartOptions,
            plugins: {
              ...chartOptions.plugins,
              legend: { display: false },
            },
          }}
        /> */}

        {/* Gráfico de Distribución de la Calidad del Sueño */}
        <SummaryCard
          title="Distribución de la Calidad del Sueño"
          ChartComponent={Doughnut}
          data={sleepQualityDistribution}
          options={{
            ...chartOptions,
            plugins: {
              ...chartOptions.plugins,
              legend: { display: true, position: 'bottom' },
            },
          }}
        />

        {/* Gráfico Combinado de Calorías Consumidas vs Quemadas */}
        <SummaryCard
          title="Calorías Consumidas vs Quemadas"
          ChartComponent={Bar} // Chart.js manejará el tipo combinado
          data={combinedCalorieChartData}
          options={{
            ...chartOptions,
            plugins: {
              ...chartOptions.plugins,
              legend: { display: true, position: 'top' },
            },
            scales: {
              ...chartOptions.scales,
              y: {
                ...chartOptions.scales.y,
                title: {
                  display: true,
                  text: 'Calorías',
                },
              },
            },
          }}
        />
      </div>
      <footer>
        <p>&copy; 2024 Tu Empresa. Todos los derechos reservados.</p>
      </footer>
    </div>
  );
};

export default DashboardPage;
