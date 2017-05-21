Tutorial angular.io
===================

### nightmode

```bash
nvidia-settings -n -a BlueBrightness=-1
```

#### git clone Quickstart seed

```bash
git clone https://github.com/angular/quickstart.git quickstart
```

#### install depenencies

```bash
cd quickstart
npm install
xargs rm -rf < non-essential-files.osx.txt
rm src/app/*.spec*.ts
rm non-essential-files.osx.txt
```

#### start server

```bash
cd quickstart && npm start
```
