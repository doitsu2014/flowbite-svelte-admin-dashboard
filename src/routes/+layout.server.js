import { ANALYTICS_ID } from '$env/static/private';

/** @type {import('./$types').LayoutServerLoad} \*/
export async function load(event) {
	console.log(await event.locals.auth());
	return { ANALYTICS_ID };
}
