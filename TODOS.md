# Roadmap

## TODOS

1. Make profile picture consistent throughout pages. ( app navbar has different profile to route `users\[username]` dashboard.)
2. Add a dedicated route for the users activity. `users\[username]\activity`
3. Logic for getting users history  should be a useInfiniteQuery. hint is to use the range() function from supabase.

## FINISHED

1. Change the users profile path from `users\[user_id]` to `users\[username]` instead.
2. Added loading skeletons to the profile page. The profile, stat cards, and graph now has loading skeletons.
3. Fix the `/login` page to properly use the refactored auth form components.
4. Improve UI/UX experience in the `/login` page by turning the verify OTP dialog into a component view instead with the option to to go back similar to Vercel's sign up page.
5. Improve UI/UX experience in the `/sign-up` page by turning the verify OTP dialog into a view instead
6. Add a history tracker for each user. When they added a game, removed a game from their library, change a category of a game.
7. Improve Game Form Experience but not letting user save changes when there are no change.
8. Add the UI for the history tracker to the users profile page.