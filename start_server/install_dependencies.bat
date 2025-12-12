@echo off
echo Installing backend dependencies...
cd ../BACKEND
call npm install
echo.
echo Dependencies installed successfully.
echo You can now run the 'start_server.bat' file to start the backend.
pause
