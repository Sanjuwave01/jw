import axios from 'axios';

const fetchStepCount = async (token) => {
  const startTimeMillis = new Date().setHours(0, 0, 0, 0);
  const endTimeMillis = new Date().getTime();

  const body = {
    aggregateBy: [{
      dataTypeName: 'com.google.step_count.delta',
    }],
    bucketByTime: { durationMillis: 86400000 },
    startTimeMillis,
    endTimeMillis,
  };

  try {
    const response = await axios.post('https://www.googleapis.com/fitness/v1/users/me/dataset:aggregate', body, {
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
      }
    });

    console.log('Step Count Data:', response.data);
    return response.data;
  } catch (error) {
    console.error('Error fetching step count data:', error);
  }
};


export default fetchStepCount;