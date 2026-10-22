import {createClient} from "@supabase/supabase-js"
import { SUPABASE_KEY,SUPABASE_URL } from "../utils/config"
if(SUPABASE_KEY||!SUPABASE_URL)
{
    throw new Error(
         "Faltan SUPABASE_URL y/o SUPABASE_KEY en el .env. " +
      "Están en el panel de Supabase, en Project Settings (Data API y API Keys). " +
      "Si todavía no tenés proyecto, poné STORAGE=local y seguí trabajando.",
    );
}
export const supabase = createClient(SUPABASE_URL, SUPABASE_KEY)