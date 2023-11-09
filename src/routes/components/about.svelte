<script lang="ts">
		import { tooltipviews } from '../../dbase.js';
  </script>
  
  <style>
     .tooltip{
           position: absolute;
            z-index: 5;
            top: 15vh;
            width: clamp(250px, 60vw, 800px);
            height: 60vh;
            overflow-y: scroll;
            justify-content: flex-start;
            background-color:var(--tooltipbgcol);
            border-radius: var(--border-radius);
            padding: var(--padding);

     }
     </style>
  
 {#if $tooltipviews.aboutview}
 <div class="tooltip">
    <h1>About Us</h1>
    <p>Welcome to our About page. Here, we share our story, mission, and values.</p>
  </div>
    {/if}


