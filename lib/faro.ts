import {
  ReactIntegration,
  createReactRouterV7Options,
  getWebInstrumentations,
  initializeFaro,
} from '@grafana/faro-react';
import { TracingInstrumentation } from '@grafana/faro-web-tracing';
import {
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

  initializeFaro({
    url: collectorUrl,
    app: {
      name: (import.meta.env.VITE_APP_NAME as string | undefined) ?? 'Portafolio Sebastian',
      version: (import.meta.env.VITE_APP_VERSION as string | undefined) ?? 'dev',
      environment: import.meta.env.MODE,
    },
    instrumentations: [
      ...getWebInstrumentations(),
      new TracingInstrumentation(),
      new ReactIntegration({
        router: createReactRouterV7Options({
          useLocation,
          useNavigationType,
          createRoutesFromChildren,
          matchRoutes,
        }),
      }),
    ],
  });
}
