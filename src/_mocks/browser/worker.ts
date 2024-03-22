import { setupWorker } from 'msw/browser';
import { handlers } from '../handlers/handler';

export const worker = setupWorker(...handlers);
