interface IntervalObject {
    secondsLeft: number;
    interval: NodeJS.Timeout;
}

let intervals: { [key: string]: IntervalObject } = {};

export const startMapVoteTimer = function(matchId: string, io: any, token: string, matches: any){

    intervals[matchId] = {
        secondsLeft: 10,
        interval: setInterval(() => {
            intervals[matchId].secondsLeft--;
            if(intervals[matchId].secondsLeft === 0){
                io.emit("UPDATE_MAP", { matchId: matchId, token: token })
                clearInterval(intervals[matchId].interval);
                delete intervals[matchId];
                delete matches[matchId];
            }else{
                io.to(matchId).emit("MAP_VOTE_TIMER", { matchId: matchId, secondsLeft: intervals[matchId].secondsLeft });
            }
        }, 1000)
    }

}