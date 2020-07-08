import { Role } from './roles'

import { MyCreep } from './Creep'

export default class Upgrader extends MyCreep {
  creep: Creep

  constructor(creep: Creep) {
    super(creep)

    this.creep = creep
    this.creep.memory.role = Role.upgrader
  }

  goUpgrade() {
    if (this.creep.room.controller && this.creep.upgradeController(this.creep.room.controller) === ERR_NOT_IN_RANGE) {
      this.creep.moveTo(this.creep.room.controller)
    }
  }

  run(): void {
    if (!this.hasEnergy()) {
      const sources = this.creep.room.find(FIND_SOURCES)

      this.harvestFromSource(sources[0])
    } else {
      this.goUpgrade()
    }
  }
}
