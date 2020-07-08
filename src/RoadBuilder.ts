// TODO: Halted for now. Building roads on swamp costs 1500

import { contains } from 'lodash'

function buildSingleRoad(room: Room, path: RoomPosition[]): void {
  for (const tile of path) {
    const constructionSites = tile.lookFor(LOOK_CONSTRUCTION_SITES)

    let containsRoad = false

    for (const site of constructionSites) {
      if (site instanceof StructureRoad) {
        containsRoad = true
      }
    }

    if (!containsRoad) {
      Game.rooms[room.name].createConstructionSite(tile, STRUCTURE_ROAD)
    }
  }
}

export function buildRoads(): void {
  const start = Game.spawns.Base.pos
  const sources = Game.spawns.Base.room.find(FIND_SOURCES)

  if (sources.length === 0) {
    throw Error('No energy sources found')
  }

  for (const target of sources) {
    const coordinates = `${target.pos.x},${target.pos.y}`
    if (!(coordinates in Memory.roads)) {
      // Find paths from Base to the first N (1-2?) resource sites
      const result = PathFinder.search(
        start,
        {
          pos: target.pos,
          range: 1,
        },
        {
          plainCost: 1,
          swampCost: 1,
        }
      )

      buildSingleRoad(Game.spawns.Base.room, result.path)

      Memory.roads[coordinates] = true
    }
  }
}
