//------------------------
// PLAYER CLASS
//------------------------
class Player {
    elo: any; 
    enteredMatchId: any;
    id: any;
    acceptedMatch: boolean; 

    constructor(id: any, elo: any, enteredMatchId = null, acceptedMatch = false) {
      this.id = id;
      this.elo = elo;
      this.enteredMatchId = enteredMatchId;
      this.acceptedMatch = acceptedMatch;
    }
  }
  
  //------------------------
  // MATCH CLASS
  //------------------------
  class Match {
    matchId: any;
    teamA: any[];
    teamB: any[];
    eloBound: number;
    expansionTime: number;

    constructor(matchId: any, teamA: any = [], teamB: any = []) {
      this.matchId = matchId;
      this.teamA = [];
      this.teamB = [];
      this.eloBound = 150;
      this.expansionTime = 180000;
      this.changeEloBound();
    }
  
    // CHANGE ELO BOUND METHOD
    changeEloBound() {
      setTimeout(() => {
        this.eloBound = this.eloBound + 100;
      }, this.expansionTime);
    }
  
    // ADD PLAYER TO MATCH METHOD
    addPlayer(player: any, enteredMatchId: any) {
      if (this.teamA.length >= 5 && this.teamB.length >= 5) return false;
      let lowElo: number = 0;
      let highElo: number = 0;
  
      //---------------- FOR TEAM-A ---------------
      // IF TEAM-A IS NOT EMPTY THAN CALCUTATE LOWEST AND HIGHEST ELO OF TEAM-A
      if (this.teamA.length > 0) {
        lowElo = this.teamA[0].elo;
        highElo = this.teamA[0].elo;
        // GETTING LOW ELO AND HIGH ELO
        this.teamA.map((p) => {
          if (p.elo < lowElo) {
            lowElo = p.elo;
          }
          if (p.elo > highElo) {
            highElo = p.elo;
          }
          return NaN;
        });
      }

      
      // IF TEAM-A IS LESS THAN 5
      if (this.teamA.length < 5) {
        // IF TEAM-A IS EMPTY
        if (this.teamA.length === 0) {
          this.teamA.push(player);
          player.enteredMatchId = enteredMatchId;
          return true;
        }
        // IF LENGTH OF TEAM-A IS LESS THAN 2
        if (this.teamA.length < 2) {
          if (
            player.elo >= lowElo - this.eloBound &&
            player.elo <= lowElo + this.eloBound
          ) {
            this.teamA.push(player);
            player.enteredMatchId = this.teamA[0].enteredMatchId;
            return true;
          }
        } else {
          // CHECKING THAT PUSHED PLAYER ELO IS IN THE ELO RANGE OF TEAM-A OR NOT
          if (
            (player.elo > highElo && player.elo <= lowElo + this.eloBound) ||
            (player.elo < lowElo && player.elo >= highElo - this.eloBound) ||
            (player.elo >= lowElo && player.elo <= highElo)
          ) {
            this.teamA.push(player);
            player.enteredMatchId = this.teamA[0].enteredMatchId;
            return true;
          }
        }
      }
      // FOR TEAM-A : IF LOWELO ~ HIGHELO < 150 THAN CHANGE THE LOW OR HIGHELO
      let maxElo = 0;
      if (this.teamA.length === 5 && Math.abs(lowElo - highElo) < this.eloBound) {
        maxElo = lowElo + this.eloBound;
      }
      
      //---------------- FOR TEAM-B ---------------
      // IF TEAM-B IS LESS THAN 5
      if (
        this.teamB.length < 5 &&
        player.elo <= maxElo &&
        player.elo >= highElo - this.eloBound
      ) {
        // IF TEAM-B IS EMPTY
        if (this.teamB.length === 0) {
          this.teamB.push(player);
          player.enteredMatchId = this.teamA[0].enteredMatchId;
          return true;
        } else {
          this.teamB.map((p) => {
            return NaN;
          });
          
          this.teamB.push(player);
          player.enteredMatchId = this.teamA[0].enteredMatchId;
          // IF TEAM-B IS FULL WHICH MEANS 10 PALYER ADDED IN THE MATCH. NOW REMOVE THE MATCH FROM GAME QUEUE
          if (this.teamB.length === 5) {
            const dividedTeam = greedyPartitioning(this.teamA, this.teamB);
            this.teamA = dividedTeam[0];
            this.teamB = dividedTeam[1];

            // print elo of teamA and teamB 

            let teamAElo = 0;
            let teamBElo = 0;

            this.teamA.map((p) => {
              teamAElo += p.elo;
              return NaN;
            });
            this.teamB.map((p) => {
              teamBElo += p.elo;
              return NaN;
            });

            removeMatchFromQueue(this);
          }
          return true;
        }
      }
    }
  }
  
  //------------------------
  // QUEUE CLASS
  //------------------------
  class Queue {
    matches: any[];
    
    constructor() {
      this.matches = [];
    }
  
    //------------------------
    // ADD PLAYER TO THE MATCH
    //------------------------
    addToMatch(player: any) {
      // IF QUEUE IS EMPTY
      if (this.matches.length === 0) {
        const newMatchId = createMatchId();
        const newMatch = new Match(newMatchId);
        newMatch.addPlayer(player, newMatchId);
        this.matches.push(newMatch);
      } else {
        let foundMatch = false;
        // CHECK ALL MATCHES WHERE PUSHED PALYER IS BELONGS TO
        for (var i = 0; i < this.matches.length; i++) {
          const added = this.matches[i].addPlayer(player);
          if (added) {
            foundMatch = true;
            break;
          }
        }
        // IF PUSHED PLAYER DOES NOT BELONG TO ANY MATCHES THAN CREATE A NEW MATCH FOR THIS PLAYER
        if (!foundMatch) {
          let newMatchId = checkDuplicateId(this.matches);
          const newMatch = new Match(newMatchId);
          newMatch.addPlayer(player, newMatchId);
          this.matches.push(newMatch);
        }
      }
    }
  
    //------------------------
    // REMOVE PLAYER FROM THE MATCH
    //------------------------
    removeFromMatch(player: any) {
      if (this.matches.length === 0) return false;
      // CHECK ALL THE MATCHES WHERE PLAYER IS ADDED AND REMOVE HIM FROM THAT MATCH
      for (var i = 0; i < this.matches.length; i++) {
          this.matches[i].teamA = this.matches[i].teamA.filter(
            (p: any) => p.id !== player.id
          );
          this.matches[i].teamB = this.matches[i].teamB.filter(
            (p: any) => p.id !== player.id
          );
          // IF MATCH IS EMPTY THAN REMOVE IT FROM QUEUE

          if (this.matches[i].teamA.length === 0 && this.matches[i].teamB.length === 0) {
            this.matches.splice(i, 1);
          }

          break;
        }
    }
  }
  
  //------------------------
  // FUNCTION FOR CREATE RANDOM ID FOR MATCHES
  //------------------------
  function createMatchId() {
    return Math.floor(100000 + Math.random() * 9000000000);
  }
  
  //------------------------
  // FUNCTION TO RESTRICT DUPLICATE MATCH ID
  //------------------------
  function checkDuplicateId(matches: any) {
    let matchId = createMatchId();
    for (var i = 0; i < matches.length; i++) {
      if (matches[i].matchId === matchId) {
        checkDuplicateId(matches);
      }
    }
    return matchId;
  }
  
  //------------------------
  // CREATING A NEW QUEUE WHEN GAME START
  //------------------------
  const newQueue = new Queue();
  
  //------------------------
  // CURRENTLY PLAYING MATCHES
  //------------------------
  let playingMatches = {
    subscribers: [] as { fn: Function; key: string }[],
    subscribe: (fn: Function) => {
      let key = fn.name

      playingMatches.subscribers = playingMatches.subscribers.filter(
        (subscriber) => subscriber.key !== key
      );

      playingMatches.subscribers.push({ fn: fn, key });
    },
    unsubscribe: (key: string) => {
      playingMatches.subscribers = playingMatches.subscribers.filter(
        (subscriber) => subscriber.key !== key
      );
    },
    notify: (data: any) => {
      playingMatches.subscribers.forEach((subscriber) => subscriber.fn(data));
    }
  };
  
  //------------------------
  // FUNCTION TO REMOVE MATCH FROM QUEUE WHEN A CURRENT MATCH IS BEING FULLED
  //------------------------
  function removeMatchFromQueue(match: any) {
    let matches = newQueue.matches.filter((m) => m.matchId !== match.matchId);
    newQueue.matches = matches;
    playingMatches.notify(match);
  }
  
  //------------------------
  // FUNCTION TO DIVIDE A ARRAY INTO TWO SUB-ARRAY SUCH THAT DIFFERENCE OF THEIR ELEMENTS SUM IS MINIMUM
  //------------------------

  // Divide an array into two sub-arrays of length 5 such that difference between two sub-arrays sum is minimum
  function greedyPartitioning(teamA: any[], teamB: any[]) {
    // Calculate the initial difference in ELO between the two teams
    let minDiff = Math.abs(teamA.reduce((sum, player) => sum + player.elo, 0) -
                           teamB.reduce((sum, player) => sum + player.elo, 0));
  
    // Store the best arrangement of players so far
    let bestArrangement = [teamA, teamB];
  
    // Check all possible arrangements of players by swapping players between the two teams
    for (let i = 0; i < teamA.length; i++) {
      for (let j = 0; j < teamB.length; j++) {
        // Swap players

        
        let temp = teamA[i];
        teamA[i] = teamB[j];
        teamB[j] = temp;

        // Calculate the difference in ELO between the two teams
        let diff = Math.abs(teamA.reduce((sum, player) => sum + player.elo, 0) -
                            teamB.reduce((sum, player) => sum + player.elo, 0));
  
        // If this arrangement is better than the current best arrangement, store it
        if (diff < minDiff) {
          minDiff = diff;
          bestArrangement = [[...teamA], [...teamB]];
        }
  
        // Swap the players back
        // temp = teamA[i];
        // teamA[i] = teamB[j];
        // teamB[j] = temp;
      }
    }
  
    return bestArrangement;
  }
  
  
  export {
    Player,
    Match,
    Queue,
    greedyPartitioning,
    playingMatches,
  };
  