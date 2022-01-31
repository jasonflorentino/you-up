# ⏰ You Up?
***Quickly check if you can ring your remote friends***

## What is this?
My friend Steve told me he was looking for a quick and simple way to check who among his distributed friend group might be up for a chat. I, always wanting to give my weekend away to code something fun, said "Why don't I make it for you!". So now I have double chores to do next weekend. Unless Steve has a feature request??? Enjoy!

— Jason, Jan 30, 2021

## Live Site
[Click here](https://youup.vercel.app/) to view a live deployment on Vercel.

## How Does It Work?
You tell it where your friend is, and it'll tell you if they're awake!

### First, a note about security

The app runs entirely in the browser and stores the stuff you give it in your browser's `localstorage`. This is great because no data is being sent anywhere, and yet your list of friends persists across reloads and revists. However, **`localstorage` is not a secure store.** Apps and sites in other tabs also have access to `localstorage` — Don't input anything you wouldn't mind them (or anyone else for that matter) seeing. Although it all lives in your browser, consider this data open to anybody who wants to find it.

### And now the rest

- **Add a friend** by clicking the `+ New Friend` button, give them a name, and choose what timezone they're in. (This app gets its timezone data from [a free web API](https://timezonedb.com/))
- By default if it's between **7am and 11pm** where they are, they're considered awake. You can change this by clicking the button displaying these times: `👋 07:00 -  23:00`. This is a global change and will affect everybody in the list.
- Your friends' times are calculated **relative to your current time**, and your current time will be the time on whatever device you're using. I haven't been able to test this yet, but if you add people while in Eastern Time, and then access this site from the same device while in Pacific Time, your friends' awake status should adjust accordingly!
- You can **edit a friend's defailts** by clicking the `edit` icon between to their time difference and the `trash` icon.
- Clicking the `trash` icon (last in their row) **removes that friend**.

## Future Ideas, maybe:

_In no particular order_
- Empty state.
- Add a sample image of the page to this doc.
- Add name to the delete confirmation dialog.
- Collapse friend actions into single menu, so as to remove clutter from individual rows.
- Put global settings in a settings dialog.
- Add attribution / link to repo somewhere.
- Configure Awake time for individual friends.

## Nerdy Details

- This a [NextJs](https://nextjs.org/) app built with plain JavaScript and [ChakraUI](https://chakra-ui.com/)
- The current Timezome data strategy is to use Next's `getStaticProps` to fetch the timezones at build time and package that data witht the pre-rendered app. This way we don't need to request timezone data with each page load. (The free API limits usage to 1 request per second.) One drawback of this is that if the timezone data changes (For example if a timezone enters or leaves Daylight Savings Time) then we would have to rebuild the page to ensure the data we have is up to date. So there is a chance certain times may be off by an hour. And I haven't looked into how many timezones observe DST or when they enter and leave it.