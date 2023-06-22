<script lang="ts">
    import { onMount } from 'svelte';
    
    let matches: any[] = [];
  
    onMount(async () => {
      // Here you might fetch the data from a server
      // For now, I'm just hardcoding some example data
      matches = [
        {winlose: "WIN", matchpoints: 2, number1: 10, number2: 5, map_played: "Dust II"},
        {winlose: "LOSE", matchpoints: -1, number1: 6, number2: 16, map_played: "Inferno"},
        // More matches...
      ];
    });

    const showStats = async (matchIndex: number) => {
      // Create a copy of matches
      let matchesCopy = [...matches];

      matchesCopy.forEach((match, index) => {
        match.playersStats = null;
      });
      // Fetch player stats based on match
      // For now, just mock data:
      matchesCopy[matchIndex].playersStats = [
        {player: "Player 1", kills: 20, assists: 10, deaths: 5},
        {player: "Player 2", kills: 15, assists: 8, deaths: 7},
        // More stats...
      ];

      // Assign the copy back to matches
      matches = matchesCopy;
  }
  </script>
  
  <style>
    :root {
      --section: #222;
      --new-bg-other: #111;
      --light-grey: #aaa;
      --light-section: #333;
      --light-new-bg-other: #222;
    }
  
    body {
      background-color: var(--section);
      color: var(--light-grey);
    }
  
    .table {
      color:white;
      @apply mt-3;
      width: 100%;
      border-collapse: collapse;
      background-color: var(--new-bg-other);
    }
  
    .table th, .table td {
      /* border: 1px solid var(--light-grey); */
      padding: 8px;
    }
  
    .table tr:nth-child(even) {
      background-color: var(--light-new-bg-other);
    }
  
    .table th {
      padding-top: 12px;
      padding-bottom: 12px;
      text-align: left;
      background-color: var(--light-section);
    }
  
    .win {
      color: green;
      font-weight: bold;
    }
  
    .lose {
      color: red;
      font-weight: bold;
    }

    .table--stats th, .table--stats tr, .table--stats td {
      background-color: #111;
    }

    .table--stats tr{
      border-bottom: 1px solid #333;
    }

    .table--stats{
      width: 100%;
    }

    .td--stats{
      padding:2px !important;
      width: 100% !important;
      background-color: white !important;
    }
</style>
  
  
<table class="table">
  <thead>
    <tr>
      <th>Result</th>
      <th>Match Points</th>
      <th>Score</th>
      <th>Map Played</th>
      <th></th> <!-- Extra column for player stats -->
    </tr>
  </thead>
  <tbody>
    {#each matches as match, index (match.map_played)}
      <tr on:click={() => showStats(index)}>
        <td class={match.winlose.toLowerCase()}>{match.winlose}</td>
        <td class={match.winlose.toLowerCase()}>{match.matchpoints > 0 ? '+' : ''}{match.matchpoints}</td>
        <td>{match.number1} / {match.number2}</td>
        <td>{match.map_played}</td>
        <td></td> <!-- Extra column for player stats -->
      </tr>
      {#if match.playersStats}
        <tr>
          <td colspan="4" class="td--stats">
            <table class="table--stats">
              <thead>
                <tr>
                  <th>Player</th>
                  <th>Kills</th>
                  <th>Assists</th>
                  <th>Deaths</th>
                  <th>K/R</th>
                  <th>K/D</th>
                </tr>
              </thead>
              <tbody>
                {#each match.playersStats as playerStat (playerStat.player)}
                  <tr>
                    <td>{playerStat.player}</td>
                    <td>{playerStat.kills}</td>
                    <td>{playerStat.assists}</td>
                    <td>{playerStat.deaths}</td>
                    <td>{((playerStat.kills + playerStat.assists) / (match.number1 + match.number2)).toFixed(2)}</td>
                    <td>{(playerStat.kills / playerStat.deaths).toFixed(2)}</td>                    
                  </tr>
                {/each}
              </tbody>
            </table>
          </td>
        </tr>
      {/if}
    {/each}
    </tbody>
</table>