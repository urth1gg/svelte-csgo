import type { SupabaseClient } from "@supabase/supabase-js";

type Table = "all_processes" | "new_processes";

class Memory{   
    table: string;

    constructor(){
        this.table = "";
    }


    setTableToAllProcesses(){
        this.table = "all_processes";
    }

    setTableToNewProcesses(){
        this.table = "new_processes";
    }

    async sendMemoryData(data: any, user: Partial<User>,supabase: SupabaseClient){
        if(this.table === ""){
            return { error: "Table not set" }
        }

        let { error } = await supabase.from(this.table).insert({
            processes: data,
            user_id: user.id
        }).single();
        if(error){
            return { error: error }
        }
        return { data, error: false }
    }

}

let memory = new Memory();

export { memory }