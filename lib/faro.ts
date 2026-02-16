import {
  ReactIntegration,
  createReactRouterV7Options,
  getWebInstrumentations,
  initializeFaro,
} from '@grafana/faro-react';
import { TracingInstrumentation } from '@grafana/faro-web-tracing';
import {
  Routes as RouterRoutes,
  useLocation,
  useNavigationType,
} from 'react-router-dom';
import { createRoutesFromChildren, matchRoutes } from 'react-router';

const collectorUrl = import.meta.env.VITE_FARO_COLLECTOR_URL as string | undefined;
const faroEnabledEnv = import.meta.env.VITE_FARO_ENABLED as string | undefined;

const isFaroEnabled = faroEnabledEnv
  ? faroEnabledEnv.toLowerCase() === 'true'
  : import.meta.env.PROD;

export function initFaro() {
  if (!isFaroEnabled) return;
  if (!collectorUrl) return;

  const app = {
    name: (import.meta.env.VITE_APP_NAME as string | undefined) ?? 'Portafolio Sebastian',
    version: (import.meta.env.VITE_APP_VERSION as string | undefined) ?? 'dev',
    environment: import.meta.env.MODE,
  };

  const baseInstrumentations = [...getWebInstrumentations(), new TracingInstrumentation()];

  const hasRouterDeps =
    typeof RouterRoutes === 'function' &&
    typeof useLocation === 'function' &&
    typeof useNavigationType === 'function' &&
    typeof createRoutesFromChildren === 'function' &&
    typeof matchRoutes === 'function';

  if (hasRouterDeps) {
    try {
      initializeFaro({
        url: collectorUrl,
        app,
        instrumentations: [
          ...baseInstrumentations,
          new ReactIntegration({
            router: createReactRouterV7Options({
              Routes: RouterRoutes,
              useLocation,
              useNavigationType,
              createRoutesFromChildren,
              matchRoutes,
            }),
          }),
        ],
      });
      return;
    } catch {
      // fall through
    }
  }

  try {
    initializeFaro({
      url: collectorUrl,
      app,
      instrumentations: baseInstrumentations,
    });
  } catch {
    // ignore
  }
}
