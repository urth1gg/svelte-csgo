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
  </style>
  
  
  <table class="table">
    <thead>
      <tr>
        <th>Result</th>
        <th>Match Points</th>
        <th>Score</th>
        <th>Map Played</th>
      </tr>
    </thead>
    <tbody>
      {#each matches as match (match.map_played)}
        <tr>
          <td class={match.winlose.toLowerCase()}>{match.winlose}</td>
          <td class={match.winlose.toLowerCase()}>{match.matchpoints > 0 ? '+' : ''}{match.matchpoints}</td>
          <td>{match.number1} / {match.number2}</td>
          <td>{match.map_played}</td>
        </tr>
      {/each}
    </tbody>
  </table>