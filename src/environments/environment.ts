// The file contents for the current environment will overwrite these during build.
// The build system defaults to the dev environment which uses `environment.ts`, but if you do
// `ng build --env=prod` then `environment.prod.ts` will be used instead.
// The list of which env maps to which file can be found in `.angular-cli.json`.

export const environment = {
  production: false,
  firebase: {
    apiKey: 'AIzaSyB-iQHLdDmSmYd3tHUHVowNHiNj1MOQ_8A',
    authDomain: 'ng-angularfitness.firebaseapp.com',
    databaseURL: 'https://ng-angularfitness.firebaseio.com',
    projectId: 'ng-angularfitness',
    storageBucket: 'ng-angularfitness.appspot.com',
    messagingSenderId: '4679939056'
  }
};
