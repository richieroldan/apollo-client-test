import { useEffect, useState } from 'react';

/* # ---------------------------------------------
# ---------------------------------------------
# Author: Richie Roldan
# Date:   Sunday January 12th 2020
# Last Modified by: Richie Roldan - <roldan.rv@achealth.com.ph>
# Last Modified time: January 12th 2020, 3:12:26 pm
# ---------------------------------------------
# --------------------------------------------- */

function getOnlineStatus() {
  return typeof navigator !== 'undefined' &&
    typeof navigator.onLine === 'boolean'
    ? navigator.onLine
    : true;
}

const useNetwork = () => {
  const [online, setOnline] = useState(getOnlineStatus());

  const goOnline = () => setOnline(true);

  const goOffline = () => setOnline(false);

  useEffect(() => {
    window.addEventListener('online', goOnline);
    window.addEventListener('offline', goOffline);

    return () => {
      window.removeEventListener('online', goOnline);
      window.removeEventListener('offline', goOffline);
    };
  }, []);

  return {
    online,
  };
};

export default useNetwork;
