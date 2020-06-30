# Avellaneda Compras Product manager web app
## ng-node-rest-mysql

### installation process
> mkdir /home/app/v1/
> cd /home/app/v1/
> git clone https://github.com/rulosmuchos/ng-node-rest-mysql.git

### client ng_modules download and client build to /client/dist/client/
> cd ng-node-rest-mysql/client
> npm install
> npm run build

### server ng_modules download and server build to /server/build/
> cd /home/app/v1/
> cd ng-node-rest-mysql/server/src
> npm install
> npm run build

### symb link client build and server static-files folder
> cd /home/app/v1/
> cd ng-node-rest-mysql/server/src
> ln -s /home/app/v1/ng-node-rest-mysql/client/dist/client static

### install server as a system service
>cd /etc/systemd/system
>vi app-node_server.service

>i --insert--

[ Unit ]
    Description=NodeJS Express Server Runing on port 80 & 443
[ Service ]
    User=root
    Group=root
    WorkingDirectory=/home/app/v1/ng-node-rest-mysql/server/src
    Environment=
    ExecStart=/usr/bin/npm run dev

[ Install ]
    WantedBy=multi-user.target
:wq ( --write-- --quit--)

systemctl enable app-node_server.service

# start server

systemctl start app-node_server.service