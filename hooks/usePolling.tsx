// src/hooks/useVerificationPolling.ts
import { useEffect } from "react";

export const usePolling = (
  checkStatus: () => Promise<boolean>,
  onVerified: () => void,
  interval = 5000,
  timeout = 300000
) => {
  useEffect(() => {
    let pollInterval: NodeJS.Timeout;
    const timeoutId = setTimeout(() => {
      clearInterval(pollInterval);
    }, timeout);

    const startPolling = async () => {
      pollInterval = setInterval(async () => {
        const isVerified = await checkStatus();
        if (isVerified) {
          clearInterval(pollInterval);
          clearTimeout(timeoutId);
          onVerified();
        }
      }, interval);
    };

    startPolling();
    return () => {
      clearInterval(pollInterval);
      clearTimeout(timeoutId);
    };
  }, [checkStatus, onVerified, interval, timeout]);
};
