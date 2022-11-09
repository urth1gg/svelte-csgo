import type { SupabaseClient } from '@supabase/supabase-js'

declare global {
	
	namespace App {
		interface Locals {
			supabase: SupabaseClient,
			user?: User
		}
	}	

	enum FriendRequestStatus {
		PENDING = 0,
		ACCEPTED = 1,
		DECLINED = 2
	}
	
	interface FormError {
		error: string,
		fields: Array<ErrorFormFields> | null,
	}
	
	interface FormErrorFields {
		name: string,
		message: string
	}

	interface User{
		id: string,
		username: string,
		email: string,
		profile_img: string,
		created_at: string,
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
