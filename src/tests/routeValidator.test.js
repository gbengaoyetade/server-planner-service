const { validateServerCapacityRoute } = require('../helpers/routeValidator');

describe('validateServerCapacityRoute', function () {
  beforeAll(() => {
    this.res = {
      status: jest.fn(function () {
        return this;
      }),
      send: jest.fn(),
    };
    this.next = jest.fn();
  });

  it('should return an error when required fields are not present', () => {
    const req = { body: { server: {} } };
    validateServerCapacityRoute(req, this.res, this.next);
    expect(this.res.status).toHaveBeenCalledWith(400);
    expect(this.res.status(400).send).toHaveBeenCalledWith({
      error: "'server' and 'virtualMachines' fields are required",
    });
  });

  describe('when server and virtualMachines are present but server is not valid', () => {
    it('should send an error message when HDD is invalid', () => {
      const req = { body: { server: { CPU: 'word' }, virtualMachines: [{}] } };
      validateServerCapacityRoute(req, this.res, this.next);
      expect(this.res.status).toHaveBeenCalledWith(400);
      expect(this.res.status(400).send).toHaveBeenCalledWith({
        error: 'server field has invalid keys or values',
      });
    });

    it('should send an error message when CPU is invalid', () => {
      const req = {
        body: { server: { CPU: 2, HDD: 'CHAR' }, virtualMachines: [{}] },
      };
      validateServerCapacityRoute(req, this.res, this.next);
      expect(this.res.status).toHaveBeenCalledWith(400);
      expect(this.res.status(400).send).toHaveBeenCalledWith({
        error: 'server field has invalid keys or values',
      });
    });

    it('should send an error message when RAM is invalid', () => {
      const req = {
        body: { server: { CPU: 2, HDD: 2, RAM: 'RAM' }, virtualMachines: [{}] },
      };
      validateServerCapacityRoute(req, this.res, this.next);
      expect(this.res.status).toHaveBeenCalledWith(400);
      expect(this.res.status(400).send).toHaveBeenCalledWith({
        error: 'server field has invalid keys or values',
      });
    });
  });

  it('should send an error message when server input is valid but virtualMachines are not', () => {
    const req = {
      body: { server: { CPU: 2, RAM: 32, HDD: 100 }, virtualMachines: [{}] },
    };
    validateServerCapacityRoute(req, this.res, this.next);
    expect(this.res.status).toHaveBeenCalledWith(400);
    expect(this.res.status(400).send).toHaveBeenCalledWith({
      error: 'virtualMachines array contains wrongly formatted inputs',
    });
  });

  it('should send an error message when virtualMachines is not an array', () => {
    const req = {
      body: { server: { CPU: 2, RAM: 32, HDD: 100 }, virtualMachines: {} },
    };
    validateServerCapacityRoute(req, this.res, this.next);
    expect(this.res.status).toHaveBeenCalledWith(400);
    expect(this.res.status(400).send).toHaveBeenCalledWith({
      error: 'virtualMachines array contains wrongly formatted inputs',
    });
  });

  it('should call next function when all inputs are valid', () => {
    const req = {
      body: {
        server: { CPU: 2, RAM: 32, HDD: 100 },
        virtualMachines: [{ CPU: 1, RAM: 16, HDD: 10 }],
      },
    };
    validateServerCapacityRoute(req, this.res, this.next);
    expect(this.next).toHaveBeenCalled();
  });
});
