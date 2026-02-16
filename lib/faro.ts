import {
  ReactIntegration,
  createReactRouterV6Options,
  getWebInstrumentations,
  initializeFaro,
} from '@grafana/faro-react';
import { TracingInstrumentation } from '@grafana/faro-web-tracing';
import {
  createRoutesFromChildren,
  matchRoutes,
  useLocation,
  useNavigationType,
} from 'react-router-dom';

const collectorUrl = import.meta.env.VITE_FARO_COLLECTOR_URL as string | undefined;

export function initFaro() {
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
        router: createReactRouterV6Options({
          useLocation,
          useNavigationType,
          createRoutesFromChildren,
          matchRoutes,
        }),
      }),
    ],
  });
}
