import { setupZoneTestEnv } from 'jest-preset-angular/setup-env/zone';
setupZoneTestEnv();
// Config global para testes
global.console = {
  ...console,

  // Desabilita logs de erro indesejados durante os testes
  log: jest.fn(),
  error: jest.fn(),
  warn: jest.fn(),
};
