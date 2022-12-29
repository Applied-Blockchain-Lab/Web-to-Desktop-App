echo "ORIGIN=INSTANCE" > .env 
cat .env

yarn run make

echo "ORIGIN=CORE" > .env 
cat .env
# Linux instalation (.deb instalation)
sudo dpkg --configure -a

cd ./out/make/deb/x64

ITEM=$(ls)

sudo dpkg -i $ITEM

# Windows installation

# MAC OS installation