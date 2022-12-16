import * as matchMaking from "../../src/lib/services/matchMaking";
import { describe, it, expect, assert } from 'vitest';

// A FULL MATCH CREATION AND PUSHED IT INSIDE PLAYING MATCHES. BESIDES, TESTING FOR ELO AND AVERAGE CONDITION TOO.
describe("Create large quantity of matches with randomized data and make sure that the requirements are not breached", () => {
  // CREATING A NEW QUEUE
  const newQueue = new matchMaking.Queue();

  let queue = new matchMaking.Queue();
  for(let i = 0; i < 1000; i++){
    let randomElo = Math.floor(Math.random() * 3000);
    let randomUsername = Math.random().toString(36).substring(2);
    console.log(randomUsername)
    let randomPlayer = new matchMaking.Player(randomUsername, randomElo);
    queue.addToMatch(randomPlayer);
  }

  it('Elo difference should be less than 150', () => {

    for(let i = 0; i < queue.matches.length; i++){
      let match = queue.matches[i];
      if(match.teamA.length === 5 && match.teamB.length === 5){
        expect(eloDifferenceBetweenTeams(match)).toBeLessThanOrEqual(150);
        
      }
    }

  })

  it('No duplicate ids should be in a match', () => {
    for(let match of queue.matches){
      expect(idsAppearOnlyOnce(match)).toBe(true);
    }
  })
});

function idsAppearOnlyOnce(match: any){
  let teamA = match.teamA;
  let teamB = match.teamB;
  let teamAIds: any[] = [];
  let teamBIds: any[] = [];
  teamA.forEach((player: any) => {
    teamAIds.push(player.id);
  })
  teamB.forEach((player: any) => {
    teamBIds.push(player.id);
  })
  let teamAIdsSet = new Set(teamAIds);
  let teamBIdsSet = new Set(teamBIds);
  if(teamAIds.length === teamAIdsSet.size && teamBIds.length === teamBIdsSet.size){
    return true;
  } else {
    return false;
  }
}
function eloDifferenceBetweenTeams(match: any){
  let teamA = match.teamA;
  let teamB = match.teamB;
  let teamAElo = 0;
  let teamBElo = 0;
  teamA.forEach((player: any) => {
    teamAElo += player.elo;
  })
  teamB.forEach((player: any) => {
    teamBElo += player.elo;
  })
  let difference = Math.abs(teamAElo - teamBElo);
  console.log(difference)
  return difference;
}
describe("matchMaking start", () => {
  // TEST FOR NEW PLAYER CREATION
  it("player should have a id and elo points value when a player being created", () => {
    const player1 = new matchMaking.Player("manual", 1000);
    const expectedPlayer = {
      id: "manual",
      elo: 1000,
      enteredMatchId: null,
    };

    assert.deepEqual(player1, expectedPlayer);
  });

  // TEST FOR NEW QUEUE CREATION
  it("a new queue should and only have a empty matches array", () => {
    const newQueue = new matchMaking.Queue();

    assert.deepEqual(newQueue, { matches: [] });
  });

  // TEST FOR ADDING PLAYER TO THE EMPTY QUEUE
  it("after adding a player with addToMatch the matches of Queue should have created a new entry", () => {
    const newQueue = new matchMaking.Queue();
    const player1 = new matchMaking.Player("manual", 1000);
    newQueue.addToMatch(player1);
    const enteredMatchId = newQueue.matches[0].matchId;

    assert.deepEqual(newQueue, {
      matches: [
        {
          matchId: enteredMatchId,
          teamA: [{ id: "manual", elo: 1000, enteredMatchId: enteredMatchId }],
          teamB: [],
          eloBound: 150,
          expansionTime: 180000,
        },
      ],
    });

    // ADDING 2ND PLAYER
    // -----------------
    describe("adding 2nd player in queue", () => {
      // TEST FOR ADDING PLAYER TO AN EXISTING MATCH BASED ON ELO
      it("after adding player2 - if player2 elo is inside the range of 150 from player1, it should ended up with a match where player1 exist", () => {
        const player1 = new matchMaking.Player("manual-2", 1050);
        newQueue.addToMatch(player1);

        assert.deepEqual(newQueue, {
          matches: [
            {
              matchId: enteredMatchId,
              teamA: [
                { id: "manual", elo: 1000, enteredMatchId: enteredMatchId },
                { id: "manual-2", elo: 1050, enteredMatchId: enteredMatchId },
              ],
              teamB: [],
              eloBound: 150,
              expansionTime: 180000,
            },
          ],
        });

        // ADDING 3RD PLAYER
        // -----------------
        describe("adding 3rd player in queue", () => {
          it("after adding player3 - if player3 elo is more than the range of 150 from match1 elo than it should ended up with a new match", () => {
            const player3 = new matchMaking.Player("manual-3", 3000);
            newQueue.addToMatch(player3);
            const enteredMatch2Id = newQueue.matches[1].matchId;

            assert.deepEqual(newQueue, {
              matches: [
                {
                  matchId: enteredMatchId,
                  teamA: [
                    { id: "manual", elo: 1000, enteredMatchId: enteredMatchId },
                    {
                      id: "manual-2",
                      elo: 1050,
                      enteredMatchId: enteredMatchId,
                    },
                  ],
                  teamB: [],
                  eloBound: 150,
                  expansionTime: 180000,
                },
                {
                  matchId: enteredMatch2Id,
                  teamA: [
                    {
                      id: "manual-3",
                      elo: 3000,
                      enteredMatchId: enteredMatch2Id,
                    },
                  ],
                  teamB: [],
                  eloBound: 150,
                  expansionTime: 180000,
                },
              ],
            });

            // ADDING 4TH, 5TH, 6TH, 7TH, 8TH AND 9TH PLAYER
            // ----------------------------------------------
            describe("adding 4th, 5th, 6th, 7th , 8th and 9th player in queue", () => {
              it("after adding player 4th, 5th, 6th, 7th , 8th and 9th - if players elos are inside the range of a specific match, it should ended up with a match and add player to teamA and then teamB", () => {
                const player4 = new matchMaking.Player("manual-4", 925);
                const player5 = new matchMaking.Player("manual-5", 980);
                const player6 = new matchMaking.Player("manual-6", 1075);
                const player7 = new matchMaking.Player("manual-7", 1025);
                const player8 = new matchMaking.Player("manual-8", 1200);
                const player9 = new matchMaking.Player("manual-9", 1010);
                newQueue.addToMatch(player4);
                newQueue.addToMatch(player5);
                newQueue.addToMatch(player6);
                newQueue.addToMatch(player7);
                newQueue.addToMatch(player8);
                newQueue.addToMatch(player9);
                const enteredMatchId = newQueue.matches[0].matchId;
                const enteredMatch3Id = newQueue.matches[2].matchId;

                assert.deepEqual(newQueue, {
                  matches: [
                    {
                      matchId: enteredMatchId,
                      teamA: [
                        {
                          id: "manual",
                          elo: 1000,
                          enteredMatchId: enteredMatchId,
                        },
                        {
                          id: "manual-2",
                          elo: 1050,
                          enteredMatchId: enteredMatchId,
                        },
                        {
                          id: "manual-4",
                          elo: 925,
                          enteredMatchId: enteredMatchId,
                        },
                        {
                          id: "manual-5",
                          elo: 980,
                          enteredMatchId: enteredMatchId,
                        },
                        {
                          id: "manual-6",
                          elo: 1075,
                          enteredMatchId: enteredMatchId,
                        },
                      ],
                      teamB: [
                        {
                          id: "manual-7",
                          elo: 1025,
                          enteredMatchId: enteredMatchId,
                        },
                        {
                          id: "manual-9",
                          elo: 1010,
                          enteredMatchId: enteredMatchId,
                        },
                      ],
                      eloBound: 150,
                      expansionTime: 180000,
                    },
                    {
                      matchId: enteredMatch2Id,
                      teamA: [
                        {
                          id: "manual-3",
                          elo: 3000,
                          enteredMatchId: enteredMatch2Id,
                        },
                      ],
                      teamB: [],
                      eloBound: 150,
                      expansionTime: 180000,
                    },
                    {
                      matchId: enteredMatch3Id,
                      teamA: [
                        {
                          id: "manual-8",
                          elo: 1200,
                          enteredMatchId: enteredMatch3Id,
                        },
                      ],
                      teamB: [],
                      eloBound: 150,
                      expansionTime: 180000,
                    },
                  ],
                });
              });
            });
            // ELO CHANGING TEST
            //eloChangeTest();
          });
        });
      });
    });
  });
});

describe('Greedy Partitioning test', () => {
  it('The total elo difference between teamA and teamB should be 8', () => {

    let teamA= [ 
      { elo: 102, enteredMatchId: 4346969527, id: 'cbb7v' },
      { elo: 113, enteredMatchId: 4346969527, id: '8nagpk' },
      { elo: 39, enteredMatchId: 4346969527, id: 'rc87z' },
      { elo: 101, enteredMatchId: 4346969527, id: 'jm5409' },
      { elo: 84, enteredMatchId: 4346969527, id: 'qh6dio' }
    ];
    let teamB= [
      { elo: 39, enteredMatchId: 4346969527, id: 'sbjjje' },
      { elo: 77, enteredMatchId: 4346969527, id: 'ibl9qk' },
      { elo: 94, enteredMatchId: 4346969527, id: '0evbk7' },
      { elo: 16, enteredMatchId: 4346969527, id: 'gozd9u' },
      { elo: 101, enteredMatchId: 4346969527, id: 'jm5408' }
    ];


    let [a,b] = matchMaking.greedyPartitioning(teamA, teamB);

    let teamA_newElo = a.reduce((a, b) => a + b.elo, 0)
    let teamB_newElo = b.reduce((a, b) => a + b.elo, 0)


    expect(Math.abs(teamA_newElo - teamB_newElo)).to.be.equal(8);
  });

  it('The total elo difference between teamA and teamB should be 10', () => {
      let teamA = [
        {
          id: "babu",
          elo: 1050,
        },
        {
          id: "arfin",
          elo: 1000,
        },
        {
          id: "raihan",
          elo: 1000,
        },
        {
          id: "jobbar",
          elo: 925,
        },
        {
          id: "apurbo",
          elo: 900,
        },
      ];
      let teamB = [
        {
          id: "siddique",
          elo: 1010,
        },
        {
          id: "mamun",
          elo: 1000,
        },
        {
          id: "gittu",
          elo: 1000,
        },
        {
          id: "ifty",
          elo: 930,
        },
        {
          id: "parvez",
          elo: 925,
        },
      ];

    let [c,d] = matchMaking.greedyPartitioning(teamA, teamB);

    let tA_newElo = c.reduce((a, b) => a + b.elo, 0)
    let tB_newElo = d.reduce((a, b) => a + b.elo, 0)

    expect(Math.abs(tA_newElo - tB_newElo)).to.be.equal(10);
  });

  it('The total elo difference between teamA and teamB should be 0', () => {
    let teamA = [
      {id: "babu", elo: 1050},
      {id: "arfin", elo: 1100},
      {id: "raihan", elo: 900},
      {id: "jobbar", elo: 930},
      {id: "apurbo", elo: 895},
    ]

    let teamB = [
      {id: "siddique", elo: 1055},
      {id: "mamun", elo: 1000},
      {id: "gittu", elo: 1000},
      {id: "ifty", elo: 920},
      {id: "parvez", elo: 900},
    ]

    let [c,d] = matchMaking.greedyPartitioning(teamA, teamB);

    let tA_newElo = c.reduce((a, b) => a + b.elo, 0)
    let tB_newElo = d.reduce((a, b) => a + b.elo, 0)

    expect(Math.abs(tA_newElo - tB_newElo)).to.be.equal(0);
  })
}); 