import type { SupabaseClient } from '@supabase/supabase-js'
import { FriendRequestStatus } from '$lib/enums/enums';

declare global {
	
	namespace App {
		interface Locals {
			supabase: SupabaseClient,
			user: User | null
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
	}
	interface User{
		id: string,
		username: string,
		email: string,
		profile_img: string,
		created_at: string,
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
		showParty: boolean
	}

	type Nullable<T> = T | null;
}
