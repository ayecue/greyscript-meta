const { greyscriptMeta } = require('../dist');

describe('greyscriptMeta', () => {
  test('should return signatures', () => {
    expect(greyscriptMeta.getTypeSignature('general')).not.toBeNull();
  });
});