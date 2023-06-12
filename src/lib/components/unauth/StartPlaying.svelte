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
        background:#DAA520;
        padding:10px 20px;
        border-radius:5px;
        text-shadow: 2px 2px 2px #000000;
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

    @keyframes hue-rotate {
        0% {
            filter: hue-rotate(0deg);
        }
        50% {
            filter: hue-rotate(-45deg);
        }
        100% {
            filter: hue-rotate(0deg);
        }
    }

    @keyframes hue-rotate-with-contrast{
        0% {
            filter: hue-rotate(0deg) contrast(0.85);
        }
        50% {
            filter: hue-rotate(-45deg) contrast(0.85);
        }
        100% {
            filter: hue-rotate(0deg) contrast(0.85);
        }
    }

    .hue-rotate{
        animation: hue-rotate 5s infinite linear;
    }

    .hue-rotate-with-contrast{
        animation: hue-rotate-with-contrast 5s infinite linear;
    }
    .rotate-hue-35deg{
        filter: hue-rotate(-35deg) contrast(0.9);
    }

    .rotate-hue-45deg{
        filter: hue-rotate(-45deg) contrast(1.3);
    }

    @media only screen and (max-width: 800px) {
    .main-heading {
        font-size: 24px;
    }
    
    .sub-text {
        font-size: 16px;
        text-align: center;
    }
    
    .artwork-container img, .solution img{
        width: 100%;
        margin:0 auto;
    }

    .history-img-container img {

    }

    .button-container {
        width: 100%;
        display: flex;
        justify-content: center;
    }

    .button {
        padding: 5px 10px;
    }

    .flex-reverse{
        flex-direction: column-reverse !important;
    }

    .flex{
        flex-direction: column;
    }

    .height-mobile{
        height: auto !important;
    }
}
</style>

<head>
    <title>Dusty Dreams</title>
</head>
<div class="w-full p-5">
    <div class="flex w-11/12 m-auto justify-center items-center padded-section section">
        <div class="artwork-container mr-4">
            <div class="img rounded-lg artwork-soldier-2">
                <!-- <img src="/images/ai/artwork-soldier-3-noborder.png" class="w-[500px]" alt="soldier" width="400"/> -->
                <img src="/images/ai/artwork-soldier-2-nobg-sharp.png" class="w-[480px] hue-rotate" alt="soldier" width="400"/>
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
    
    <div class="flex flex-reverse w-11/12 m-auto justify-center items-center history mr-5 padded-section">
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
            <div class="img rounded-lg hue-rotate-with-contrast">
                <img src="/images/history/zonic.jpg" class="w-[200px] img1 rounded" alt="zonic"/>
                <img src="/images/history/edward.jpg" class="w-[200px] img2 rounded" alt="zonic"/>
                <img src="/images/history/spawn.jpg" class="w-[200px] img3 rounded" alt="zonic"/>
            </div>
        </div>
    </div>
    <div class="divider"></div>

    
    <div class="mt-3 flex w-12/12 justify-center items-center section rounded-lg history">
        <div class="w-auto p-10 mr-8">
            <img src="/images/ai/soldier-problem-4-sharp.jpeg" alt="soldier" class="m-auto rounded-lg rotate-hue-35deg" width="1000" />
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

    <div class="flex flex-reverse w-12/12 justify-center items-center solution mr-5 padded-section">
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
                <img src="/images/ai/the-solution.png" class="w-[500px] rounded rotate-hue-45deg" alt="solution" width="100%"/>
            </div>
        </div>
    </div>

    <div class="divider"></div>

    <footer class="mt-2 flex justify-between text-[#FFF] p-10 h-[120px]">
        <h1 class="text-lg">Dustydreamsgg</h1>
    
        <div class="text-sm">
            <a href="/terms" class="mr-2">Terms and Services</a>
            <a href="/privacy-policy">Privacy Policy</a>
            <a href="/contact" class="ml-2">Contact Us</a>
            <!-- <a href="/faq" class="ml-2">FAQ</a> -->
        </div>
    </footer>

</div>

