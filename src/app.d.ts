import type { SupabaseClient } from '@supabase/supabase-js'
import { FriendRequestStatus } from '$lib/enums/enums';

declare global {
	
	namespace App {
		interface Locals {
			supabase: SupabaseClient,
			user: User | null,
			token?: string
		}
	}	
	
	interface FormError {
		error: string,
		fields: Array<FormErrorField> | null,
	}
	
	interface FormErrorField {
		name: string,
		message: string
	}

	interface UserFlags{
		user_id: string,
		is_online: boolean,
		in_game: boolean,
		in_party: boolean,
		in_queue: boolean,
		in_queue_timestamp: number
	}
	interface User{
		id: string,
		username: string,
		email: string,
		profile_img: string,
		created_at: string,
		partyMembers: Partial<User>[],
		isFriend: {
			status: FriendRequestStatus | undefined,
		} | null,
		party_id?: string,
		stats?: Array<Stats>,
		friends?: Array<Friend>,
		flags?: Array<UserFlags>

	}

	interface Friend{
		id: string,
		friend_id: string,
		user_id: string,
		status: FriendRequestStatus,
		user: User,
		friend: User,
	}

	interface Stats {
		user_id: string,
		elo: number,
		wins: number,
		losses: number,
		games_played: number,
		created_at: string,
		kills: number,
		deaths: number,

	}

	interface ModalsState{
		showFriends: boolean,
		showParty: boolean,
		showPartyInvite: boolean,
		showMatchFound: boolean,
	}

	type Nullable<T> = T | null;


    type MapName = 'de_dust2' | 'de_mirage' | 'de_inferno' | 
    'de_nuke' | 'de_overpass' | 
    'de_train' | 'de_vertigo' |
    'de_anubis' | 'de_ancient' |
    'de_cache' | 'de_cbble' |
    'de_tuscan'

    type MapImage = '/images/maps/dust2.jpg' | '/images/maps/mirage.jpg' | 
    '/images/maps/inferno.jpg' | '/images/maps/nuke.jpg' | 
    '/images/maps/overpass.jpg' | '/images/maps/train.jpg' |
    '/images/maps/vertigo.jpg' | '/images/maps/anubis.jpg' |
    '/images/maps/ancient.jpg' | '/images/maps/cache.jpg' | 
    '/images/maps/cbble.jpg' | '/images/maps/tuscan.jpg'

	type MatchesInMemory = {
		[key: string]: Match,
	}

	type Match = {
		maps: Map<string, string>,
		users: Map<string, Partial<User>>,
	}
}
