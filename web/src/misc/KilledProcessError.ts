
export class KilledProcessError extends Error {
  constructor (message: string = 'Stopped') {
    super(message);
  }
}
