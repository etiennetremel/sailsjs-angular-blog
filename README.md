# SailsJS Blog
#### Blog using SailsJS API for the backend, AngularJS for the front-end and MongoDB for the database.

### Installation
```sh
$ git clone https://github.com/etiennetremel/sailsjs-angular-blog.git
$ cd sailsjs-angular-blog
$ npm install
```

Then you will have to install bower dependencies:
If you are not familiar with Bower, please check this [documentation](http://bower.io/).
Make sure bower is installed globally, if not do:

```sh
$ npm install -g bower
```

...and install all the dependencies:

```sh
$ bower install
```

*Almost finish...*
Configure Amazon Web Services to store all the picture: `/config/aws.js`

Then configure MongoDB `/config/adapters.js`

If you prefer, use the local configuration file `/config/local.js` to store all these informations (documentation available [here](http://sailsjs.org/#!documentation/config.local))

And, lift sails:

```sh
$ sails lift
```

Visit [http://localhost:1337/](http://localhost:1337/)

**Admin access:**
* Username: `admin`
* Password: `admin`


###Auto-reload server on file change
`/!\` Not to be used in production
Make sure you have Nodemon installed: `npm install -g nodemon`
Then instead of typing `sails lift` type `nodemon -w . app.js`
The server will be automatically reloaded on file change.


### Features
* Authentification using Passport
* Write post content with Markdown
* Multiple Image uploader via Amazon AWS
* Tags / Categories
* Search
* Cross-Site Request Forgery Protection
* Notification system (Growl)
* Semantic UI framework


### Amazon Web Service Credentials
Amazon is used as a storage system for any images you woule like to add to a post. You have to define the credential in the configuration file located in the following folder `/config/aws.js`


### Configure SailsJS to work locally
As SailsJS allow to configure a local environment, you should create a `/config/local.js` file which should include any settings specifically for your development computer such as:

```javascript
aws: {
  accessKeyId: 'access key to be defined here',
  secretAccessKey: 'secret access key to be defined here',
  region: 'us-west-2',
  bucket: 'my-bucket-name',
  endPoint: 's3.amazonaws.com'
},

adapters: {
  'default': 'mongo',

  mongo: {
    module   : 'sails-mongo',
    host     : 'localhost',
    port     : 27017,
    user     : '',
    password : '',
    database : 'sailsjs-angular-blog'
  }
}
```


### Specific customisation

Admin user is automatically created via `/config/bootstrap.js`. Default username/password: admin/admin

`/config/404.js` has been modified to redirect all requested page to layout.ejs with a 200 status.


### Next to do
* Comment system
* User registration
* ... and much more