This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.<br />
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.<br />

# WrappedUnwrapped </br>

Don't wait for Spotify Wrapped. Get your top data now! This website uses the Spotify API to get your top Artists and Tracks of all time and lets you compare your tastes with other users.

This came about because I wanted to compare my own music tastes with my friends, specifically becuase I found the Spotify API last year and was absolutely fascinated with it.

____________________________________________________________________________________

When the user goes to _Wrapped Unwrapped_, they will see this page: </br>
<p align="center">
<img src="public/screenshots/login.png" width="570">
</p>
This page redirects you to the Spotify login </br>

______________________________________________________________________________

### Results </br>

The user will be redirected back to their results </br>
<p align="center">
<img src="public/screenshots/screen1.png" width="570">
</p>
<p align="center">
<img src="public/screenshots/users.png" width="570">
</p>

Note, there isn't an API call to find the Genres. This is calculated manually by taking the genres of your top fifty artists, placing them in a hashmap, then sorting them and returning the top genres.

______________________________________________________________________________

### Comparing with other users </br>

<p align="center">
<img  src="public/screenshots/comparison.png" width="570">
</p>

When the user clicks on another user's image, they will be directed to the comparison page where they can view their likes and dislikes between themselves and other users.
