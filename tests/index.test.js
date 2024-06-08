const { greyscriptMeta } = require('../dist');

describe('greyscriptMeta', () => {
  test('should return signatures', () => {
    expect(greyscriptMeta.getTypeSignature('general')).not.toBeNull();
  });

  test('should return multiple matches', () => {
    const matches = greyscriptMeta.searchDefinitionMatches(['map', 'string', 'list'], 'hasIndex');
    expect([...matches.keys()]).toEqual(['map', 'string', 'list']);
  });

  test('should return parent match', () => {
    const matches = greyscriptMeta.searchDefinitionMatches('file', 'hasIndex');
    expect([...matches.keys()]).toEqual(['map']);
  });
});