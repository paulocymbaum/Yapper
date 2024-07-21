import { serve } from 'https://deno.land/std@0.136.0/http/server.ts'  
import { createClient } from 'https://cdn.jsdelivr.net/npm/@supabase/supabase-js/+esm'  

// Access environment variables  
const supabaseUrl = Deno.env.get('SUPABASE_URL') || ''  
const supabaseKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') || ''  
const supabase = createClient(supabaseUrl, supabaseKey)  

serve(async (req) => {  
  if (req.method === 'OPTIONS') {
    return new Response(null, {
      status: 204,
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'POST, OPTIONS',
        'Access-Control-Allow-Headers': 'authorization, content-type',
      },
    });
  }
  
  try {  
    const { email, password, firstname, surname, photo_url, user_type, teacher_id } = await req.json()  

    // Create a new user in Supabase Auth  
    const { data: authUser, error: authError } = await supabase.auth.signUp({  
      email,  
      password  
    })  

    if (authError) {  
      return new Response(JSON.stringify({ error: authError.message }), { status: 400 })  
    }  

    const userId = authUser.user?.id  

    if (!userId) {  
      return new Response(JSON.stringify({ error: 'User ID not found' }), { status: 400 })  
    }  

    // Insert the new user details into the public.users table  
    const { error: insertError } = await supabase  
      .from('users')  
      .insert({  
        id: userId,  
        firstName: firstname,  
        Surname: surname,  
        email: email,  
        ...(photo_url !== "" && { photo_URL: photo_url }),
        user_type: user_type,
        ...(teacher_id !== "" && { teacher_id })
      });  

    if (insertError) {  
      return new Response(JSON.stringify({ error: insertError.message }), { status: 400 })  
    }  

    return new Response(JSON.stringify({ message: 'User created successfully' }), { status: 200 })  
  } catch (error) {  
    return new Response(JSON.stringify({ error: error.message }), { status: 500 })  
  }  
})