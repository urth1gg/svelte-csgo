import type { SupabaseClient } from '@supabase/supabase-js'
import { FriendRequestStatus } from '$lib/enums/enums';

declare global {
	
	namespace App {
		interface Locals {
			supabase: SupabaseClient,
			user?: User
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

	interface User{
		id: string,
		username: string,
		email: string,
		profile_img: string,
		created_at: string,
		isFriend: {
			status: FriendRequestStatus | undefined,
		} | null,
		stats?: Array<Stats>,
		party_id?: string,
		friends?: Array<Friend>
	}

	interface Friend{
		id: string,
		friend_id: string,
		user_id: string,
		status: FriendRequestStatus
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

	type Nullable<T> = T | null;
}
