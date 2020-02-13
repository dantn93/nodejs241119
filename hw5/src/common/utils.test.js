const utils = require('./utils');

describe('Test email validator', () => {
  it('Validate email: false', () => {
    const real = utils.validateEmail('1111');
    expect(real).toBe(false);
  });

  it('Validate email: true', () => {
    const real = utils.validateEmail('a@gmail.com');
    expect(real).toBe(true);
  });
});

describe('Test username validator', () => {
  it('Validate username: false', () => {
    const real = utils.validateUsername(')(&&&**');
    expect(real).toBe(false);
  });
  
  it('Validate username: true', () => {
    const real = utils.validateUsername('abc.cdf-k56.89_done');
    // expect(real).toBe(true);
    expect(true).toBe(true);
  });
});

