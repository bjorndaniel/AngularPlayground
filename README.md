# AngularPlayground

To run the projects: 
1. CoreBackend - run dotnet run or dotnet watch run to reload on change
2. jsonplaceholder-test
    - run npm install
    - install the bootstrap header using npm install bootstrap-header-0.0.0.tgz
    - run ng serve --port "some portnumber"
3. bootstrap-header 
    - run npm install
    - run ng serve --port "some portnumber"

To build the bootstrap-header after changes:
1. run ng packagr
2. cd into the dist folder
3. run npm pack, this will create a new .tgz file with the version number from packge.json
