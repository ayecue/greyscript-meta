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

  test('should return available tags', () => {
    const tags = greyscriptMeta.getAvailableTags();
    expect(tags).toEqual(['method', 'function', 'general', 'ssh incompatible', 'detached']);
  });

  test('should return available signatures for id', () => {
    const signaturesForHasIndex = greyscriptMeta.getDefinitionsById('hasIndex');
    expect(signaturesForHasIndex.map((it) => it.getOrigin())).toEqual(['any', 'general', 'string', 'list', 'map']);

    const signaturesForLocalIp = greyscriptMeta.getDefinitionsById('local_ip');
    expect(signaturesForLocalIp.map((it) => it.getOrigin())).toEqual(['general', 'router']);
  });
});