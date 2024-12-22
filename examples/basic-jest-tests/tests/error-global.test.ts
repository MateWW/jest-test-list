throw new Error('Global error in test file');

describe('Will be never released to the world', () => {
  test('and will die in the darkness', () => {
    throw new Error('Help me, I am trapped in a test file!');
  })
});
