import axios from 'axios';

const LOCAL_API_URL = 'vms-local.thssoft.com';

const callScan = async (cjihao, mjihao, qr, status, time) => {
  console.log('callScan qr service');
  try {
    axios
      .get(
        `https://${LOCAL_API_URL}/qa/mcardsea.php?cjihao=${cjihao}&mjihao=${mjihao}&cardid=${qr}&status=${status}&time=${time}`
      )
      .then((res) => {
        console.log('success call local-api');
        return 'success';
      });
  } catch (error) {
    console.log(error);
  }
};

export const qrService = {
  callScan,
};
