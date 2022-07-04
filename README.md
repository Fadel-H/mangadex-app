# mangadex-app

This repository is a continuation of https://github.com/Fadel-H/phase-1-project repository, but was converted to use the react framework, and uses a backend json.server hosted by Heroku. 

To start the app, you will need to run “npm start” in your terminal, and the react app should automatically open in your browser. Once the page loads, you will see a login form that asks for your username, and password. You can either use your own MangaDex account info, or use the test account I created for this application.

username: TestAccountforProject ||| password: 123ABCDEF

On the top left of the page, you will see a small navigation bar with three tabs. Login, userManga, and mangaList. The login tab will take you to your current page which is the login screen, the userManga tab will take you to a blank screen if you are not logged in, and the mangaList tab will take you to a page where the ten most recently update mangas are displayed with information’s associated with them.

Once you enter your login information, and hit enter, you will be able to view your current manga follow list in the userManga Tab. To make sure that you are logged in, you will see the login tab in the navigation bar change to logout. You would then be able to follow/unfollow manga by clicking on the button underneath the cover image of the mangas. Following mangas from the mangaList tab, will be reflected in the userManga tab, and manga that is unfollowed will be removed from the userManga tab.

Once you are done, you can click on the logout tab on the navigation bar to logout, and the userManga tab will display as an empty screen once again.


Notes about this project:
-If you follow a manga on the app, and check your library on https://mangadex.org/titles/follows, you might not see them since the api follow fetch only adds the manga to the user follow list, but doesn't assign a stat (reading, planning to read, on-hold, etc...).

-I'm having issues with the Heroku backend server, so you will see a bunch of errors on the console screen of the page, but the mangas should still load in mangaList, and userManga tabs.
