import { InMemoryDbService } from 'angular-in-memory-web-api';

export class InMemoryDataService implements InMemoryDbService {
  createDb() {
    const heroes_1 =[
      { id: 11, name: "Hero1" },
      { id: 2, name: "Hero2" },
      { id: 3, name: "Hero3" },
      { id: 4, name: "Hero4" },
      { id: 5, name: "Hero5" },
      { id: 6, name: "Hero6" },
      { id: 7, name: "Hero7" },
      { id: 8, name: "Hero8" },
      { id: 9, name: "Hero9" },
      { id: 10, name: "Hero10" }
  ]
    return {heroes_1}; // the uri to get this data is api/heroes_1
  }
}
 