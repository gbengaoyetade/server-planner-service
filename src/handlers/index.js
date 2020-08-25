exports.computeServerCapacity = (req, res) => {
  const { server, virtualMachines } = req.body;
  let { CPU, RAM, HDD } = server;
  
  let serverCapacity = 0;

  virtualMachines.forEach((machine) => {
   const tempCPUSize = CPU - machine.CPU;
   const tempRAMSize = RAM - machine.RAM;
   const tempHDDSize = HDD - machine.HDD;

  if(tempCPUSize >= 0 && tempHDDSize >= 0 && tempRAMSize >= 0) {
    CPU = tempCPUSize;
    RAM = tempRAMSize;
    HDD = tempHDDSize;
    serverCapacity += 1;
  }

  });

  res.send({ serverCapacity });
}
