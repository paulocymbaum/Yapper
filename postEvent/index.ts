// Import necessary modules  
import { serve } from 'std/server';  

// Mixpanel token is sourced from environment variables  
const MIXPANEL_TOKEN = Deno.env.get('MIXPANEL_TOKEN');  

// Check if MIXPANEL_TOKEN is set  
if (!MIXPANEL_TOKEN) {  
  throw new Error('MIXPANEL_TOKEN environment variable is not set');  
}  

// Define the structure of the request body  
interface MixpanelEventRequest {  
  event: string;  
  properties: {  
    time: number;  
    distinct_id: string;  
    $insert_id: string;  
    device?: string;  
    plan?: string;  
    button?: string;  
    user_type?: string;  
  };  
}  

serve(async (req) => {  
  // CORS handling  
  const headers = {  
    'Access-Control-Allow-Origin': '*',  
    'Access-Control-Allow-Methods': 'POST, OPTIONS',  
    'Access-Control-Allow-Headers': 'Authorization, Content-Type',  
  };  

  if (req.method === 'OPTIONS') {  
    return new Response(null, {  
      status: 204,  
      headers,  
    });  
  }  

  // Ensure the request method is POST  
  if (req.method !== 'POST') {  
    return new Response('Method not allowed', {  
      status: 405,  
      headers,  
    });  
  }  

  // Parse the request body  
  let body: MixpanelEventRequest;  
  try {  
    body = await req.json();  
  } catch (err) {  
    return new Response('Invalid JSON body', {  
      status: 400,  
      headers,  
    });  
  }  

  const { event, properties } = body;  

  // Validate input  
  if (!event) {  
    return new Response('Event name is required', {  
      status: 400,  
      headers,  
    });  
  }  

  // Prepare the payload for Mixpanel  
  const data = {  
    event,  
    properties: {  
      ...properties,  
      token: MIXPANEL_TOKEN,  
    },  
  };  

  try {  
    // Send the event to Mixpanel  
    const response = await fetch('https://api.mixpanel.com/import?strict=1&project_id=3337975', {  
      method: 'POST',  
      headers: {  
        'accept': 'application/json',  
        'authorization': `Basic ${btoa(MIXPANEL_TOKEN)}`, // Ensure correct encoding, if needed  
        'Content-Type': 'application/json',  
      },  
      body: JSON.stringify(data),  
    });  

    // Return appropriate response based on Mixpanel API response  
    if (response.ok) {  
      return new Response('Event sent successfully', {  
        status: 200,  
        headers,  
      });  
    } else {  
      const errorMessage = await response.text();  
      return new Response(`Error sending event: ${errorMessage}`, {  
        status: response.status,  
        headers,  
      });  
    }  
  } catch (error) {  
    return new Response(`Error: ${error.message}`, {  
      status: 500,  
      headers,  
    });  
  }  
});