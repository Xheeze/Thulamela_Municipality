import { useState, useEffect } from 'react';
import storage from '@shared/services/storage';

/**
 * Custom hook for managing queue state with auto-refresh
 * @param {number} refreshInterval - Auto-refresh interval in milliseconds (default: 5000)
 * @returns {object} Queue state and helper functions
 */
export function useQueue(refreshInterval = 5000) {
  const [queue, setQueue] = useState(getQueueState());
  const [lastUpdate, setLastUpdate] = useState(new Date());

  function getQueueState() {
    try {
      const queueData = storage.getQueueState();
      if (queueData && typeof queueData === 'object' && queueData.nowServing) {
        return queueData;
      }
    } catch (error) {
      console.error('Error getting queue state:', error);
    }
    // Fallback
    return { nowServing: 'A092', next: ['A093', 'A094', 'A095'], counter: 'Counter 3' };
  }

  function refreshQueue() {
    const newQueue = getQueueState();
    setQueue(newQueue);
    setLastUpdate(new Date());
    return newQueue;
  }

  function callNext() {
    try {
      storage.callNext();
      return refreshQueue();
    } catch (error) {
      console.error('Error calling next:', error);
      return queue;
    }
  }

  function addToQueue(ticket) {
    try {
      storage.addToQueue(ticket);
      return refreshQueue();
    } catch (error) {
      console.error('Error adding to queue:', error);
      return queue;
    }
  }

  useEffect(() => {
    // Initial load
    refreshQueue();

    // Set up auto-refresh
    if (refreshInterval > 0) {
      const interval = setInterval(() => {
        refreshQueue();
      }, refreshInterval);

      return () => clearInterval(interval);
    }
  }, [refreshInterval]);

  return {
    queue,
    lastUpdate,
    refreshQueue,
    callNext,
    addToQueue,
    waitingCount: queue.next?.length || 0,
    estimatedWait: (queue.next?.length || 0) * 3 // 3 mins per person
  };
}

export default useQueue;
