const hasRequiredFields = (body) => {
  if ('server' in body && 'virtualMachines' in body) {
    return true;
  }
  return false;
};

const serverFieldIsValid = (server) => {
  if (server.CPU === undefined || isNaN(server.CPU)) return false;
  if (server.HDD === undefined || isNaN(server.HDD)) return false;
  if (server.RAM === undefined || isNaN(server.RAM)) return false;
  return true;
};

const virtualMachinesAreValid = (virtualMachines) => {
  if (!Array.isArray(virtualMachines)) return false;

  const hasErrors = virtualMachines.some((machine) => {
    return !serverFieldIsValid(machine);
  });

  return !hasErrors;
};

exports.validateServerCapacityRoute = (req, res, next) => {
  const { body } = req;
  if (!hasRequiredFields(body)) {
    return res
      .status(400)
      .send({ error: "'server' and 'virtualMachines' fields are required" });
  }

  if (!serverFieldIsValid(body.server)) {
    return res
      .status(400)
      .send({ error: 'server field has invalid keys or values' });
  }

  if (!virtualMachinesAreValid(body.virtualMachines)) {
    return res
      .status(400)
      .send({
        error: 'virtualMachines array contains wrongly formatted inputs',
      });
  }

  return next();
};
