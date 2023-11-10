// @ts-ignore
export async function handle({ request, resolve }) {
    const response = await resolve(request);
  
    return {
      ...response,
      headers: {
        ...response.headers,
        'Cache-Control': 'public, max-age=31536000,immutable',
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
        'Access-Control-Allow-Headers':
        'Origin, X-Requested-With, Content-Type, Accept',


      }
    };
  }