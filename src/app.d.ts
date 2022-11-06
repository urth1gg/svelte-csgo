import type { SupabaseClient } from '@supabase/supabase-js'

declare global {
	namespace App {
		interface Locals {
			supabase: SupabaseClient,
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
	}
}
