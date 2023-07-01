<script lang="ts">
    import "../app.css";
    import { browser } from '$app/environment'; 
    import { modals } from "$lib/store/modals";
    import { accessToken, refreshManually } from '$lib/store/accessToken';
    import { fetch_ } from "../utils/fetch/fetch_";
    import { afterUpdate, onMount } from "svelte";
	import { userData, setFriends, setPartyMembers, getUserFlags } from "$lib/store/userData";
    import { FriendRequestStatus } from "$lib/enums/enums";
    import { Socket } from '../socket';
    import Nav  from '$lib/components/Nav.svelte';
    import Message from "$lib/components/Message.svelte";
    import FriendList from '$components/friends/FriendList.svelte';
    import MatchFound from "$lib/components/modals/MatchFound.svelte";
    import PartyInvite from "$components/modals/PartyInvite.svelte";
    import PartyModal from "$components/modals/PartyModal.svelte";
    import { MatchEvents } from "$lib/socket_events/MatchEvents";
	import { PUBLIC_BASE_URL } from "$env/static/public";

    export let data;

    let { loggedIn, id, user } : { loggedIn: boolean, id: string, user: User } = data;

    
    let friends: Friend[]  = [];
    let token = '';
    let invitedBy: User = {} as User;

    function makePingRequest(){
        if(localStorage.getItem('lastPingTime')){
            const lastPingTime = Number(localStorage.getItem('lastPingTime'));
            const currentTime = new Date().getTime();
            const timeDiff = currentTime - lastPingTime;
            if(timeDiff > 1000 * 60 * 5){
                fetch_('/api/ping');
                localStorage.setItem('lastPingTime', currentTime.toString());
            }
        }else{
            fetch_('/api/ping');
            localStorage.setItem('lastPingTime', new Date().getTime().toString());
        }
    }

    let timeout: any = null;

    async function refreshAccessToken(){

        if(token !== ''){
            makePingRequest();
            let t = JSON.parse(window.atob(token.split('.')[1]));
            userData.update( n => ({ ...n, ...t }));
            if(t.exp > Math.floor(Date.now() / 1000)) return
        }

        if(!document.cookie.includes('user')) return;


        let res = null;

        try{
            res = await fetch(`${PUBLIC_BASE_URL}/api/token`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                credentials: 'include'
            })

            let r = await res.json()

            if(r.error) throw new Error(r.error)

            accessToken.set(r.accessToken)

            let t = JSON.parse(window.atob(r.accessToken.split('.')[1]));

            document.cookie = `user=${JSON.stringify(t)}; path=/; max-age=31536000; SameSite=Lax;`
        }catch(e){
        }
    }


    afterUpdate(async () => {
    
        if(!browser) return;

        refreshAccessToken()

        if(timeout) clearTimeout(timeout);

        if($accessToken) {
                timeout = setTimeout(() => {
                refreshManually();
            }, 1000 * 60 * 15);
        }

        if(localStorage.getItem('MATCH_FOUND')){
            $modals.showMatchFound = true;
            matchId = localStorage.getItem('MATCH_FOUND') ?? '';
        }
    })

    accessToken.subscribe( value => {
        token = value;

        if(value !== '') refreshAccessToken();
    })

    accessToken.subscribe( async value => {
        if(value !== '') {
            setFriends();

            if(value){
                await Socket.getInstance().emit('join', { token: value });
            }
        }
    });

    userData.subscribe( value => {
        friends = value.friends as Friend[];
    })
    

    Socket.getInstance().on('party_invite', (data: any) => {
        invitedBy = data.friend;
        $modals.showPartyInvite = false;
        $modals.showPartyInvite = true;
    });

    Socket.getInstance().on("REFRESH_PARTY", async (data: any) => {

        fetch_('/api/party', {cache: 'reload'});

        let partyMembers = data.partyMembers;

        while(partyMembers.length < 5){
            partyMembers.push({username: ''});
        }

        if(!data.partyMembers.find( (member: any) => member.username === $userData.username)){
            partyMembers = [{username: $userData.username, profile_img: $userData.profile_img}];

            while(partyMembers.length < 5){
                partyMembers.push({username: ''});
            }
        }

        partyMembers = partyMembers.slice(0, 5);
        setPartyMembers(partyMembers);
        setFriends();
    });

    let matchId = '';
    MatchEvents.on("MATCH_FOUND", (data: any) => {
        $modals.showMatchFound = true;
        matchId = data.matchId;
        localStorage.setItem('MATCH_FOUND', matchId);
    });

    if(browser){
        let cb = async function(e: any){
            e.preventDefault();
            await fetch_('/api/party', {cache: 'reload'});
        }

        window.removeEventListener('unload', cb);
        window.addEventListener('unload', cb);
    }

    MatchEvents.on("MATCH_DECLINED", async () => {
        let flags: Partial<UserFlags> = {
            in_queue: false,
            in_queue_timestamp:0
        } 
        
        
        if(browser) { localStorage.removeItem('MATCH_FOUND') }

        await fetch_('/api/flags', {
            method: 'POST',
            body: JSON.stringify({
                flags
            })
        });

        await fetch_('/api/queue', {
            method: 'DELETE'
        });

        await getUserFlags();
    });

    MatchEvents.on("START_MATCH", async () => {
        if(browser) {
            let matchId = localStorage.getItem('MATCH_FOUND');
            let newPath = `/match/${matchId}`; // DOESNT REDIRECT?
            document.location.pathname = newPath;
            localStorage.removeItem('MATCH_FOUND');
        }
    });
</script>

{#if $modals.showPartyInvite}
    <PartyInvite {invitedBy} />
{/if}


{#if $modals.showMatchFound}
    <MatchFound matchId={matchId} />
{/if}

{#if $modals.showParty}
    <PartyModal />
{/if}


<main>
    <Nav loggedIn={loggedIn} id={id} user={user} />
    <Message />
    <div class='flex'>
        <FriendList />
        <slot loggedIn={loggedIn} id={id} user={user} />
    </div>
</main>
