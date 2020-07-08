import { Role } from './roles'

import { MyCreep } from './Creep'

export default class Builder extends MyCreep {
  creep: Creep

  constructor(creep: Creep) {
    super(creep)

    this.creep = creep
    this.creep.memory.role = Role.builder
  }

  get isBuilding(): boolean {
    return this.creep.memory.building === true
  }

  set isBuilding(building: boolean) {
    this.creep.memory.building = building
  }

  goBuild(target: ConstructionSite): void {
    if (this.creep.build(target) === ERR_NOT_IN_RANGE) {
      this.creep.moveTo(target, {
        visualizePathStyle: {
          stroke: 'Navy',
        },
      })
    }
  }

  run(): void {
    if (this.isBuilding && !this.hasEnergy()) {
      this.isBuilding = false

      this.say('🔄 harvest')
    }

    if (!this.isBuilding && !this.hasFreeCapacity()) {
      this.isBuilding = true

      this.say('🚧 build')
    }

    if (this.isBuilding) {
      const buildingTargets = this.creep.room.find(FIND_CONSTRUCTION_SITES)

      if (buildingTargets.length > 0) {
        this.goBuild(buildingTargets[0])
      }
    } else {
      this.harvestClosest()
    }
  }
}
