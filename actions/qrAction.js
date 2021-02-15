import { qrService } from '../services';

const SCAN_QR = 'qr/scan';

const scan = (cjihao, mjihao, qr, status, time) => {
  console.log('come in qr scan action');
  console.log(cjihao, mjihao, qr, status, time);
  return async () => {
    await qrService
      .callScan(cjihao, mjihao, qr, status, time)
      .then((status) => status);
  };
};

export const qrAction = {
  SCAN_QR,
  scan,
};
