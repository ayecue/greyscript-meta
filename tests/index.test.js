const { greyscriptMeta } = require('../dist');

describe('greyscriptMeta', () => {
  test('should return signatures', () => {
    expect(greyscriptMeta.getSignaturesByType('general')).not.toBeNull();
  });
});