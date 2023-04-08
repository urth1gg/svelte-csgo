import type { SupabaseClient } from "@supabase/supabase-js";

class Metrics{   
    table: string;

    constructor(){
        this.table = "ac_metrics";
    }


    setTableToAllProcesses(){
        this.table = "all_processes";
    }

    setTableToNewProcesses(){
        this.table = "new_processes";
    }

    async sendMetrics(data: any, user: Partial<User>,supabase: SupabaseClient){
        if(this.table === ""){
            return { error: "Table not set" }
        }

        let { error } = await supabase.from(this.table).insert({
            csgo_open: data,
            user_id: user.id
        }).single();
        if(error){
            return { error: error }
        }
        return { data, error: false }
    }

}

let metrics = new Metrics();

export { metrics }