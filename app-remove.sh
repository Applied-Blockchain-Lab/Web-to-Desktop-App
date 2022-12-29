cd ./out/make/deb/x64

ITEM=$(ls)

sudo dpkg -r $(dpkg -f $ITEM Package)