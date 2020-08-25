const { computeServerCapacity } = require('../routeHandler');

describe('computeServerCapacity', function () {
  beforeAll(() => {
    this.res = { send: jest.fn() };
  });

  it('should return 0 when server capacity is not enough for virtual machines', () => {
    const req = {
      body: {
        server: { CPU: 2, RAM: 32, HDD: 100 },
        virtualMachines: [
          { CPU: 3, RAM: 16, HDD: 10 },
          { CPU: 2, RAM: 33, HDD: 10 },
          { CPU: 3, RAM: 32, HDD: 100 },
        ],
      },
    };
    computeServerCapacity(req, this.res);
    expect(this.res.send).toHaveBeenCalledWith({ serverCapacity: 0 });
  });

  it('should return accurate serverCapacity number', () => {
    const req = {
      body: {
        server: { CPU: 2, RAM: 32, HDD: 100 },
        virtualMachines: [
          { CPU: 1, RAM: 16, HDD: 10 },
          { CPU: 1, RAM: 16, HDD: 10 },
          { CPU: 2, RAM: 32, HDD: 100 },
        ],
      },
    };
    computeServerCapacity(req, this.res);
    expect(this.res.send).toHaveBeenCalledWith({ serverCapacity: 2 });
  });
});
