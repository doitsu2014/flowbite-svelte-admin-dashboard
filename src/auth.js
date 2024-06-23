import { SvelteKitAuth } from '@auth/sveltekit';
import DuendeIds6 from '@auth/sveltekit/providers/duende-identity-server6';

// export const { handle, signIn, signOut } = SvelteKitAuth({
// 	providers: [
// 		DuendeIds6({
// 			clientId: 'dtech_admin_my_blogs',
// 			clientSecret: 'zaQ@1234',
// 			issuer: 'https://ids-sts.doitsu.tech',
// 			authorization: {
// 				params: {
// 					scope: 'profile openid roles email'
// 				}
// 			}
// 		})
// 	],
// 	secret: 'zaQ@1234',
// 	callbacks: {
// 		async session(all) {
// 			console.log('all', all);
// 			all.session.user.id = all?.user?.id;
// 			return all.session;
// 		}
// 	}
// });

export const { handle, signIn, signOut } = SvelteKitAuth({
	providers: [
		DuendeIds6({
			clientId: 'interactive.confidential',
			clientSecret: 'secret',
			issuer: 'https://demo.duendesoftware.com',
			wellKnown: 'https://demo.duendesoftware.com/.well-known/openid-configuration',
			token: {
				url: 'https://demo.duendesoftware.com/connect/token',
				async conform(response) {
					console.log(response);
					if (response.ok) {
						const body = await response.clone().json();
						if (body?.response?.access_token) {
							return new Response(JSON.stringify(body.response), response);
						} else if (body?.access_token) {
							console.warn('Token response conforms to the standard, workaround not needed.');
						}
					}
					return response;
				}
			},
			userinfo: 'https://demo.duendesoftware.com/connect/userinfo'
		})
	],
	// please generate guid secret
	secret: 'secret_12382**'
});
