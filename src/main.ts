import { ErrorMapper } from 'utils/ErrorMapper'

import { MyCreep } from './Creep'

import { Role } from './roles'

import Builder from './Builder'
import Harvester from './Harvester'
import Upgrader from './Upgrader'

function createCreep(creep: Creep): MyCreep {
  switch (creep.memory.role) {
    case Role.harvester:
      return new Harvester(creep)
    case Role.upgrader:
      return new Upgrader(creep)
    case Role.builder:
      return new Builder(creep)
    default:
      throw new Error('Unhandled creep type')
  }
}

// When compiling TS to JS and bundling with rollup, the line numbers and file names in error messages change
// This utility uses source maps to get the line numbers and file names of the original, TS source code
export const loop = ErrorMapper.wrapLoop(() => {
  console.log(`Current game tick is ${Game.time}`)

  // Automatically delete memory of missing creeps
  for (const name in Memory.creeps) {
    if (!(name in Game.creeps)) {
      delete Memory.creeps[name]
    }
  }

  const harvesters = _.filter(Game.creeps, (creep) => creep.memory.role === Role.harvester)

  console.log('Harvesters: ' + harvesters.length)

  if (harvesters.length < 2) {
    const newHarvesterName = 'Harvester' + Game.time

    console.log('Spawning new harvester: ' + newHarvesterName)

    Game.spawns.Spawn1.spawnCreep([WORK, CARRY, MOVE], newHarvesterName, { memory: { role: Role.harvester } })
  }

  if (Game.spawns.Spawn1.spawning) {
    const spawningCreep = Game.creeps[Game.spawns.Spawn1.spawning.name]

    Game.spawns.Spawn1.room.visual.text(
      '🛠️ ' + spawningCreep.memory.role,
      Game.spawns.Spawn1.pos.x + 1,
      Game.spawns.Spawn1.pos.y,
      { align: 'left', opacity: 0.8 }
    )
  }

  for (const name in Game.creeps) {
    const creep = createCreep(Game.creeps[name])

    creep.run()
  }
})
