# React Firebse Auth
A react app using hooks integrated with firebase for authenticating users. The app includes following features:

- Full [Firebase](https://firebase.google.com/) Platform Support Including Firestore Database, Authentication, Analytics and Storage
- Uses [react-hooks](https://reactjs.org/docs/hooks-reference.html) only for components
        ✅ Functional components 
        🚫 Class components
- Utilize [useReducer](https://reactjs.org/docs/hooks-reference.html#usereducer) and [useContext](https://reactjs.org/docs/hooks-reference.html#usecontext) react hooks to manage global state of the app and [useState](https://reactjs.org/docs/hooks-reference.html#usestate) for internal component states.
- Various authentication methods to authenticate users:
        
        * SignUp using email and password 
        * Sign In using Facebook and Google
        * Sign In using an email link
- [MaterialUI](https://material-ui.com/) design components
    
## Getting Started

## Installation

**Step 1:**

Download or clone this repo by using the link below:

```
git clone https://github.com/ooanishoo/react-firebase-auth
```

**Step 2:**

Setup a new project in firebase and get the configuration. It will look something like this:
<p>
<img width="400" alt="Screen Shot 2020-03-09 at 3 30 32 pm" src="https://user-images.githubusercontent.com/9260574/82982620-ea1f8f80-a031-11ea-996e-a89a77f0fc24.jpg">
<p/>


**Step 3:**

Go to the root folder of the project.
``` 
cd react-firebase-auth
```
Create a new file `.env`
```
touch .env
```
Add these env variables with the config values you recieived from firebase
(No quotes `""`required)
```
REACT_APP_FIREBASE_API_KEY=
REACT_APP_FIREBASE_AUTH_DOMAIN=
REACT_APP_FIREBASE_DATABASE_URL=
REACT_APP_FIREBASE_PROJECT_ID=
REACT_APP_FIREBASE_STORAGE_BUCKET=
REACT_APP_FIREBASE_MESSAGING_SENDER_ID=
REACT_APP_FIREBASE_APP_ID=
REACT_APP_FIREBASE_MEASUREMENT_ID=
```

**Step 5:**

Execute the following command in console to install the required packages: 

``` 
npm install
```
**Step 4:**
Simply run the app using

``` 
./run.sh
```

## Screenshots
<p>
<img width="300" alt="Sign Up" src="https://user-images.githubusercontent.com/9260574/82983108-e17b8900-a032-11ea-8ca5-577e460c6622.jpg">
<img width="300" alt="Sign In" src="https://user-images.githubusercontent.com/9260574/82983140-f0623b80-a032-11ea-8826-83f4dcff4156.jpg">
</p>
<p>
<img width="300" alt="Sign In with Facebook" src="https://user-images.githubusercontent.com/9260574/82983298-2dc6c900-a033-11ea-9187-6c5e7f69b263.jpg">
<img width="300" alt="Sign In with Google" src="https://user-images.githubusercontent.com/9260574/82983398-5a7ae080-a033-11ea-965f-a9f3cb303754.jpg">
</p>
<p>
<img width="300" alt="Sign In with Facebook" src="https://user-images.githubusercontent.com/9260574/82983421-6797cf80-a033-11ea-8888-5e0c9bc52bd4.jpg">
<img width="300" alt="Sign In with Google" src="https://user-images.githubusercontent.com/9260574/82983181-ff48ee00-a032-11ea-9ef4-ad6dd341c300.jpg">
</p>





