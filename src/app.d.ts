import type { SupabaseClient } from '@supabase/supabase-js'

declare global {
	
	namespace App {
		interface Locals {
			supabase: SupabaseClient,
			user?: User
		}
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
		party_id?: string
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
