<script>
    import SectionHeader from '$lib/components/SectionHeader.svelte';
</script>

<style>

    .main-heading {
        font-family: 'Exo 2', sans-serif;
        color: #DAA520; 
        text-shadow: 2px 2px 4px #000000;
        font-size: 40px; 
        text-align: center;
        padding-top: 20px;
        font-weight: bold;
    }
    
    .sub-text {
        color: #ddd; 
        text-shadow: 1px 1px 2px #000000;
        font-size: 24px;
        text-align: justify;
        padding-bottom: 20px;
        font-family: 'Exo 2', sans-serif;
    }

    .button{
        color:white;
        background:orange;
        padding:10px 20px;
        border-radius:5px;
        font-weight: bold;
    }

    .button-container{
        display:flex;
        justify-content:center;
        align-items:center;
    }

    .img-bordered{
        border:2px solid white;
    }

    .img1, .img2, .img3{
        position:relative;
        border:2px solid white;
    }

    .img1{
        transform:rotateZ(0deg);
        margin-left: 25px;
    }

    .img2{
        transform:rotateZ(25deg);
        margin-left: -145px;
        margin-top:-5px;
    }

    .img3{
        transform:rotateZ(-35deg);
        margin-left: 185px;
        margin-top:-100px;
    }
    .history .img{
        position:relative;
        background:#0A0A0A;
        width:400px;
        height:400px;
        display:flex;
        justify-content: center;
        align-items: center;
        flex-direction: column;
    }

    .image-bg--gray{
        background-color: #0C0C0C;
    }

    .image-bg--black{
        background-color: #000000;
    }
    .history{
        /* height:400px; */
        margin-bottom:3rem;
    }

    .bg-gray{
        background-color:rgb(12,12,12);
    }

    .padded-ection{
        @apply p-3;
    }

    .divider {
        height: 3px;
        background: repeating-linear-gradient(
            60deg,
            #0CA692,
            #0CA692,
            #C940AA,
            #C940AA,
            #2E1366,
            #2E1366,
            #139670,
            #139670,
            #0773A7,
            #0773A7,
            #FFFF2D,
            #FFFF2D,
            #E83701,
            #E83701,
            #B41EA2,
            #B41EA2,
            #270C5C,
            #270C5C,
            #0CA692
        );
        background-size: 200% 100%;
        animation: gradientAnimation 15s linear infinite;
        margin:1.5rem 0rem;
    }

    @keyframes gradientAnimation {
        from { background-position: 200% }
        to { background-position: 0 }
    }


</style>
<div class="section w-full p-5 h-[600px]">
    <div class="flex w-11/12 justify-center items-center padded-section">
        <div class="artwork-container mr-4 brightness-125">
            <div class="img rounded-lg">
                <!-- <img src="/images/ai/artwork-soldier-3-noborder.png" class="w-[500px]" alt="soldier" width="400"/> -->
                <img src="/images/ai/artwork-soldier-2.png" class="w-[500px]" alt="soldier" width="400"/>
            </div>
        </div>
        <div>
            <h1 class="main-heading">Elevating CSGO to new heights</h1>
            <p class="sub-text">Creating a respectful, enthusiastic community for the game we love</p>
            <div class="button-container">
                <a href="/register" class="button">Let's play!</a>
            </div>
        </div>
    </div>

    <div class="divider"></div>
    
    <div class="flex w-11/12 justify-center items-center history mr-5 padded-section">
        <div>
            <h1 class="main-heading">Let's talk history</h1>
            <p class="sub-text text-center small-paragraph pr-8 pl-8">
                From the adrenaline-pumping 1.6 era to the strategic complexities of the modern-day GO scene, Counter-Strike has captivated us, fostering legends and unforgettable moments that have defined eSports. Those astute among you will recognize the plays from the images on the right alone - testaments to the epic tales written on this digital battleground. 
                <br><br>
                This thrilling journey has given us heart-stopping ninja defuses, awe-inspiring plays, and moments of unmatched team synergy that have become part of our collective gaming memory.
                <br><br>
                This is not just a game; it's a rich history and a shared passion spanning decades.
            </p>
        </div>
        <div class="history-img-container brightness-125">
            <div class="img rounded-lg">
                <img src="/images/history/zonic.jpg" class="w-[200px] img1 rounded" alt="zonic"/>
                <img src="/images/history/edward.jpg" class="w-[200px] img2 rounded" alt="zonic"/>
                <img src="/images/history/spawn.jpg" class="w-[200px] img3 rounded" alt="zonic"/>
            </div>
        </div>
    </div>
    <div class="divider"></div>

    <div class="mt-3 flex w-12/12 justify-center items-center bg-gray padded-section rounded-lg history">
        <div class="w-auto p-10 mr-8">
            <img src="/images/ai/soldier-problem-4.png" alt="soldier" class="m-auto rounded-lg" width="1000" />
        </div>
        <div class="w-full pr-5">
            <h1 class="main-heading text-center">✨ The problem ✨</h1>
            <p class="sub-text small-paragraph">
                Even though Counter-Strike is, without a doubt, the best FPS game ever, it has its challenges. We've all had unforgettable moments of triumph that keep us coming back for more. But we've also had those matches where things don't go as planned. You lose a pistol round, and someone prematurely declares, "gg we lost". Or maybe that one toxic player drags everyone into fighting, turning the team chat into a battleground, rather than focusing on the real fight at hand.<br><br>
                Even worse, there are those who betray their own teammates by revealing positions to the enemy team - actions that are not only frustrating but absolutely unacceptable. These are issues that we, as devoted players, face regularly in our matches. They disrupt our gameplay, spoil our experiences, and stray away from the spirit of healthy competition that Counter-Strike embodies.<br><br>
                Worst of all? They keep doing it again and again, with no consequences.
            </p>
        </div>
    </div>

    <div class="flex w-12/12 justify-center items-center history mr-5 padded-section">
        <div>
            <h1 class="main-heading">The solution</h1>
            <p class="sub-text text-center small-paragraph m-auto pr-8 pl-8">
                The solution is simple, yet incredibly effective - make players accountable.
                <br><br>
                In the world of Counter-Strike, actions should have consequences. That's the ethos we're built on. While other platforms might tolerate disruptive behaviors for the sake of revenue, we're taking a different path. For us, it's not about profit. It's about preserving the integrity of the game we all love.
                <br><br>
                Strict accountability is at the core of our approach. We're not afraid to wield the ban hammer when necessary, and we do so with unwavering determination. If a player is found to be griefing the match, the game halts there and then. That player is promptly removed from the match and faces an immediate ban.
                <br><br>
                But we're not stopping there. We're cultivating a community where respect, fair play, and camaraderie are the norms, not exceptions. We're encouraging every player to take responsibility for maintaining a positive gaming environment. And most importantly, we're ensuring that every match you play is an experience worthy of the legendary status of Counter-Strike.
                <br><br>
                We're not just selling a promise. We're offering a commitment to each player who shares our love for this game. A commitment to a better, healthier, and more enjoyable Counter-Strike experience. Ready to hold the game to a higher standard with us? Let's reclaim the game together.
            </p>
        </div>
        <div class="brightness-125 w-full">
            <div class="rounded-lg">
                <img src="/images/ai/the-solution.png" class="w-[500px] rounded" alt="solution" width="100%"/>
            </div>
        </div>
    </div>

</div>