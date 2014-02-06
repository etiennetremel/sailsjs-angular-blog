# SailsJS Blog
#### Blog using SailsJS API for the backend, AngularJS for the front-end and MongoDB for the database.

### Installation
```sh
$ git clone https://github.com/etiennetremel/sailsjs-angular-blog.git`
$ cd sailsjs-angular-blog
$ npm install
```

Configure AWS `/config/aws.js` and MongoDB `/config/adapters.js`.


```sh
$ sails lift
```

Visit [http://localhost:1337/](http://localhost:1337/)

**Admin access:**
* Username: `admin`
* Password: `admin`

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