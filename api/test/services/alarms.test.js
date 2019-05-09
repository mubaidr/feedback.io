const app = require('../../src/app');

describe('\'alarm\' service', () => {
  it('registered the service', () => {
    const service = app.service('alarm');
    expect(service).toBeTruthy();
  });
});
