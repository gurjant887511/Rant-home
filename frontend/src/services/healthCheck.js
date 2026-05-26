// Service to keep backend alive and prevent Render from spinning down
import apiClient from './api';

const HEALTH_CHECK_INTERVAL = 4 * 60 * 1000; // Every 4 minutes (Render spins down after 15 min of inactivity)
let healthCheckTimer = null;

/**
 * Start periodic health checks to keep the backend alive
 * This prevents Render free tier from spinning down the dyno
 */
export const startHealthCheck = () => {
  // Don't start multiple timers
  if (healthCheckTimer) {
    return;
  }

  console.log('🏥 Starting backend health checks...');
  
  // Run immediately once
  pingBackend();
  
  // Then run periodically
  healthCheckTimer = setInterval(pingBackend, HEALTH_CHECK_INTERVAL);
};

/**
 * Stop health checks
 */
export const stopHealthCheck = () => {
  if (healthCheckTimer) {
    clearInterval(healthCheckTimer);
    healthCheckTimer = null;
    console.log('⏹️ Stopped backend health checks');
  }
};

/**
 * Ping the backend to keep it alive
 */
const pingBackend = async () => {
  try {
    await apiClient.get('/health', { timeout: 5000 });
    console.log('✅ Backend health check passed');
  } catch (error) {
    console.warn('⚠️ Backend health check failed (will retry):', error.message);
  }
};

export default {
  startHealthCheck,
  stopHealthCheck
};
