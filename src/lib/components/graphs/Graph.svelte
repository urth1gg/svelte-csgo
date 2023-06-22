<script lang="ts">
    import { onMount } from 'svelte';
    import Chart from 'chart.js/auto';
    
    let chart;
    let canvas: any;
  
    // let data = {
    //   labels: ['', '', '', '', ''],
    //   datasets: [
    //     {
    //       label: 'User ELO',
    //       data: [300, 500, 650, 800, 950],  // ELO ratings
    //       borderColor: 'rgb(75, 192, 192)',
    //       tension: 0.1,
    //       fill: true,
    //     }
    //   ]
    // };
    
    export let dataPoints: any;

    export let options = { 
        maintainAspectRatio: true,
        scales: {
            x: {
                grid: {
                    display: true,
                    color: '#292929',  // Red color for the vertical lines
                }
            },
            y: {
                grid: {
                    display: true,
                    color: '#292929',  // Green color for the horizontal lines
                },
                ticks: {
                    precision: 0,
                }
            }
        }
    };
  
    onMount(() => {
      chart = new Chart(canvas.getContext('2d'), {
        type: 'line',
        data: dataPoints,
        options: options
      });
    });
  </script>
  
<div style="width:100%;">
    <canvas bind:this={canvas} />
</div>