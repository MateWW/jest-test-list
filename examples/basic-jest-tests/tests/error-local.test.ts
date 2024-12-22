describe('Local error top describe', () => {
  describe('Working describe above error', () => {
    test('I am a working test', () => {});
  })

  describe('As my children you will get error', () => {
    test('I am above error and will appear on the list', () => {});

    throw new Error('Local error in test file');

    test('I am below error and will never appear on list', () => {});
  })

  describe('Working describe after error', () => {
    test('I am a working test', () => {});
  });
});
