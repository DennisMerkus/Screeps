export abstract class MyCreep {
  creep: Creep

  constructor(creep: Creep) {
    this.creep = creep
  }

  abstract run(): void

  say(message: string): void {
    this.creep.say(message)
  }

  hasEnergy(): boolean {
    return this.creep.store[RESOURCE_ENERGY] > 0
  }

  hasFreeCapacity(): boolean {
    return this.creep.store.getFreeCapacity() > 0
  }

  harvestClosest() {
    const sources = this.creep.room.find(FIND_SOURCES)

    this.harvestFromSource(sources[0])
  }

  harvestFromSource(source: Source) {
    if (this.creep.harvest(source) === ERR_NOT_IN_RANGE) {
      this.creep.moveTo(source, {
        visualizePathStyle: {
          stroke: 'Khaki',
        },
      })
    }
  }

  transferToTarget(target: TransferTarget, resource: ResourceConstant) {
    if (this.creep.transfer(target, resource) === ERR_NOT_IN_RANGE) {
      this.creep.moveTo(target, {
        visualizePathStyle: {
          stroke: 'ForestGreen',
        },
      })
    }
  }
}
