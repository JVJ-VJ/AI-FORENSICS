import { createClient } from "https://esm.sh/@supabase/supabase-js";

const supabaseUrl = "https://maxwivnxphcyjjzjsrnc.supabase.co";
const supabaseKey = "sb_publishable__aI3nNIW4RWg_1En4aQpcQ_ewjPf1lX";

export const supabase = createClient(
    supabaseUrl,
    supabaseKey
);