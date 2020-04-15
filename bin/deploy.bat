cd ..
cd myshop-dependencies
call mvn deploy

cd ..
cd myshop-commons-dubbo
call mvn deploy

cd ..
cd myshop-commons-utils
call mvn deploy

cd ..
cd myshop-user-domain
call mvn deploy

cd ..
cd myshop-user-api
call mvn deploy

cd ..
cd myshop-user-provider
call mvn deploy

