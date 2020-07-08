import { Role } from './roles'

import { MyCreep } from './Creep'

export default class Harvester extends MyCreep {
  creep: Creep

  constructor(creep: Creep) {
    super(creep)

    this.creep = creep
    this.creep.memory.role = Role.harvester
  }

  run(): void {
    if (this.hasFreeCapacity()) {
      const sources = this.creep.room.find(FIND_SOURCES)

      this.harvestFromSource(sources[0])
    } else {
      const transferTargets = this.creep.room.find(FIND_STRUCTURES, {
        filter: (structure) => {
          return (
            (structure instanceof StructureExtension ||
              structure instanceof StructureSpawn ||
              structure instanceof StructureTower) &&
            structure.store.getFreeCapacity(RESOURCE_ENERGY) > 0
          )
        },
      })

      if (transferTargets.length > 0) {
        this.transferToTarget(transferTargets[0], RESOURCE_ENERGY)
      }
    }
  }
}
