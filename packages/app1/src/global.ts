import  beacon from '@firesoon/log-sdk';
// import { sendLogs } from '@/services';

const autoClickHandle = (e) => {
  const LogData = beacon.getLogData(e);

  if (LogData) {
    const logs = {
      ...LogData,
      menuNo: sessionStorage.getItem('activeKey'),
      menuUuid: sessionStorage.getItem('menuUid'),
      eventType: 'click'
    };
    console.log(logs);
  }
};
beacon.listener.on(document.body, 'click', autoClickHandle);
